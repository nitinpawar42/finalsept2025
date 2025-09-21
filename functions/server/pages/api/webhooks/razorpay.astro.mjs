import { d as db } from '../../../chunks/admin_HtBQTWCE.mjs';
import crypto from 'crypto';
export { renderers } from '../../../renderers.mjs';

const RAZORPAY_WEBHOOK_SECRET = "your_razorpay_webhook_secret_placeholder";
const POST = async ({ request }) => {
  const signature = request.headers.get("x-razorpay-signature");
  const body = await request.text();
  try {
    const expectedSignature = crypto.createHmac("sha256", RAZORPAY_WEBHOOK_SECRET).update(body).digest("hex");
    if (signature !== expectedSignature) {
      console.warn("Invalid Razorpay webhook signature received.");
      return new Response("Invalid signature", { status: 403 });
    }
  } catch (error) {
    console.error("Error during webhook signature verification:", error);
    return new Response("Webhook Error", { status: 400 });
  }
  const event = JSON.parse(body);
  if (event.event === "payment.failed") {
    const orderId = event.payload.payment.entity.notes.order_id;
    console.log(`Payment failed for order: ${orderId}`);
    await db.collection("orders").doc(orderId).update({
      status: "payment_failed",
      paymentDetails: event.payload.payment.entity
    });
    return new Response("Webhook received for payment failure", { status: 200 });
  }
  if (event.event !== "order.paid") {
    console.log(`Received unhandled Razorpay event: ${event.event}`);
    return new Response(`Unhandled event: ${event.event}`, { status: 200 });
  }
  try {
    const orderPayload = event.payload.order.entity;
    const paymentPayload = event.payload.payment.entity;
    const orderId = orderPayload.receipt;
    console.log(`Processing successful payment for order: ${orderId}`);
    const orderRef = db.collection("orders").doc(orderId);
    await orderRef.update({
      status: "paid",
      paymentId: paymentPayload.id,
      razorpayOrderId: paymentPayload.order_id,
      paymentSignature: signature,
      paymentDetails: paymentPayload,
      // Store the full payment object for reference
      updatedAt: /* @__PURE__ */ new Date()
    });
    console.log(`Successfully updated order ${orderId} to paid.`);
    return new Response("Webhook processed successfully", { status: 200 });
  } catch (error) {
    let errorMessage = "An unknown error occurred while processing the webhook.";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    console.error("Webhook Processing Error:", error);
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
