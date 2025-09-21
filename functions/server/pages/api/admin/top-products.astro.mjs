import { d as db } from '../../../chunks/admin_HtBQTWCE.mjs';
export { renderers } from '../../../renderers.mjs';

const GET = async () => {
  try {
    const ordersSnapshot = await db.collection('orders').where('paymentStatus', '==', 'paid').get();
    
    const productSales = ordersSnapshot.docs.reduce((acc, doc) => {
      const order = doc.data();
      order.items.forEach(item => {
        if (!acc[item.name]) {
          acc[item.name] = 0;
        }
        acc[item.name] += item.price * item.quantity;
      });
      return acc;
    }, {});

    const sortedProducts = Object.keys(productSales).map(name => ({
      name,
      revenue: productSales[name],
    })).sort((a, b) => b.revenue - a.revenue);

    return new Response(JSON.stringify(sortedProducts), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });

  } catch (error) {
    console.error('Error fetching top products data:', error);
    return new Response(JSON.stringify({ message: 'Error fetching top products data' }), {
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
