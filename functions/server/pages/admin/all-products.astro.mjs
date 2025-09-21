/* empty css                                           */
import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, l as renderScript, h as addAttribute } from '../../chunks/astro/server_BeWHlNiw.mjs';
import 'kleur/colors';
import { $ as $$AdminLayout } from '../../chunks/AdminLayout_ixLKFT-O.mjs';
import { d as db } from '../../chunks/admin_HtBQTWCE.mjs';
export { renderers } from '../../renderers.mjs';

const $$AllProducts = createComponent(async ($$result, $$props, $$slots) => {
  const productsRef = db.collection("products");
  const snapshot = await productsRef.get();
  const products = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "All Products" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md"> <h2 class="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">All Products</h2> <table class="min-w-full bg-white dark:bg-gray-800"> <thead> <tr> <th class="py-2 px-4 border-b dark:border-gray-700 text-left text-gray-800 dark:text-gray-200">Name</th> <th class="py-2 px-4 border-b dark:border-gray-700 text-left text-gray-800 dark:text-gray-200">Price</th> <th class="py-2 px-4 border-b dark:border-gray-700 text-left text-gray-800 dark:text-gray-200">Actions</th> </tr> </thead> <tbody> ${products.map((product) => renderTemplate`<tr${addAttribute(product.id, "key")}> <td class="py-2 px-4 border-b dark:border-gray-700 text-gray-800 dark:text-gray-200">${product.name}</td> <td class="py-2 px-4 border-b dark:border-gray-700 text-gray-800 dark:text-gray-200">$${product.price}</td> <td class="py-2 px-4 border-b dark:border-gray-700"> <button class="add-to-store-btn bg-green-500 text-white font-bold py-1 px-3 rounded-lg hover:bg-green-700"${addAttribute(product.id, "data-product-id")}>Add to My Store</button> </td> </tr>`)} </tbody> </table> </div> ${renderScript($$result2, "/home/user/new2025/src/pages/admin/all-products.astro?astro&type=script&index=0&lang.ts")} ` })}`;
}, "/home/user/new2025/src/pages/admin/all-products.astro", void 0);

const $$file = "/home/user/new2025/src/pages/admin/all-products.astro";
const $$url = "/admin/all-products";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$AllProducts,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
