/* empty css                                           */
import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_BeWHlNiw.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../../chunks/Layout_I8FSt4dU.mjs';
export { renderers } from '../../renderers.mjs';

const $$Dashboard = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Reseller Dashboard" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900"> <div class="max-w-md w-full bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md"> <h2 class="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-200">Reseller Dashboard</h2> <p class="text-center text-gray-700 dark:text-gray-300">Welcome, Reseller!</p> </div> </div> ` })}`;
}, "/home/user/new2025/src/pages/reseller/dashboard.astro", void 0);

const $$file = "/home/user/new2025/src/pages/reseller/dashboard.astro";
const $$url = "/reseller/dashboard";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Dashboard,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
