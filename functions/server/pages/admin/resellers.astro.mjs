/* empty css                                           */
import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_BeWHlNiw.mjs';
import 'kleur/colors';
import { $ as $$AdminLayout } from '../../chunks/AdminLayout_ixLKFT-O.mjs';
import { d as db } from '../../chunks/admin_HtBQTWCE.mjs';
export { renderers } from '../../renderers.mjs';

const $$Resellers = createComponent(async ($$result, $$props, $$slots) => {
  const resellersSnapshot = await db.collection("resellers").get();
  const resellers = resellersSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Resellers" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"> <table class="w-full table-auto"> <thead> <tr class="bg-gray-200 dark:bg-gray-700"> <th class="px-4 py-2">ID</th> <th class="px-4 py-2">Name</th> <th class="px-4 py-2">Email</th> <th class="px-4 py-2">Products</th> </tr> </thead> <tbody> ${resellers.map((reseller) => renderTemplate`<tr class="border-b dark:border-gray-700"> <td class="px-4 py-2">${reseller.id}</td> <td class="px-4 py-2">${reseller.name}</td> <td class="px-4 py-2">${reseller.email}</td> <td class="px-4 py-2">${reseller.products.join(", ")}</td> </tr>`)} </tbody> </table> </div> ` })}`;
}, "/home/user/new2025/src/pages/admin/resellers.astro", void 0);

const $$file = "/home/user/new2025/src/pages/admin/resellers.astro";
const $$url = "/admin/resellers";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Resellers,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
