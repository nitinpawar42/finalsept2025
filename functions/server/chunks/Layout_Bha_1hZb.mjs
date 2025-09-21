import { e as createComponent, f as createAstro, h as addAttribute, n as renderHead, o as renderSlot, r as renderTemplate } from './astro/server_BeWHlNiw.mjs';
import 'kleur/colors';
import 'clsx';

const $$Astro = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="description" content="Astro description"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${Astro2.props.title}</title>${renderHead()}</head> <body class="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200"> <header class="bg-white dark:bg-gray-800 shadow-md"> <nav class="container mx-auto px-6 py-4 flex justify-between items-center"> <a href="/" class="text-2xl font-bold text-gray-800 dark:text-gray-200">Project Nexus</a> <div> <a href="/" class="text-gray-800 dark:text-gray-200 hover:text-indigo-500 mx-4">Home</a> <a href="/login" class="text-gray-800 dark:text-gray-200 hover:text-indigo-500 mx-4">Login</a> <a href="/register" class="bg-indigo-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700">Register</a> </div> </nav> </header> <main class="container mx-auto px-6 py-12"> ${renderSlot($$result, $$slots["default"])} </main> <footer class="bg-white dark:bg-gray-800 mt-12 py-6"> <div class="container mx-auto px-6 text-center text-gray-600 dark:text-gray-400"> <p>&copy; 2024 Project Nexus. All rights reserved.</p> </div> </footer> </body></html>`;
}, "/home/user/new2025/src/layouts/Layout.astro", void 0);

export { $$Layout as $ };
