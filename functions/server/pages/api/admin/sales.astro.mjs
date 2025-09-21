import { d as db } from '../../../chunks/admin_HtBQTWCE.mjs';
export { renderers } from '../../../renderers.mjs';

const GET = async () => {
  try {
    const ordersSnapshot = await db.collection('orders').where('paymentStatus', '==', 'paid').get();
    
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
    console.error('Error fetching sales data:', error);
    return new Response(JSON.stringify({ message: 'Error fetching sales data' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
