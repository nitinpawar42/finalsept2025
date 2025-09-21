
import { db, auth } from '../../../lib/firebase/admin';

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
    
    const salesData = ordersSnapshot.docs.reduce((acc, doc) => {
      const order = doc.data();
      const date = new Date(order.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });

      if (!acc[date]) {
        acc[date] = 0;
      }
      acc[date] += order.total;
      return acc;
    }, {});

    const chartData = Object.keys(salesData).map(date => ({
      date,
      sales: salesData[date],
    })).sort((a, b) => new Date(a.date) - new Date(b.date));

    return new Response(JSON.stringify(chartData), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });

  } catch (error) {
    console.error('Error fetching reseller sales data:', error);
    if (error.code === 'auth/id-token-expired' || error.code === 'auth/argument-error') {
        return new Response(JSON.stringify({ message: 'Invalid or expired token' }), { status: 401 });
    }
    return new Response(JSON.stringify({ message: 'Error fetching sales data' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};
