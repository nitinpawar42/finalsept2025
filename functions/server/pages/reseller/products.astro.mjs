/* empty css                                           */
import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../../chunks/astro/server_BeWHlNiw.mjs';
import 'kleur/colors';
import { $ as $$ResellerLayout } from '../../chunks/ResellerLayout_BY7hhAJu.mjs';
import { d as db } from '../../chunks/admin_HtBQTWCE.mjs';
export { renderers } from '../../renderers.mjs';

const $$Products = createComponent(async ($$result, $$props, $$slots) => {
  const productsRef = db.collection("products");
  const productsSnapshot = await productsRef.get();
  const products = productsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return renderTemplate`${renderComponent($$result, "ResellerLayout", $$ResellerLayout, { "title": "My Products" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="container mx-auto"> <h1 class="text-2xl font-bold mb-6">Product Catalog</h1> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> ${products.map((product) => renderTemplate`<div class="border rounded-lg p-4 bg-white dark:bg-gray-800 shadow-md"> <img${addAttribute(product.imageUrl, "src")}${addAttribute(product.name, "alt")} class="w-full h-48 object-cover rounded-md mb-4"> <h3 class="text-lg font-bold">${product.name}</h3> <p class="text-gray-600 dark:text-gray-400">₹${product.price}</p> <p class="text-sm mt-2">${product.description}</p> </div>`)} </div> </div> ` })}`;
}, "/home/user/new2025/src/pages/reseller/products.astro", void 0);

const $$file = "/home/user/new2025/src/pages/reseller/products.astro";
const $$url = "/reseller/products";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Products,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
