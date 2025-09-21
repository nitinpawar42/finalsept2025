/* empty css                                           */
import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, l as renderScript, h as addAttribute } from '../../chunks/astro/server_BeWHlNiw.mjs';
import 'kleur/colors';
import { $ as $$AdminLayout } from '../../chunks/AdminLayout_ixLKFT-O.mjs';
import { getFirestore, getDocs, collection } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getApps, initializeApp } from 'firebase/app';
export { renderers } from '../../renderers.mjs';

const $$ManageProducts = createComponent(async ($$result, $$props, $$slots) => {
  const firebaseConfig = {
    apiKey: "AIzaSyABOmg9FZo711ujsPCb7XOupDM4wh-Av9o",
    authDomain: "recent2025-8c891.firebaseapp.com",
    projectId: "recent2025-8c891",
    storageBucket: "recent2025-8c891.firebasestorage.app",
    messagingSenderId: "815105434520",
    appId: "1:815105434520:web:833e4efb0224c9289e81ed"
  };
  if (!getApps().length) {
    initializeApp(firebaseConfig);
  }
  const db = getFirestore();
  getStorage();
  const querySnapshot = await getDocs(collection(db, "products"));
  const products = querySnapshot.docs.map((doc2) => ({ id: doc2.id, ...doc2.data() }));
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Manage Products" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6"> <h2 class="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">Add New Product</h2> <form id="add-product-form" class="grid grid-cols-1 md:grid-cols-2 gap-6"> <div class="input-group"> <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label> <input type="text" id="name" name="name" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" required> </div> <div class="input-group"> <label for="description" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label> <textarea id="description" name="description" rows="3" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" required></textarea> </div> <div class="input-group"> <label for="price" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Price</label> <input type="number" id="price" name="price" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" required> </div> <div class="input-group"> <label for="length" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Length (cm)</label> <input type="number" id="length" name="length" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" required> </div> <div class="input-group"> <label for="breadth" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Breadth (cm)</label> <input type="number" id="breadth" name="breadth" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" required> </div> <div class="input-group"> <label for="height" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Height (cm)</label> <input type="number" id="height" name="height" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" required> </div> <div class="input-group"> <label for="weight" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Weight (kg)</label> <input type="number" id="weight" name="weight" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" required> </div> <div class="input-group"> <label for="image" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Image</label> <input type="file" id="image" name="image" class="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100" required> </div> <div class="input-group"> <label for="videoUrl" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Video URL (Optional)</label> <input type="url" id="videoUrl" name="videoUrl" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"> </div> <div class="md:col-span-2"> <button type="submit" class="w-full bg-indigo-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700">Add Product</button> </div> </form> </div> <div class="mt-8 bg-white dark:bg-gray-800 shadow-md rounded-lg p-6"> <h2 class="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">Existing Products</h2> <div class="overflow-x-auto"> <table class="min-w-full bg-white dark:bg-gray-800"> <thead class="bg-gray-200 dark:bg-gray-700"> <tr> <th class="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Name</th> <th class="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Price</th> <th class="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Actions</th> </tr> </thead> <tbody id="products-table-body" class="divide-y divide-gray-200 dark:divide-gray-700"> ${products.map((product) => renderTemplate`<tr${addAttribute(product.id, "key")}> <td class="py-4 px-6 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-200">${product.name}</td> <td class="py-4 px-6 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">${product.price}</td> <td class="py-4 px-6 whitespace-nowrap text-sm font-medium"> <button class="text-indigo-600 hover:text-indigo-900 edit-btn"${addAttribute(product.id, "data-id")}>Edit</button> <button class="text-red-600 hover:text-red-900 ml-4 delete-btn"${addAttribute(product.id, "data-id")}>Delete</button> </td> </tr>`)} </tbody> </table> </div> </div> ${renderScript($$result2, "/home/user/new2025/src/pages/admin/manage-products.astro?astro&type=script&index=0&lang.ts")} ` })}`;
}, "/home/user/new2025/src/pages/admin/manage-products.astro", void 0);

const $$file = "/home/user/new2025/src/pages/admin/manage-products.astro";
const $$url = "/admin/manage-products";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$ManageProducts,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
