import { e as createComponent, f as createAstro, h as addAttribute, n as renderHead, o as renderSlot, r as renderTemplate } from './astro/server_BeWHlNiw.mjs';
import 'kleur/colors';
import 'clsx';

const $$Astro = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="description" content="Astro description"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${Astro2.props.title}</title>${renderHead()}</head> <body class="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200"> <main class="container mx-auto px-6 py-12"> ${renderSlot($$result, $$slots["default"])} </main> <footer class="bg-white dark:bg-gray-800 mt-12 py-6"> <div class="container mx-auto px-6 text-center text-gray-600 dark:text-gray-400"> <p>&copy; 2024 Swastik Handicrafts. All rights reserved.</p> </div> </footer> </body></html>`;
}, "/home/user/new2025/src/layouts/Layout.astro", void 0);

export { $$Layout as $ };
