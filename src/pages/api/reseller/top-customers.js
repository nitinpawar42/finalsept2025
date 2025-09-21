
import { db, auth } from '../../../../lib/firebase/admin';

export const GET = async ({ request }) => {
  try {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ message: 'No authorization header' }), { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    const decodedToken = await auth.verifyIdToken(token);
    const uid = decodedToken.uid;

    const ordersSnapshot = await db.collection('orders')
      .where('resellerId', '==', uid)
      .where('paymentStatus', '==', 'paid')
      .get();
    
    const customerSales = ordersSnapshot.docs.reduce((acc, doc) => {
        const order = doc.data();
        const customerId = order.customerId; // Assuming customerId is stored in the order

        if (customerId) {
            if (!acc[customerId]) {
                acc[customerId] = { totalSales: 0, orderCount: 0 };
            }
            acc[customerId].totalSales += order.total;
            acc[customerId].orderCount += 1;
        }

        return acc;
    }, {});

    // Fetch customer details
    const customerIds = Object.keys(customerSales);
    const customersSnapshot = await db.collection('customers').where('__name__', 'in', customerIds).get();
    const customerIdToNameMap = customersSnapshot.docs.reduce((acc, doc) => {
      acc[doc.id] = doc.data().name;
      return acc;
    }, {});

    const topCustomers = Object.keys(customerSales).map(customerId => ({
      id: customerId,
      name: customerIdToNameMap[customerId] || 'Unknown Customer',
      totalSales: customerSales[customerId].totalSales,
      orderCount: customerSales[customerId].orderCount,
    })).sort((a, b) => b.totalSales - a.totalSales);

    return new Response(JSON.stringify(topCustomers), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });

  } catch (error) {
    console.error('Error fetching top customers data:', error);
    if (error.code === 'auth/id-token-expired' || error.code === 'auth/argument-error') {
        return new Response(JSON.stringify({ message: 'Invalid or expired token' }), { status: 401 });
    }
    return new Response(JSON.stringify({ message: 'Error fetching top customers data' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};
