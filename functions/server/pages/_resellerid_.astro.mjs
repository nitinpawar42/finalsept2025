/* empty css                                        */
import { e as createComponent, f as createAstro, k as renderComponent, r as renderTemplate, aj as defineScriptVars, h as addAttribute, m as maybeRenderHead } from '../chunks/astro/server_BeWHlNiw.mjs';
import 'kleur/colors';
import { $ as $$PublicLayout } from '../chunks/PublicLayout_DUZwmbNu.mjs';
import { d as db } from '../chunks/admin_HtBQTWCE.mjs';
export { renderers } from '../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const $$resellerId = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$resellerId;
  const { resellerId } = Astro2.params;
  const resellerRef = db.collection("users").doc(resellerId);
  const resellerDoc = await resellerRef.get();
  if (!resellerDoc.exists || resellerDoc.data().role !== "reseller") {
    return new Response("Reseller not found", { status: 404 });
  }
  const reseller = resellerDoc.data();
  const productsRef = db.collection("products");
  const productsSnapshot = await productsRef.get();
  const products = productsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return renderTemplate`${renderComponent($$result, "PublicLayout", $$PublicLayout, { "title": `{reseller.businessName}'s Store` }, { "default": async ($$result2) => renderTemplate(_a || (_a = __template([" ", '<div class="container mx-auto"> <div class="text-center mb-12"> <h1 class="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl">', `'s Store
</h1> <p class="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
Welcome to my official store. Happy shopping!
</p> </div> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"> `, " </div> </div> <script>(function(){", "\n    document.querySelectorAll('.add-to-cart-btn').forEach(button => {\n      button.addEventListener('click', (e) => {\n        const btn = e.currentTarget;\n        const productId = btn.dataset.productId;\n        const productName = btn.dataset.productName;\n        const productPrice = parseFloat(btn.dataset.productPrice);\n        const productImage = btn.dataset.productImage;\n\n        let cart = JSON.parse(localStorage.getItem('cart')) || [];\n        \n        // Store resellerId on the first add\n        if (cart.length === 0) {\n            localStorage.setItem('resellerId', resellerId);\n        } else {\n            const storedResellerId = localStorage.getItem('resellerId');\n            if (storedResellerId !== resellerId) {\n                if (confirm('You have items from another reseller in your cart. Do you want to clear your cart and add this item?')) {\n                    cart = []; // Clear the cart\n                    localStorage.setItem('resellerId', resellerId);\n                } else {\n                    return; // Do not add the item\n                }\n            }\n        }\n\n        const existingItem = cart.find(item => item.id === productId);\n\n        if (existingItem) {\n          existingItem.quantity++;\n        } else {\n          cart.push({\n            id: productId,\n            name: productName,\n            price: productPrice,\n            image: productImage,\n            quantity: 1,\n          });\n        }\n\n        localStorage.setItem('cart', JSON.stringify(cart));\n\n        // Animate button\n        btn.classList.add('animate-pulse');\n        btn.textContent = 'Added!';\n        setTimeout(() => {\n            btn.classList.remove('animate-pulse');\n            btn.textContent = 'Add to Cart';\n        }, 1500);\n\n        // Dispatch a custom event to update the cart count in the header\n        window.dispatchEvent(new CustomEvent('cart-updated'));\n      });\n    });\n  })();<\/script> "])), maybeRenderHead(), reseller.businessName, products.map((product) => renderTemplate`<div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transform hover:-translate-y-2 transition-transform duration-300"> <img${addAttribute(product.imageUrl, "src")}${addAttribute(`Image of ${product.name}`, "alt")} class="w-full h-56 object-cover"> <div class="p-6"> <h3 class="text-xl font-bold text-gray-900 dark:text-white">${product.name}</h3> <p class="mt-2 text-lg font-semibold text-indigo-500 dark:text-indigo-400">₹${product.price.toFixed(2)}</p> <p class="mt-3 text-sm text-gray-600 dark:text-gray-400 h-20 overflow-y-auto">${product.description}</p> <button class="add-to-cart-btn mt-6 w-full bg-indigo-500 text-white font-bold py-3 px-5 rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300"${addAttribute(product.id, "data-product-id")}${addAttribute(product.name, "data-product-name")}${addAttribute(product.price, "data-product-price")}${addAttribute(product.imageUrl, "data-product-image")}>
Add to Cart
</button> </div> </div>`), defineScriptVars({ resellerId })) })}`;
}, "/home/user/new2025/src/pages/[resellerId].astro", void 0);

const $$file = "/home/user/new2025/src/pages/[resellerId].astro";
const $$url = "/[resellerId]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$resellerId,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
