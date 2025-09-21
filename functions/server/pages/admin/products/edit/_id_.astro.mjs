/* empty css                                                 */
import { e as createComponent, f as createAstro, k as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute, l as renderScript } from '../../../../chunks/astro/server_BeWHlNiw.mjs';
import 'kleur/colors';
import { $ as $$AdminLayout } from '../../../../chunks/AdminLayout_ixLKFT-O.mjs';
import { d as db } from '../../../../chunks/admin_HtBQTWCE.mjs';
export { renderers } from '../../../../renderers.mjs';

const $$Astro = createAstro();
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const { id } = Astro2.params;
  const productRef = db.collection("products").doc(id);
  const productDoc = await productRef.get();
  if (!productDoc.exists) {
    return Astro2.redirect("/admin/products");
  }
  const product = { id: productDoc.id, ...productDoc.data() };
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": `Edit ${product.name}` }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="container mx-auto"> <h1 class="text-2xl font-bold mb-6">Edit Product</h1> <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"> <form id="edit-product-form"> <div class="grid grid-cols-1 md:grid-cols-2 gap-4"> <input type="text" name="name"${addAttribute(product.name, "value")} class="w-full px-3 py-2 border rounded-lg" required> <input type="number" name="price"${addAttribute(product.price, "value")} class="w-full px-3 py-2 border rounded-lg" required> <input type="number" name="weight"${addAttribute(product.weight, "value")} class="w-full px-3 py-2 border rounded-lg" required> <input type="number" name="length"${addAttribute(product.dimensions.length, "value")} class="w-full px-3 py-2 border rounded-lg" required> <input type="number" name="breadth"${addAttribute(product.dimensions.breadth, "value")} class="w-full px-3 py-2 border rounded-lg" required> <input type="number" name="height"${addAttribute(product.dimensions.height, "value")} class="w-full px-3 py-2 border rounded-lg" required> <textarea name="description" class="w-full px-3 py-2 border rounded-lg md:col-span-2" required>${product.description}</textarea> <div class="md:col-span-2"> <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Current Image</label> <img${addAttribute(product.imageUrl, "src")}${addAttribute(product.name, "alt")} class="w-32 h-32 object-cover rounded-md my-2"> <input type="file" name="image" accept="image/*" class="w-full px-3 py-2 border rounded-lg"> </div> </div> <button type="submit" class="mt-4 w-full bg-indigo-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700">Update Product</button> </form> </div> </div> ${renderScript($$result2, "/home/user/new2025/src/pages/admin/products/edit/[id].astro?astro&type=script&index=0&lang.ts")} ` })}`;
}, "/home/user/new2025/src/pages/admin/products/edit/[id].astro", void 0);

const $$file = "/home/user/new2025/src/pages/admin/products/edit/[id].astro";
const $$url = "/admin/products/edit/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$id,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
