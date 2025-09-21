/* empty css                                        */
import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, l as renderScript } from '../chunks/astro/server_BeWHlNiw.mjs';
import 'kleur/colors';
import { $ as $$PublicLayout } from '../chunks/PublicLayout_DUZwmbNu.mjs';
export { renderers } from '../renderers.mjs';

const $$Cart = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "PublicLayout", $$PublicLayout, { "title": "Shopping Cart" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="container mx-auto"> <h1 class="text-3xl font-bold mb-8">Your Shopping Cart</h1> <div id="cart-container" class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"> <!-- Cart items will be dynamically inserted here --> </div> <div class="mt-8 flex justify-end"> <a href="#" id="checkout-link" class="bg-green-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-600 transition-colors duration-300">Proceed to Checkout</a> </div> </div> ${renderScript($$result2, "/home/user/new2025/src/pages/cart.astro?astro&type=script&index=0&lang.ts")} ` })}`;
}, "/home/user/new2025/src/pages/cart.astro", void 0);

const $$file = "/home/user/new2025/src/pages/cart.astro";
const $$url = "/cart";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Cart,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
