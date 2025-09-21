import Razorpay from 'razorpay';
export { renderers } from '../../renderers.mjs';

async function post({ request }) {
  const { amount, orderId } = await request.json();

  const razorpay = new Razorpay({
    key_id: 'rzp_test_1DPQoVzVv4F1Zz',
    key_secret: '9oj6tXVIXCn8VGfWtxljyHs3',
  });

  const options = {
    amount: amount * 100, // Amount in paise
    currency: 'INR',
    receipt: orderId
  };

  try {
    const order = await razorpay.orders.create(options);
    return new Response(JSON.stringify(order), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  post
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
