/* empty css                                           */
import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, l as renderScript } from '../../chunks/astro/server_BeWHlNiw.mjs';
import 'kleur/colors';
import { $ as $$AdminLayout } from '../../chunks/AdminLayout_ixLKFT-O.mjs';
export { renderers } from '../../renderers.mjs';

const $$Profile = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Profile" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md"> <h2 class="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">User Profile</h2> <div id="user-info" class="mb-6"> <p class="text-gray-700 dark:text-gray-300"><strong>Email:</strong> <span id="user-email"></span></p> </div> <h3 class="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">Update Password</h3> <form id="update-password-form"> <div class="mb-4"> <label for="new-password" class="block text-gray-700 dark:text-gray-300 font-bold mb-2">New Password</label> <input type="password" id="new-password" name="new-password" class="w-full px-3 py-2 border rounded-lg text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 focus:outline-none focus:border-indigo-500"> </div> <button type="submit" class="bg-indigo-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700">Update Password</button> </form> </div> ${renderScript($$result2, "/home/user/new2025/src/pages/admin/profile.astro?astro&type=script&index=0&lang.ts")} ` })}`;
}, "/home/user/new2025/src/pages/admin/profile.astro", void 0);

const $$file = "/home/user/new2025/src/pages/admin/profile.astro";
const $$url = "/admin/profile";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Profile,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
