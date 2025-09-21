/* empty css                                           */
import { e as createComponent, f as createAstro, k as renderComponent, l as renderScript, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../../chunks/astro/server_BeWHlNiw.mjs';
import 'kleur/colors';
import { $ as $$AdminLayout } from '../../chunks/AdminLayout_ixLKFT-O.mjs';
import { d as db } from '../../chunks/admin_HtBQTWCE.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$MyProducts = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$MyProducts;
  let products = [];
  if (Astro2.locals.user) {
    const userId = Astro2.locals.user.uid;
    const resellerRef = db.collection("resellers").doc(userId);
    const productsRef = resellerRef.collection("products");
    const productsSnapshot = await productsRef.get();
    const productIds = productsSnapshot.docs.map((doc) => doc.id);
    if (productIds.length > 0) {
      const productsCollectionRef = db.collection("products");
      const productsQuery = await productsCollectionRef.where("__name__", "in", productIds).get();
      products = productsQuery.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    }
  }
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "My Products" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"> <table class="w-full table-auto"> <thead> <tr class="bg-gray-200 dark:bg-gray-700"> <th class="px-4 py-2">Name</th> <th class="px-4 py-2">Price</th> <th class="px-4 py-2">Stock</th> <th class="px-4 py-2">Actions</th> </tr> </thead> <tbody> ${products.map((product) => renderTemplate`<tr class="border-b dark:border-gray-700"> <td class="px-4 py-2">${product.name}</td> <td class="px-4 py-2">$${product.price.toFixed(2)}</td> <td class="px-4 py-2">${product.stock}</td> <td class="px-4 py-2"> <button class="remove-btn bg-red-500 text-white font-bold py-1 px-3 rounded-lg hover:bg-red-700"${addAttribute(product.id, "data-product-id")}>Remove</button> </td> </tr>`)} </tbody> </table> </div> ` })} ${renderScript($$result, "/home/user/new2025/src/pages/admin/my-products.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/user/new2025/src/pages/admin/my-products.astro", void 0);

const $$file = "/home/user/new2025/src/pages/admin/my-products.astro";
const $$url = "/admin/my-products";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$MyProducts,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
