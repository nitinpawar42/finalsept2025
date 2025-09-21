/* empty css                                           */
import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, l as renderScript, h as addAttribute } from '../../chunks/astro/server_BeWHlNiw.mjs';
import 'kleur/colors';
import { $ as $$AdminLayout } from '../../chunks/AdminLayout_ixLKFT-O.mjs';
import { getFirestore, query, collection, where, getDocs } from 'firebase/firestore';
import { getApps, initializeApp } from 'firebase/app';
export { renderers } from '../../renderers.mjs';

const $$Approvals = createComponent(async ($$result, $$props, $$slots) => {
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
  const q = query(collection(db, "users"), where("resellerApprovalStatus", "==", "pending"));
  const querySnapshot = await getDocs(q);
  const pendingResellers = querySnapshot.docs.map((doc2) => ({ id: doc2.id, ...doc2.data() }));
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Reseller Approvals" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6"> <h2 class="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">Pending Reseller Approvals</h2> <div class="overflow-x-auto"> <table class="min-w-full bg-white dark:bg-gray-800"> <thead class="bg-gray-200 dark:bg-gray-700"> <tr> <th class="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Full Name</th> <th class="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Email</th> <th class="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">PAN</th> <th class="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Mobile</th> <th class="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">Actions</th> </tr> </thead> <tbody class="divide-y divide-gray-200 dark:divide-gray-700"> ${pendingResellers.map((reseller) => renderTemplate`<tr${addAttribute(reseller.id, "key")}> <td class="py-4 px-6 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-200">${reseller.resellerDetails.fullName}</td> <td class="py-4 px-6 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">${reseller.email}</td> <td class="py-4 px-6 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">${reseller.resellerDetails.pan}</td> <td class="py-4 px-6 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">${reseller.resellerDetails.mobile}</td> <td class="py-4 px-6 whitespace-nowrap text-sm font-medium"> <button class="text-indigo-600 hover:text-indigo-900 approve-btn"${addAttribute(reseller.id, "data-id")}>Approve</button> <button class="text-red-600 hover:text-red-900 ml-4 reject-btn"${addAttribute(reseller.id, "data-id")}>Reject</button> </td> </tr>`)} </tbody> </table> </div> </div> ${renderScript($$result2, "/home/user/new2025/src/pages/admin/approvals.astro?astro&type=script&index=0&lang.ts")} ` })}`;
}, "/home/user/new2025/src/pages/admin/approvals.astro", void 0);

const $$file = "/home/user/new2025/src/pages/admin/approvals.astro";
const $$url = "/admin/approvals";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Approvals,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
