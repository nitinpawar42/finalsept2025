/* empty css                                        */
import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, l as renderScript, h as addAttribute } from '../chunks/astro/server_BeWHlNiw.mjs';
import 'kleur/colors';
import { $ as $$AdminLayout } from '../chunks/AdminLayout_ixLKFT-O.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, BarChart, Bar } from 'recharts';
import { d as db } from '../chunks/admin_HtBQTWCE.mjs';
export { renderers } from '../renderers.mjs';

const SalesChart = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/admin/sales");
        const salesData = await response.json();
        setData(salesData);
      } catch (error) {
        console.error("Error fetching sales data:", error);
      }
    };
    fetchData();
  }, []);
  return /* @__PURE__ */ jsx("div", { style: { width: "100%", height: 400 }, children: /* @__PURE__ */ jsx(ResponsiveContainer, { children: /* @__PURE__ */ jsxs(
    LineChart,
    {
      data,
      margin: {
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      },
      children: [
        /* @__PURE__ */ jsx(CartesianGrid, { strokeDasharray: "3 3" }),
        /* @__PURE__ */ jsx(XAxis, { dataKey: "date" }),
        /* @__PURE__ */ jsx(YAxis, {}),
        /* @__PURE__ */ jsx(Tooltip, {}),
        /* @__PURE__ */ jsx(Legend, {}),
        /* @__PURE__ */ jsx(Line, { type: "monotone", dataKey: "sales", stroke: "#8884d8", activeDot: { r: 8 } })
      ]
    }
  ) }) });
};

const TopProductsChart = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/admin/top-products");
        const topProducts = await response.json();
        setData(topProducts);
      } catch (error) {
        console.error("Error fetching top products data:", error);
      }
    };
    fetchData();
  }, []);
  return /* @__PURE__ */ jsx("div", { style: { width: "100%", height: 400 }, children: /* @__PURE__ */ jsx(ResponsiveContainer, { children: /* @__PURE__ */ jsxs(
    BarChart,
    {
      layout: "vertical",
      data,
      margin: {
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      },
      children: [
        /* @__PURE__ */ jsx(CartesianGrid, { strokeDasharray: "3 3" }),
        /* @__PURE__ */ jsx(XAxis, { type: "number" }),
        /* @__PURE__ */ jsx(YAxis, { dataKey: "name", type: "category", width: 150 }),
        /* @__PURE__ */ jsx(Tooltip, {}),
        /* @__PURE__ */ jsx(Legend, {}),
        /* @__PURE__ */ jsx(Bar, { dataKey: "revenue", fill: "#82ca9d" })
      ]
    }
  ) }) });
};

const TopResellersTable = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/admin/top-resellers");
        const topResellers = await response.json();
        setData(topResellers);
      } catch (error) {
        console.error("Error fetching top resellers data:", error);
      }
    };
    fetchData();
  }, []);
  return /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full table-auto", children: [
    /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "bg-gray-200 dark:bg-gray-700", children: [
      /* @__PURE__ */ jsx("th", { className: "px-4 py-2", children: "Reseller Name" }),
      /* @__PURE__ */ jsx("th", { className: "px-4 py-2", children: "Total Sales" }),
      /* @__PURE__ */ jsx("th", { className: "px-4 py-2", children: "Order Count" })
    ] }) }),
    /* @__PURE__ */ jsx("tbody", { children: data.map((reseller) => /* @__PURE__ */ jsxs("tr", { className: "border-b dark:border-gray-700", children: [
      /* @__PURE__ */ jsx("td", { className: "px-4 py-2", children: reseller.name }),
      /* @__PURE__ */ jsxs("td", { className: "px-4 py-2", children: [
        "$",
        reseller.totalSales.toFixed(2)
      ] }),
      /* @__PURE__ */ jsx("td", { className: "px-4 py-2", children: reseller.orderCount })
    ] }, reseller.id)) })
  ] }) });
};

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const usersRef = db.collection("users");
  const pendingResellersSnapshot = await usersRef.where("role", "==", "reseller").where("approvalStatus", "==", "pending").get();
  const pendingResellers = pendingResellersSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Admin Dashboard" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="grid grid-cols-1 lg:grid-cols-2 gap-6"> <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"> <h2 class="text-2xl font-bold mb-4">Sales Over Time</h2> ${renderComponent($$result2, "SalesChart", SalesChart, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/user/new2025/src/components/SalesChart.jsx", "client:component-export": "default" })} </div> <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"> <h2 class="text-2xl font-bold mb-4">Top Selling Products</h2> ${renderComponent($$result2, "TopProductsChart", TopProductsChart, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/user/new2025/src/components/TopProductsChart.jsx", "client:component-export": "default" })} </div> <div class="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"> <h2 class="text-2xl font-bold mb-4">Top Performing Resellers</h2> ${renderComponent($$result2, "TopResellersTable", TopResellersTable, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/user/new2025/src/components/TopResellersTable.jsx", "client:component-export": "default" })} </div> <div class="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"> <h2 class="text-2xl font-bold mb-4">Pending Reseller Approvals</h2> <div class="overflow-x-auto"> <table class="w-full table-auto"> <thead> <tr class="bg-gray-200 dark:bg-gray-700"> <th class="px-4 py-2">Full Name</th> <th class="px-4 py-2">Email</th> <th class="px-4 py-2">PAN</th> <th class="px-4 py-2">Actions</th> </tr> </thead> <tbody> ${pendingResellers.map((reseller) => renderTemplate`<tr class="border-b dark:border-gray-700"> <td class="px-4 py-2">${reseller.resellerDetails.fullName}</td> <td class="px-4 py-2">${reseller.email}</td> <td class="px-4 py-2">${reseller.resellerDetails.pan}</td> <td class="px-4 py-2"> <button class="approve-btn bg-green-500 text-white font-bold py-1 px-3 rounded-lg hover:bg-green-700"${addAttribute(reseller.id, "data-uid")}>Approve</button> <button class="reject-btn bg-red-500 text-white font-bold py-1 px-3 rounded-lg hover:bg-red-700 ml-2"${addAttribute(reseller.id, "data-uid")}>Reject</button> </td> </tr>`)} </tbody> </table> </div> </div> </div> ${renderScript($$result2, "/home/user/new2025/src/pages/admin/index.astro?astro&type=script&index=0&lang.ts")} ` })}`;
}, "/home/user/new2025/src/pages/admin/index.astro", void 0);

const $$file = "/home/user/new2025/src/pages/admin/index.astro";
const $$url = "/admin";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
