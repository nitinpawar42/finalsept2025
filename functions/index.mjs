import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_BcMkVnHX.mjs';
import { manifest } from './manifest_BkQff-IO.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/admin/all-products.astro.mjs');
const _page2 = () => import('./pages/admin/approvals.astro.mjs');
const _page3 = () => import('./pages/admin/customize.astro.mjs');
const _page4 = () => import('./pages/admin/manage-products.astro.mjs');
const _page5 = () => import('./pages/admin/my-products.astro.mjs');
const _page6 = () => import('./pages/admin/products/edit/_id_.astro.mjs');
const _page7 = () => import('./pages/admin/products.astro.mjs');
const _page8 = () => import('./pages/admin/profile.astro.mjs');
const _page9 = () => import('./pages/admin/resellers.astro.mjs');
const _page10 = () => import('./pages/admin.astro.mjs');
const _page11 = () => import('./pages/api/admin/sales.astro.mjs');
const _page12 = () => import('./pages/api/admin/top-products.astro.mjs');
const _page13 = () => import('./pages/api/admin/top-resellers.astro.mjs');
const _page14 = () => import('./pages/api/book-shipment.astro.mjs');
const _page15 = () => import('./pages/api/calculate-shipping.astro.mjs');
const _page16 = () => import('./pages/api/cart/add.astro.mjs');
const _page17 = () => import('./pages/api/cart/remove.astro.mjs');
const _page18 = () => import('./pages/api/create-order.astro.mjs');
const _page19 = () => import('./pages/api/create-razorpay-order.astro.mjs');
const _page20 = () => import('./pages/api/customers/_id_.astro.mjs');
const _page21 = () => import('./pages/api/customers.astro.mjs');
const _page22 = () => import('./pages/api/generate-invoice.astro.mjs');
const _page23 = () => import('./pages/api/login.astro.mjs');
const _page24 = () => import('./pages/api/logout.astro.mjs');
const _page25 = () => import('./pages/api/orders.astro.mjs');
const _page26 = () => import('./pages/api/products/_id_.astro.mjs');
const _page27 = () => import('./pages/api/products.astro.mjs');
const _page28 = () => import('./pages/api/remove-product.astro.mjs');
const _page29 = () => import('./pages/api/reseller/register.astro.mjs');
const _page30 = () => import('./pages/api/reseller/sales.astro.mjs');
const _page31 = () => import('./pages/api/reseller/top-customers.astro.mjs');
const _page32 = () => import('./pages/api/reseller-approval.astro.mjs');
const _page33 = () => import('./pages/api/shipping-cost.astro.mjs');
const _page34 = () => import('./pages/api/update-profile.astro.mjs');
const _page35 = () => import('./pages/api/verify-payment.astro.mjs');
const _page36 = () => import('./pages/api/webhooks/razorpay.astro.mjs');
const _page37 = () => import('./pages/cart.astro.mjs');
const _page38 = () => import('./pages/checkout.astro.mjs');
const _page39 = () => import('./pages/confirmation.astro.mjs');
const _page40 = () => import('./pages/login.astro.mjs');
const _page41 = () => import('./pages/reseller/customers/edit/_id_.astro.mjs');
const _page42 = () => import('./pages/reseller/customers.astro.mjs');
const _page43 = () => import('./pages/reseller/dashboard.astro.mjs');
const _page44 = () => import('./pages/reseller/products.astro.mjs');
const _page45 = () => import('./pages/reseller/register.astro.mjs');
const _page46 = () => import('./pages/reseller.astro.mjs');
const _page47 = () => import('./pages/resellers/_id_.astro.mjs');
const _page48 = () => import('./pages/seed.astro.mjs');
const _page49 = () => import('./pages/_resellerid_.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/node.js", _page0],
    ["src/pages/admin/all-products.astro", _page1],
    ["src/pages/admin/approvals.astro", _page2],
    ["src/pages/admin/customize.astro", _page3],
    ["src/pages/admin/manage-products.astro", _page4],
    ["src/pages/admin/my-products.astro", _page5],
    ["src/pages/admin/products/edit/[id].astro", _page6],
    ["src/pages/admin/products/index.astro", _page7],
    ["src/pages/admin/profile.astro", _page8],
    ["src/pages/admin/resellers.astro", _page9],
    ["src/pages/admin/index.astro", _page10],
    ["src/pages/api/admin/sales.js", _page11],
    ["src/pages/api/admin/top-products.js", _page12],
    ["src/pages/api/admin/top-resellers.js", _page13],
    ["src/pages/api/book-shipment.ts", _page14],
    ["src/pages/api/calculate-shipping.js", _page15],
    ["src/pages/api/cart/add.js", _page16],
    ["src/pages/api/cart/remove.js", _page17],
    ["src/pages/api/create-order.js", _page18],
    ["src/pages/api/create-razorpay-order.js", _page19],
    ["src/pages/api/customers/[id].ts", _page20],
    ["src/pages/api/customers.ts", _page21],
    ["src/pages/api/generate-invoice.ts", _page22],
    ["src/pages/api/login.ts", _page23],
    ["src/pages/api/logout.ts", _page24],
    ["src/pages/api/orders.ts", _page25],
    ["src/pages/api/products/[id].ts", _page26],
    ["src/pages/api/products.ts", _page27],
    ["src/pages/api/remove-product.ts", _page28],
    ["src/pages/api/reseller/register.ts", _page29],
    ["src/pages/api/reseller/sales.js", _page30],
    ["src/pages/api/reseller/top-customers.js", _page31],
    ["src/pages/api/reseller-approval.ts", _page32],
    ["src/pages/api/shipping-cost.ts", _page33],
    ["src/pages/api/update-profile.ts", _page34],
    ["src/pages/api/verify-payment.js", _page35],
    ["src/pages/api/webhooks/razorpay.ts", _page36],
    ["src/pages/cart.astro", _page37],
    ["src/pages/checkout.astro", _page38],
    ["src/pages/confirmation.astro", _page39],
    ["src/pages/login.astro", _page40],
    ["src/pages/reseller/customers/edit/[id].astro", _page41],
    ["src/pages/reseller/customers.astro", _page42],
    ["src/pages/reseller/dashboard.astro", _page43],
    ["src/pages/reseller/products.astro", _page44],
    ["src/pages/reseller/register.astro", _page45],
    ["src/pages/reseller/index.astro", _page46],
    ["src/pages/resellers/[id].astro", _page47],
    ["src/pages/seed.astro", _page48],
    ["src/pages/[resellerId].astro", _page49]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./_noop-actions.mjs'),
    middleware: () => import('./_astro-internal_middleware.mjs')
});
const _args = {
    "mode": "middleware",
    "client": "file:///home/user/new2025/dist/client/",
    "server": "file:///home/user/new2025/dist/server/",
    "host": false,
    "port": 4321,
    "assets": "_astro",
    "experimentalStaticHeaders": false
};
const _exports = createExports(_manifest, _args);
const handler = _exports['handler'];
const startServer = _exports['startServer'];
const options = _exports['options'];
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { handler, options, pageMap, startServer };
