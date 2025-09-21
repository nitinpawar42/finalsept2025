/* empty css                                           */
import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, l as renderScript, h as addAttribute } from '../../chunks/astro/server_BeWHlNiw.mjs';
import 'kleur/colors';
import { $ as $$AdminLayout } from '../../chunks/AdminLayout_ixLKFT-O.mjs';
import { d as db } from '../../chunks/admin_HtBQTWCE.mjs';
export { renderers } from '../../renderers.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const productsRef = db.collection("products");
  const productsSnapshot = await productsRef.get();
  const products = productsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Manage Products" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="container mx-auto"> <h1 class="text-2xl font-bold mb-6">Manage Products</h1> <!-- Add Product Form --> <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8"> <h2 class="text-xl font-bold mb-4">Add New Product</h2> <form id="add-product-form"> <div class="grid grid-cols-1 md:grid-cols-2 gap-4"> <input type="text" name="name" placeholder="Product Name" class="w-full px-3 py-2 border rounded-lg" required> <input type="number" name="price" placeholder="Price" class="w-full px-3 py-2 border rounded-lg" required> <input type="number" name="weight" placeholder="Weight (grams)" class="w-full px-3 py-2 border rounded-lg" required> <input type="number" name="length" placeholder="Length (cm)" class="w-full px-3 py-2 border rounded-lg" required> <input type="number" name="breadth" placeholder="Breadth (cm)" class="w-full px-3 py-2 border rounded-lg" required> <input type="number" name="height" placeholder="Height (cm)" class="w-full px-3 py-2 border rounded-lg" required> <textarea name="description" placeholder="Description" class="w-full px-3 py-2 border rounded-lg md:col-span-2" required></textarea> <input type="file" name="image" accept="image/*" class="w-full px-3 py-2 border rounded-lg md:col-span-2" required> </div> <button type="submit" class="mt-4 w-full bg-indigo-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700">Add Product</button> </form> </div> <!-- Product List --> <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"> <h2 class="text-xl font-bold mb-4">Product List</h2> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> ${products.map((product) => renderTemplate`<div class="border rounded-lg p-4"> <img${addAttribute(product.imageUrl, "src")}${addAttribute(product.name, "alt")} class="w-full h-48 object-cover rounded-md mb-4"> <h3 class="text-lg font-bold">${product.name}</h3> <p class="text-gray-600 dark:text-gray-400">₹${product.price}</p> <p class="text-sm mt-2">${product.description}</p> <div class="mt-4 flex justify-end"> <a${addAttribute(`/admin/products/edit/${product.id}`, "href")} class="text-indigo-500 hover:underline">Edit</a> <button class="delete-product-btn text-red-500 hover:underline ml-4"${addAttribute(product.id, "data-id")}>Delete</button> </div> </div>`)} </div> </div> </div> ${renderScript($$result2, "/home/user/new2025/src/pages/admin/products/index.astro?astro&type=script&index=0&lang.ts")} ` })}`;
}, "/home/user/new2025/src/pages/admin/products/index.astro", void 0);

const $$file = "/home/user/new2025/src/pages/admin/products/index.astro";
const $$url = "/admin/products";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
