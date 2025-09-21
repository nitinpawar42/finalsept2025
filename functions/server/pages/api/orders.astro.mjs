import { d as db } from '../../chunks/admin_HtBQTWCE.mjs';
import Razorpay from 'razorpay';
export { renderers } from '../../renderers.mjs';

class RazorpayClient {
  instance;
  constructor(keyId, keySecret) {
    this.instance = new Razorpay({
      key_id: keyId,
      key_secret: keySecret
    });
  }
  async createOrder(amount, currency, receipt) {
    const options = {
      amount,
      // amount in the smallest currency unit
      currency,
      receipt
    };
    try {
      console.log("Simulating Razorpay order creation with options:", options);
      const mockOrderId = `order_${Math.random().toString(36).substring(2, 15)}`;
      return {
        id: mockOrderId,
        ...options
      };
    } catch (error) {
      console.error("Razorpay Error:", error);
      throw new Error("Failed to create Razorpay order.");
    }
  }
}

const RAZORPAY_KEY_ID = "your_razorpay_key_id_placeholder";
const RAZORPAY_KEY_SECRET = "your_razorpay_key_secret_placeholder";
const razorpay = new RazorpayClient(RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET);
const POST = async ({ request }) => {
  try {
    const {
      cart,
      resellerId,
      shippingCost,
      customerDetails
    } = await request.json();
    if (!cart || !resellerId || !customerDetails) {
      return new Response(JSON.stringify({ message: "Missing required order data" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const totalAmount = subtotal + shippingCost;
    const totalAmountInPaise = Math.round(totalAmount * 100);
    const orderRef = await db.collection("orders").add({
      resellerId,
      customerDetails,
      items: cart,
      subtotal,
      shippingCost,
      totalAmount,
      status: "pending_payment",
      createdAt: /* @__PURE__ */ new Date()
    });
    const orderId = orderRef.id;
    const razorpayOrder = await razorpay.createOrder(
      totalAmountInPaise,
      "INR",
      orderId
    );
    return new Response(JSON.stringify({
      id: razorpayOrder.id,
      // This is the Razorpay order_id
      receipt: orderId,
      // This is our internal Firestore document ID
      amount: razorpayOrder.amount,
      razorpayKey: RAZORPAY_KEY_ID
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    let errorMessage = "An unknown error occurred while creating the order.";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    console.error(error);
    return new Response(JSON.stringify({ message: errorMessage }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
