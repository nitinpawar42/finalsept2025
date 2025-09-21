
import { db } from '../../../lib/firebase/admin';

export const GET = async () => {
  try {
    const ordersSnapshot = await db.collection('orders').where('paymentStatus', '==', 'paid').get();
    
    const resellerSales = ordersSnapshot.docs.reduce((acc, doc) => {
      const order = doc.data();
      const resellerId = order.resellerId;

      if (!acc[resellerId]) {
        acc[resellerId] = { totalSales: 0, orderCount: 0 };
      }

      acc[resellerId].totalSales += order.total;
      acc[resellerId].orderCount += 1;

      return acc;
    }, {});

    const usersSnapshot = await db.collection('users').where('role', '==', 'reseller').get();
    const resellerIdToNameMap = usersSnapshot.docs.reduce((acc, doc) => {
      acc[doc.id] = doc.data().resellerDetails.fullName;
      return acc;
    }, {});

    const topResellers = Object.keys(resellerSales).map(resellerId => ({
      id: resellerId,
      name: resellerIdToNameMap[resellerId] || 'Unknown Reseller',
      totalSales: resellerSales[resellerId].totalSales,
      orderCount: resellerSales[resellerId].orderCount,
    })).sort((a, b) => b.totalSales - a.totalSales);

    return new Response(JSON.stringify(topResellers), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });

  } catch (error) {
    console.error('Error fetching top resellers data:', error);
    return new Response(JSON.stringify({ message: 'Error fetching top resellers data' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};
