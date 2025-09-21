/* empty css                                           */
import { e as createComponent, f as createAstro, k as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../../chunks/astro/server_BeWHlNiw.mjs';
import 'kleur/colors';
import { d as db } from '../../chunks/admin_HtBQTWCE.mjs';
import { $ as $$Layout } from '../../chunks/Layout_I8FSt4dU.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
async function getStaticPaths() {
  const resellersSnapshot = await db.collection("resellers").get();
  const resellers = resellersSnapshot.docs.map((doc) => ({ params: { id: doc.id } }));
  return resellers;
}
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const { id } = Astro2.params;
  const resellerRef = db.collection("resellers").doc(id);
  const resellerDoc = await resellerRef.get();
  const reseller = resellerDoc.data();
  const productsRef = resellerRef.collection("products");
  const productsSnapshot = await productsRef.get();
  const productIds = productsSnapshot.docs.map((doc) => doc.id);
  let products = [];
  if (productIds.length > 0) {
    const productsCollectionRef = db.collection("products");
    const productsQuery = await productsCollectionRef.where("__name__", "in", productIds).get();
    products = productsQuery.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": reseller.name }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="max-w-4xl mx-auto py-12"> <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"> <img${addAttribute(reseller.bannerImage || "https://via.placeholder.com/1200x400", "src")}${addAttribute(`${reseller.name} banner`, "alt")} class="w-full h-64 object-cover"> <div class="p-6"> <h1 class="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-2">${reseller.name}</h1> <p class="text-gray-600 dark:text-gray-400 mb-6">${reseller.bio}</p> <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">Products</h2> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> ${products.map((product) => renderTemplate`<div class="bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md overflow-hidden"> <img${addAttribute(product.imageUrl || "https://via.placeholder.com/300", "src")}${addAttribute(product.name, "alt")} class="w-full h-48 object-cover"> <div class="p-4"> <h3 class="text-lg font-bold text-gray-800 dark:text-gray-200">${product.name}</h3> <p class="text-gray-600 dark:text-gray-400">$${product.price.toFixed(2)}</p> </div> </div>`)} </div> </div> </div> </div> ` })}`;
}, "/home/user/new2025/src/pages/resellers/[id].astro", void 0);

const $$file = "/home/user/new2025/src/pages/resellers/[id].astro";
const $$url = "/resellers/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$id,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
