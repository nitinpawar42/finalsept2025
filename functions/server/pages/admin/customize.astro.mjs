/* empty css                                           */
import { e as createComponent, f as createAstro, k as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute, l as renderScript } from '../../chunks/astro/server_BeWHlNiw.mjs';
import 'kleur/colors';
import { $ as $$AdminLayout } from '../../chunks/AdminLayout_ixLKFT-O.mjs';
import { d as db } from '../../chunks/admin_HtBQTWCE.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$Customize = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Customize;
  let resellerData = {};
  if (Astro2.locals.user) {
    const userId = Astro2.locals.user.uid;
    const resellerRef = db.collection("resellers").doc(userId);
    const resellerDoc = await resellerRef.get();
    resellerData = resellerDoc.data() || {};
  }
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Customize Your Page" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md"> <h2 class="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">Customize Your Public Page</h2> <form id="customize-form"> <div class="mb-4"> <label for="name" class="block text-gray-700 dark:text-gray-300 font-bold mb-2">Name</label> <input type="text" id="name" name="name" class="w-full px-3 py-2 border rounded-lg text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 focus:outline-none focus:border-indigo-500"${addAttribute(resellerData.name || "", "value")}> </div> <div class="mb-4"> <label for="bio" class="block text-gray-700 dark:text-gray-300 font-bold mb-2">Bio</label> <textarea id="bio" name="bio" rows="4" class="w-full px-3 py-2 border rounded-lg text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 focus:outline-none focus:border-indigo-500">${resellerData.bio || ""}</textarea> </div> <div class="mb-4"> <label for="banner-image" class="block text-gray-700 dark:text-gray-300 font-bold mb-2">Banner Image URL</label> <input type="text" id="banner-image" name="banner-image" class="w-full px-3 py-2 border rounded-lg text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 focus:outline-none focus:border-indigo-500"${addAttribute(resellerData.bannerImage || "", "value")}> </div> <button type="submit" class="bg-indigo-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700">Save Changes</button> </form> </div> ${renderScript($$result2, "/home/user/new2025/src/pages/admin/customize.astro?astro&type=script&index=0&lang.ts")} ` })}`;
}, "/home/user/new2025/src/pages/admin/customize.astro", void 0);

const $$file = "/home/user/new2025/src/pages/admin/customize.astro";
const $$url = "/admin/customize";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Customize,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
