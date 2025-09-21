import { d as db } from '../../chunks/admin_HtBQTWCE.mjs';
export { renderers } from '../../renderers.mjs';

const POST = async ({ request }) => {
  try {
    const { orderId } = await request.json();
    if (!orderId) {
      return new Response("Order ID is required", { status: 400 });
    }
    const orderRef = db.collection("orders").doc(orderId);
    const orderDoc = await orderRef.get();
    if (!orderDoc.exists) {
      return new Response("Order not found", { status: 404 });
    }
    const orderData = orderDoc.data();
    console.log(`Simulating shipment booking for order: ${orderId}`);
    const mockTrackingId = `DEL-${Math.random().toString(36).substring(2, 12).toUpperCase()}`;
    await orderRef.update({
      status: "shipped",
      shippingDetails: {
        trackingId: mockTrackingId,
        provider: "Delhivery",
        bookedAt: /* @__PURE__ */ new Date()
      }
    });
    return new Response(JSON.stringify({
      message: "Shipment booked successfully",
      trackingId: mockTrackingId
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    let errorMessage = "An unknown error occurred while booking the shipment.";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    console.error("Shipment Booking Error:", error);
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
