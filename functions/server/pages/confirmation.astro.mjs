/* empty css                                        */
import { e as createComponent, f as createAstro, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_BeWHlNiw.mjs';
import 'kleur/colors';
import { $ as $$PublicLayout } from '../chunks/PublicLayout_DUZwmbNu.mjs';
import { d as db } from '../chunks/admin_HtBQTWCE.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Confirmation = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Confirmation;
  const { orderId } = Astro2.url.searchParams;
  if (!orderId) {
    return Astro2.redirect("/");
  }
  const orderRef = db.collection("orders").doc(orderId);
  const orderDoc = await orderRef.get();
  if (!orderDoc.exists) {
    return new Response("Order not found", { status: 404 });
  }
  const order = orderDoc.data();
  if (order.status === "pending_payment") {
    await orderRef.update({ status: "paid", paymentId: "mock_payment_id" });
    order.status = "paid";
  }
  return renderTemplate`${renderComponent($$result, "PublicLayout", $$PublicLayout, { "title": "Order Confirmation" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="container mx-auto text-center"> <div class="bg-white dark:bg-gray-800 p-10 rounded-lg shadow-2xl max-w-2xl mx-auto"> <svg class="w-16 h-16 mx-auto text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> <h1 class="text-3xl font-bold mt-4 mb-2">Thank You For Your Order!</h1> <p class="text-gray-600 dark:text-gray-400">Your order has been placed successfully.</p> <div class="text-left mt-8 border-t pt-6"> <p class="text-lg font-semibold"><strong>Order ID:</strong> ${orderId}</p> <p><strong>Date:</strong> ${new Date(order.createdAt._seconds * 1e3).toLocaleDateString()}</p> <p><strong>Status:</strong> <span class="font-medium capitalize text-green-600">${order.status.replace("_", " ")}</span></p> <h2 class="text-xl font-bold mt-6 mb-4">Shipping to:</h2> <p>${order.customerDetails.name}</p> <p>${order.customerDetails.address}</p> <p>${order.customerDetails.pincode}</p> <p>${order.customerDetails.email} | ${order.customerDetails.phone}</p> <h2 class="text-xl font-bold mt-6 mb-4">Order Summary:</h2> <ul class="space-y-3"> ${order.items.map((item) => renderTemplate`<li class="flex justify-between"> <span>${item.name} (x${item.quantity})</span> <span>₹${(item.price * item.quantity).toFixed(2)}</span> </li>`)} </ul> <div class="border-t mt-4 pt-4 space-y-2 font-semibold"> <div class="flex justify-between"> <span>Subtotal</span> <span>₹${order.subtotal.toFixed(2)}</span> </div> <div class="flex justify-between"> <span>Shipping</span> <span>₹${order.shippingCost.toFixed(2)}</span> </div> <div class="flex justify-between text-xl font-bold"> <span>Total</span> <span>₹${order.totalAmount.toFixed(2)}</span> </div> </div> </div> <a href="/" class="mt-8 inline-block bg-indigo-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-indigo-600">Continue Shopping</a> </div> </div> ` })}`;
}, "/home/user/new2025/src/pages/confirmation.astro", void 0);

const $$file = "/home/user/new2025/src/pages/confirmation.astro";
const $$url = "/confirmation";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Confirmation,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
