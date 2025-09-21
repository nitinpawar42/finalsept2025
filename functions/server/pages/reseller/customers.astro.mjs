/* empty css                                           */
import { e as createComponent, f as createAstro, k as renderComponent, r as renderTemplate, m as maybeRenderHead, l as renderScript, h as addAttribute } from '../../chunks/astro/server_BeWHlNiw.mjs';
import 'kleur/colors';
import { $ as $$ResellerLayout } from '../../chunks/ResellerLayout_BY7hhAJu.mjs';
import { d as db } from '../../chunks/admin_HtBQTWCE.mjs';
import { getAuth } from 'firebase-admin/auth';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$Customers = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Customers;
  const auth = getAuth();
  const sessionCookie = Astro2.cookies.get("session").value;
  const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);
  const resellerId = decodedClaims.uid;
  const customersRef = db.collection("customers").where("resellerId", "==", resellerId);
  const customersSnapshot = await customersRef.get();
  const customers = customersSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return renderTemplate`${renderComponent($$result, "ResellerLayout", $$ResellerLayout, { "title": "Manage Customers" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="container mx-auto"> <h1 class="text-2xl font-bold mb-6">Manage Customers</h1> <!-- Add Customer Form --> <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8"> <h2 class="text-xl font-bold mb-4">Add New Customer</h2> <form id="add-customer-form"> <div class="grid grid-cols-1 md:grid-cols-2 gap-4"> <input type="text" name="name" placeholder="Customer Name" class="w-full px-3 py-2 border rounded-lg" required> <input type="email" name="email" placeholder="Email" class="w-full px-3 py-2 border rounded-lg" required> <input type="tel" name="phone" placeholder="Phone" class="w-full px-3 py-2 border rounded-lg" required> <textarea name="address" placeholder="Address" class="w-full px-3 py-2 border rounded-lg md:col-span-2" required></textarea> </div> <button type="submit" class="mt-4 w-full bg-indigo-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700">Add Customer</button> </form> </div> <!-- Customer List --> <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"> <h2 class="text-xl font-bold mb-4">My Customers</h2> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> ${customers.map((customer) => renderTemplate`<div class="border rounded-lg p-4"> <h3 class="text-lg font-bold">${customer.name}</h3> <p class="text-gray-600 dark:text-gray-400">${customer.email}</p> <p class="text-gray-600 dark:text-gray-400">${customer.phone}</p> <p class="text-sm mt-2">${customer.address}</p> <div class="mt-4 flex justify-end"> <a${addAttribute(`/reseller/customers/edit/${customer.id}`, "href")} class="text-indigo-500 hover:underline">Edit</a> <button class="delete-customer-btn text-red-500 hover:underline ml-4"${addAttribute(customer.id, "data-id")}>Delete</button> </div> </div>`)} </div> </div> </div> ${renderScript($$result2, "/home/user/new2025/src/pages/reseller/customers.astro?astro&type=script&index=0&lang.ts")} ` })}`;
}, "/home/user/new2025/src/pages/reseller/customers.astro", void 0);

const $$file = "/home/user/new2025/src/pages/reseller/customers.astro";
const $$url = "/reseller/customers";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Customers,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
