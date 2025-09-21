/* empty css                                                 */
import { e as createComponent, f as createAstro, k as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute, l as renderScript } from '../../../../chunks/astro/server_BeWHlNiw.mjs';
import 'kleur/colors';
import { $ as $$ResellerLayout } from '../../../../chunks/ResellerLayout_BY7hhAJu.mjs';
import { d as db } from '../../../../chunks/admin_HtBQTWCE.mjs';
import { getAuth } from 'firebase-admin/auth';
export { renderers } from '../../../../renderers.mjs';

const $$Astro = createAstro();
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const { id } = Astro2.params;
  const sessionCookie = Astro2.cookies.get("session").value;
  const decodedClaims = await getAuth().verifySessionCookie(sessionCookie, true);
  const resellerId = decodedClaims.uid;
  const customerRef = db.collection("customers").doc(id);
  const customerDoc = await customerRef.get();
  if (!customerDoc.exists || customerDoc.data().resellerId !== resellerId) {
    return Astro2.redirect("/reseller/customers");
  }
  const customer = { id: customerDoc.id, ...customerDoc.data() };
  return renderTemplate`${renderComponent($$result, "ResellerLayout", $$ResellerLayout, { "title": `Edit ${customer.name}` }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="container mx-auto"> <h1 class="text-2xl font-bold mb-6">Edit Customer</h1> <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"> <form id="edit-customer-form"> <div class="grid grid-cols-1 md:grid-cols-2 gap-4"> <input type="text" name="name"${addAttribute(customer.name, "value")} class="w-full px-3 py-2 border rounded-lg" required> <input type="email" name="email"${addAttribute(customer.email, "value")} class="w-full px-3 py-2 border rounded-lg" required> <input type="tel" name="phone"${addAttribute(customer.phone, "value")} class="w-full px-3 py-2 border rounded-lg" required> <textarea name="address" class="w-full px-3 py-2 border rounded-lg md:col-span-2" required>${customer.address}</textarea> </div> <button type="submit" class="mt-4 w-full bg-indigo-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700">Update Customer</button> </form> </div> </div> ${renderScript($$result2, "/home/user/new2025/src/pages/reseller/customers/edit/[id].astro?astro&type=script&index=0&lang.ts")} ` })}`;
}, "/home/user/new2025/src/pages/reseller/customers/edit/[id].astro", void 0);

const $$file = "/home/user/new2025/src/pages/reseller/customers/edit/[id].astro";
const $$url = "/reseller/customers/edit/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$id,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
