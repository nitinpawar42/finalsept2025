/* empty css                                        */
import { e as createComponent, n as renderHead, r as renderTemplate } from '../chunks/astro/server_BeWHlNiw.mjs';
import 'kleur/colors';
import 'clsx';
import { d as db } from '../chunks/admin_HtBQTWCE.mjs';
export { renderers } from '../renderers.mjs';

const resellers = [
  {
    id: "gadget-go",
    name: 'GadgetGo',
    email: 'contact@gadgetgo.com',
    products: [101, 102, 103],
  },
  {
    id: "fashion-forward",
    name: 'FashionForward',
    email: 'support@fashionforward.com',
    products: [201, 202],
  },
];

const products = [
  {
    id: 101,
    resellerId: "gadget-go",
    name: 'Smart Watch',
    price: 199.99,
    stock: 50,
  },
  {
    id: 102,
    resellerId: "gadget-go",
    name: 'Wireless Earbuds',
    price: 89.99,
    stock: 120,
  },
  {
    id: 103,
    resellerId: "gadget-go",
    name: 'Portable Charger',
    price: 45.50,
    stock: 75,
  },
  {
    id: 201,
    resellerId: "fashion-forward",
    name: 'Classic Leather Jacket',
    price: 250.00,
    stock: 30,
  },
  {
    id: 202,
    resellerId: "fashion-forward",
    name: 'Designer Sunglasses',
    price: 150.75,
    stock: 60,
  },
];

const $$Seed = createComponent(async ($$result, $$props, $$slots) => {
  let message = "Starting the seeding process...";
  try {
    console.log("Seeding resellers...");
    for (const reseller of resellers) {
      await db.collection("resellers").doc(reseller.id).set(reseller);
    }
    console.log("Resellers seeded successfully!");
    console.log("Seeding products...");
    for (const product of products) {
      await db.collection("products").add(product);
    }
    console.log("Products seeded successfully!");
    message = "Database seeded successfully! You can now delete the /src/pages/seed.astro file.";
  } catch (error) {
    console.error("Error seeding database:", error);
    message = "There was an error seeding the database. Please check the logs.";
  }
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Seeding Database</title>${renderHead()}</head> <body> <h1>${message}</h1> </body></html>`;
}, "/home/user/new2025/src/pages/seed.astro", void 0);

const $$file = "/home/user/new2025/src/pages/seed.astro";
const $$url = "/seed";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Seed,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
