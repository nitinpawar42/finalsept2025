import { e as createComponent, f as createAstro, n as renderHead, o as renderSlot, l as renderScript, r as renderTemplate } from './astro/server_BeWHlNiw.mjs';
import 'kleur/colors';
import 'clsx';

const $$Astro = createAstro();
const $$AdminLayout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$AdminLayout;
  const { title } = Astro2.props;
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${title}</title><link rel="stylesheet" href="/styles/tailwind.css">${renderHead()}</head> <body class="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100"> <nav class="bg-white dark:bg-gray-800 shadow-md"> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> <div class="flex justify-between items-center h-16"> <div class="flex items-center"> <a href="/admin" class="font-bold text-xl">Admin Panel</a> </div> <div class="flex items-center"> <a href="/admin/my-products" class="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700">My Products</a> <a href="/admin/products" class="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700">Manage Products</a> <a href="/admin/resellers" class="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700">Resellers</a> <a href="/admin/orders" class="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700">Orders</a> <button id="logout-btn" class="ml-4 px-3 py-2 rounded-md text-sm font-medium text-white bg-red-500 hover:bg-red-700">Logout</button> </div> </div> </div> </nav> <main class="p-6"> ${renderSlot($$result, $$slots["default"])} </main> ${renderScript($$result, "/home/user/new2025/src/layouts/AdminLayout.astro?astro&type=script&index=0&lang.ts")} </body> </html>`;
}, "/home/user/new2025/src/layouts/AdminLayout.astro", void 0);

export { $$AdminLayout as $ };
