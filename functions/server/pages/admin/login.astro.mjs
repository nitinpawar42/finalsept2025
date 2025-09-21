/* empty css                                           */
import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, l as renderScript } from '../../chunks/astro/server_BeWHlNiw.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../../chunks/Layout_AcdRN6NI.mjs';
export { renderers } from '../../renderers.mjs';

const $$Login = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Admin Login" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900"> <div class="max-w-md w-full bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md"> <h2 class="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-200">Admin Login</h2> <form id="login-form"> <div class="mb-4"> <label for="email" class="block text-gray-700 dark:text-gray-300 font-bold mb-2">Email</label> <input type="email" id="email" name="email" class="w-full px-3 py-2 border rounded-lg text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 focus:outline-none focus:border-indigo-500" required> </div> <div class="mb-4"> <label for="password" class="block text-gray-700 dark:text-gray-300 font-bold mb-2">Password</label> <input type="password" id="password" name="password" class="w-full px-3 py-2 border rounded-lg text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 focus:outline-none focus:border-indigo-500" required> </div> <button type="submit" class="w-full bg-indigo-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700">Login</button> </form> </div> </div> ${renderScript($$result2, "/home/user/new2025/src/pages/admin/login.astro?astro&type=script&index=0&lang.ts")} ` })}`;
}, "/home/user/new2025/src/pages/admin/login.astro", void 0);

const $$file = "/home/user/new2025/src/pages/admin/login.astro";
const $$url = "/admin/login";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Login,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
