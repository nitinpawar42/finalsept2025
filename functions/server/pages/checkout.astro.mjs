/* empty css                                        */
import { e as createComponent, f as createAstro, k as renderComponent, r as renderTemplate, aj as defineScriptVars, l as renderScript, h as addAttribute, m as maybeRenderHead } from '../chunks/astro/server_BeWHlNiw.mjs';
import 'kleur/colors';
import { $ as $$PublicLayout } from '../chunks/PublicLayout_DUZwmbNu.mjs';
import { d as db } from '../chunks/admin_HtBQTWCE.mjs';
export { renderers } from '../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const $$Checkout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Checkout;
  const resellerId = Astro2.url.searchParams.get("resellerId");
  if (!resellerId) {
    return Astro2.redirect("/cart");
  }
  const customersRef = db.collection("customers").where("resellerId", "==", resellerId);
  const customersSnapshot = await customersRef.get();
  const customers = customersSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return renderTemplate`${renderComponent($$result, "PublicLayout", $$PublicLayout, { "title": "Checkout" }, { "default": async ($$result2) => renderTemplate(_a || (_a = __template([" ", '<div class="container mx-auto"> <h1 class="text-3xl font-bold mb-8">Checkout</h1> <div class="grid grid-cols-1 lg:grid-cols-3 gap-8"> <!-- Shipping Details Form --> <div class="lg:col-span-2 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md"> <h2 class="text-2xl font-bold mb-6">Shipping Information</h2> <!-- Customer Selector --> <div class="mb-6"> <label for="customer-select" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Returning Customer?</label> <select id="customer-select" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"> <option value="">New Customer</option> ', ' </select> </div> <form id="checkout-form"> <div class="grid grid-cols-1 md:grid-cols-2 gap-6"> <input type="text" name="name" placeholder="Full Name" class="w-full px-4 py-3 border rounded-lg bg-gray-50 dark:bg-gray-700" required> <input type="email" name="email" placeholder="Email Address" class="w-full px-4 py-3 border rounded-lg bg-gray-50 dark:bg-gray-700" required> <input type="tel" name="phone" placeholder="Phone Number" class="w-full px-4 py-3 border rounded-lg bg-gray-50 dark:bg-gray-700" required> <textarea name="address" placeholder="Full Shipping Address" class="w-full px-4 py-3 border rounded-lg md:col-span-2 bg-gray-50 dark:bg-gray-700" rows="3" required></textarea> <input type="text" name="pincode" placeholder="Pincode" class="w-full px-4 py-3 border rounded-lg bg-gray-50 dark:bg-gray-700" required> </div> <input type="hidden" name="resellerId"', '> <button type="submit" id="payment-btn" class="mt-8 w-full bg-indigo-600 text-white font-bold py-4 px-6 rounded-lg hover:bg-indigo-700 transition-transform duration-300 transform hover:scale-105">Place Order & Pay</button> </form> <p id="shipping-cost" class="mt-4 text-lg font-semibold text-center"></p> </div> <!-- Order Summary --> <div class="bg-gray-50 dark:bg-gray-700 p-8 rounded-lg shadow-inner"> <h2 class="text-2xl font-bold mb-6">Order Summary</h2> <div id="order-summary-container"></div> </div> </div> </div>  ', " <script>(function(){", `
        const orderSummaryContainer = document.getElementById('order-summary-container');
        const checkoutForm = document.getElementById('checkout-form');
        const paymentBtn = document.getElementById('payment-btn');
        const customerSelect = document.getElementById('customer-select');
        const shippingCostEl = document.getElementById('shipping-cost');

        function renderOrderSummary() {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            if (cart.length === 0) {
                window.location.href = \`/cart\`;
                return;
            }

            let summaryHTML = '<div class="space-y-4">';
            let subtotal = 0;

            cart.forEach(item => {
                subtotal += item.price * item.quantity;
                summaryHTML += \`
                    <div class="flex justify-between items-center">
                        <div class="flex items-center">
                           <img src="\${item.image}" alt="\${item.name}" class="w-12 h-12 object-cover rounded-md mr-4">
                            <div>
                                <p class="font-semibold">\${item.name}</p>
                                <p class="text-sm text-gray-500 dark:text-gray-400">x \${item.quantity}</p>
                            </div>
                        </div>
                        <p>\u20B9\${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                \`;
            });
            summaryHTML += '</div>';
            summaryHTML += \`<div class="border-t mt-6 pt-6 space-y-2">
                              <div class="flex justify-between font-semibold"><p>Subtotal</p><p>\u20B9\${subtotal.toFixed(2)}</p></div>
                              <div id="shipping-line" class="flex justify-between font-semibold"><p>Shipping</p><p>...</p></div>
                              <div class="flex justify-between text-xl font-bold"><p>Total</p><p id="total-price">\u20B9\${subtotal.toFixed(2)}</p></div>
                           </div>\`;

            orderSummaryContainer.innerHTML = summaryHTML;
        }

        function fillFormWithCustomerData(customer) {
            checkoutForm.elements['name'].value = customer.name || '';
            checkoutForm.elements['email'].value = customer.email || '';
            checkoutForm.elements['phone'].value = customer.phone || '';
            checkoutForm.elements['address'].value = customer.address || '';
        }

        async function getShippingCost(pincode) {
             shippingCostEl.textContent = 'Calculating shipping cost...';
             document.getElementById('shipping-line').children[1].textContent = 'Calculating...';
             
             const cart = JSON.parse(localStorage.getItem('cart')) || [];
             const totalWeight = cart.reduce((total, item) => total + (item.weight || 0.5) * item.quantity, 0); // Assuming a default weight if not present

             try {
                 const response = await fetch(\`/api/shipping-cost\`, {
                     method: 'POST',
                     headers: { 'Content-Type': 'application/json' },
                     body: JSON.stringify({ pincode, weight: totalWeight })
                 });
                 
                 if (!response.ok) throw new Error('Failed to fetch shipping cost.');
                 
                 const data = await response.json();
                 const cost = data.cost;

                 shippingCostEl.textContent = \`Shipping Cost: \u20B9\${cost.toFixed(2)}\`;
                 document.getElementById('shipping-line').children[1].textContent = \`\u20B9\${cost.toFixed(2)}\`;

                 const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
                 const total = subtotal + cost;
                 document.getElementById('total-price').textContent = \`\u20B9\${total.toFixed(2)}\`;

                 return cost;

             } catch (error) {
                 console.error('Shipping Cost Error:', error);
                 shippingCostEl.textContent = 'Could not calculate shipping cost.';
                  document.getElementById('shipping-line').children[1].textContent = 'N/A';
                 return null;
             }
        }

        customerSelect.addEventListener('change', (e) => {
            if (e.target.value) {
                const customer = JSON.parse(e.target.value);
                fillFormWithCustomerData(customer);
                 if (customer.pincode) { // Assuming pincode is stored with customer
                    checkoutForm.elements['pincode'].value = customer.pincode;
                    getShippingCost(customer.pincode);
                }
            } else {
                checkoutForm.reset();
            }
        });

         checkoutForm.elements['pincode'].addEventListener('blur', (e) => {
            const pincode = e.target.value;
            if (pincode && pincode.length === 6) {
                getShippingCost(pincode);
            }
        });


        checkoutForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            paymentBtn.disabled = true;
            paymentBtn.textContent = 'Processing...';

            const formData = new FormData(checkoutForm);
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            const shippingCost = parseFloat(shippingCostEl.textContent.replace(/[^0-9.]/g, '')) || 0;

            try {
                const response = await fetch('/api/orders', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        cart,
                        resellerId,
                        shippingCost,
                        customerDetails: {
                            name: formData.get('name'),
                            email: formData.get('email'),
                            phone: formData.get('phone'),
                            address: formData.get('address'),
                            pincode: formData.get('pincode'),
                        }
                    })
                });

                if (!response.ok) {
                    const error = await response.json();
                    throw new Error(error.message || 'Failed to create order.');
                }

                const orderData = await response.json();

                const options = {
                    key: orderData.razorpayKey,
                    amount: orderData.amount,
                    currency: "INR",
                    name: "Reseller Platform",
                    description: \`Order #\${orderData.receipt}\`,
                    order_id: orderData.id,
                    handler: function (response){
                        // On successful payment, redirect to a confirmation page
                        localStorage.removeItem('cart');
                        localStorage.removeItem('resellerId');
                        window.location.href = \`/confirmation?orderId=\${orderData.receipt}\`;
                    },
                    prefill: {
                        name: formData.get('name'),
                        email: formData.get('email'),
                        contact: formData.get('phone')
                    },
                    theme: {
                        color: "#3399cc"
                    }
                };

                const rzp = new Razorpay(options);
                rzp.open();

            } catch (error) {
                alert(\`Error: \${error.message}\`);
                paymentBtn.disabled = false;
                paymentBtn.textContent = 'Place Order & Pay';
            }
        });

        document.addEventListener('DOMContentLoaded', renderOrderSummary);
    })();<\/script> `], [" ", '<div class="container mx-auto"> <h1 class="text-3xl font-bold mb-8">Checkout</h1> <div class="grid grid-cols-1 lg:grid-cols-3 gap-8"> <!-- Shipping Details Form --> <div class="lg:col-span-2 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md"> <h2 class="text-2xl font-bold mb-6">Shipping Information</h2> <!-- Customer Selector --> <div class="mb-6"> <label for="customer-select" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Returning Customer?</label> <select id="customer-select" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"> <option value="">New Customer</option> ', ' </select> </div> <form id="checkout-form"> <div class="grid grid-cols-1 md:grid-cols-2 gap-6"> <input type="text" name="name" placeholder="Full Name" class="w-full px-4 py-3 border rounded-lg bg-gray-50 dark:bg-gray-700" required> <input type="email" name="email" placeholder="Email Address" class="w-full px-4 py-3 border rounded-lg bg-gray-50 dark:bg-gray-700" required> <input type="tel" name="phone" placeholder="Phone Number" class="w-full px-4 py-3 border rounded-lg bg-gray-50 dark:bg-gray-700" required> <textarea name="address" placeholder="Full Shipping Address" class="w-full px-4 py-3 border rounded-lg md:col-span-2 bg-gray-50 dark:bg-gray-700" rows="3" required></textarea> <input type="text" name="pincode" placeholder="Pincode" class="w-full px-4 py-3 border rounded-lg bg-gray-50 dark:bg-gray-700" required> </div> <input type="hidden" name="resellerId"', '> <button type="submit" id="payment-btn" class="mt-8 w-full bg-indigo-600 text-white font-bold py-4 px-6 rounded-lg hover:bg-indigo-700 transition-transform duration-300 transform hover:scale-105">Place Order & Pay</button> </form> <p id="shipping-cost" class="mt-4 text-lg font-semibold text-center"></p> </div> <!-- Order Summary --> <div class="bg-gray-50 dark:bg-gray-700 p-8 rounded-lg shadow-inner"> <h2 class="text-2xl font-bold mb-6">Order Summary</h2> <div id="order-summary-container"></div> </div> </div> </div>  ', " <script>(function(){", `
        const orderSummaryContainer = document.getElementById('order-summary-container');
        const checkoutForm = document.getElementById('checkout-form');
        const paymentBtn = document.getElementById('payment-btn');
        const customerSelect = document.getElementById('customer-select');
        const shippingCostEl = document.getElementById('shipping-cost');

        function renderOrderSummary() {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            if (cart.length === 0) {
                window.location.href = \\\`/cart\\\`;
                return;
            }

            let summaryHTML = '<div class="space-y-4">';
            let subtotal = 0;

            cart.forEach(item => {
                subtotal += item.price * item.quantity;
                summaryHTML += \\\`
                    <div class="flex justify-between items-center">
                        <div class="flex items-center">
                           <img src="\\\${item.image}" alt="\\\${item.name}" class="w-12 h-12 object-cover rounded-md mr-4">
                            <div>
                                <p class="font-semibold">\\\${item.name}</p>
                                <p class="text-sm text-gray-500 dark:text-gray-400">x \\\${item.quantity}</p>
                            </div>
                        </div>
                        <p>\u20B9\\\${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                \\\`;
            });
            summaryHTML += '</div>';
            summaryHTML += \\\`<div class="border-t mt-6 pt-6 space-y-2">
                              <div class="flex justify-between font-semibold"><p>Subtotal</p><p>\u20B9\\\${subtotal.toFixed(2)}</p></div>
                              <div id="shipping-line" class="flex justify-between font-semibold"><p>Shipping</p><p>...</p></div>
                              <div class="flex justify-between text-xl font-bold"><p>Total</p><p id="total-price">\u20B9\\\${subtotal.toFixed(2)}</p></div>
                           </div>\\\`;

            orderSummaryContainer.innerHTML = summaryHTML;
        }

        function fillFormWithCustomerData(customer) {
            checkoutForm.elements['name'].value = customer.name || '';
            checkoutForm.elements['email'].value = customer.email || '';
            checkoutForm.elements['phone'].value = customer.phone || '';
            checkoutForm.elements['address'].value = customer.address || '';
        }

        async function getShippingCost(pincode) {
             shippingCostEl.textContent = 'Calculating shipping cost...';
             document.getElementById('shipping-line').children[1].textContent = 'Calculating...';
             
             const cart = JSON.parse(localStorage.getItem('cart')) || [];
             const totalWeight = cart.reduce((total, item) => total + (item.weight || 0.5) * item.quantity, 0); // Assuming a default weight if not present

             try {
                 const response = await fetch(\\\`/api/shipping-cost\\\`, {
                     method: 'POST',
                     headers: { 'Content-Type': 'application/json' },
                     body: JSON.stringify({ pincode, weight: totalWeight })
                 });
                 
                 if (!response.ok) throw new Error('Failed to fetch shipping cost.');
                 
                 const data = await response.json();
                 const cost = data.cost;

                 shippingCostEl.textContent = \\\`Shipping Cost: \u20B9\\\${cost.toFixed(2)}\\\`;
                 document.getElementById('shipping-line').children[1].textContent = \\\`\u20B9\\\${cost.toFixed(2)}\\\`;

                 const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
                 const total = subtotal + cost;
                 document.getElementById('total-price').textContent = \\\`\u20B9\\\${total.toFixed(2)}\\\`;

                 return cost;

             } catch (error) {
                 console.error('Shipping Cost Error:', error);
                 shippingCostEl.textContent = 'Could not calculate shipping cost.';
                  document.getElementById('shipping-line').children[1].textContent = 'N/A';
                 return null;
             }
        }

        customerSelect.addEventListener('change', (e) => {
            if (e.target.value) {
                const customer = JSON.parse(e.target.value);
                fillFormWithCustomerData(customer);
                 if (customer.pincode) { // Assuming pincode is stored with customer
                    checkoutForm.elements['pincode'].value = customer.pincode;
                    getShippingCost(customer.pincode);
                }
            } else {
                checkoutForm.reset();
            }
        });

         checkoutForm.elements['pincode'].addEventListener('blur', (e) => {
            const pincode = e.target.value;
            if (pincode && pincode.length === 6) {
                getShippingCost(pincode);
            }
        });


        checkoutForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            paymentBtn.disabled = true;
            paymentBtn.textContent = 'Processing...';

            const formData = new FormData(checkoutForm);
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            const shippingCost = parseFloat(shippingCostEl.textContent.replace(/[^0-9.]/g, '')) || 0;

            try {
                const response = await fetch('/api/orders', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        cart,
                        resellerId,
                        shippingCost,
                        customerDetails: {
                            name: formData.get('name'),
                            email: formData.get('email'),
                            phone: formData.get('phone'),
                            address: formData.get('address'),
                            pincode: formData.get('pincode'),
                        }
                    })
                });

                if (!response.ok) {
                    const error = await response.json();
                    throw new Error(error.message || 'Failed to create order.');
                }

                const orderData = await response.json();

                const options = {
                    key: orderData.razorpayKey,
                    amount: orderData.amount,
                    currency: "INR",
                    name: "Reseller Platform",
                    description: \\\`Order #\\\${orderData.receipt}\\\`,
                    order_id: orderData.id,
                    handler: function (response){
                        // On successful payment, redirect to a confirmation page
                        localStorage.removeItem('cart');
                        localStorage.removeItem('resellerId');
                        window.location.href = \\\`/confirmation?orderId=\\\${orderData.receipt}\\\`;
                    },
                    prefill: {
                        name: formData.get('name'),
                        email: formData.get('email'),
                        contact: formData.get('phone')
                    },
                    theme: {
                        color: "#3399cc"
                    }
                };

                const rzp = new Razorpay(options);
                rzp.open();

            } catch (error) {
                alert(\\\`Error: \\\${error.message}\\\`);
                paymentBtn.disabled = false;
                paymentBtn.textContent = 'Place Order & Pay';
            }
        });

        document.addEventListener('DOMContentLoaded', renderOrderSummary);
    })();<\/script> `])), maybeRenderHead(), customers.map((customer) => renderTemplate`<option${addAttribute(JSON.stringify(customer), "value")}>${customer.name} - ${customer.email}</option>`), addAttribute(resellerId, "value"), renderScript($$result2, "/home/user/new2025/src/pages/checkout.astro?astro&type=script&index=0&lang.ts"), defineScriptVars({ resellerId, customers })) })}`;
}, "/home/user/new2025/src/pages/checkout.astro", void 0);

const $$file = "/home/user/new2025/src/pages/checkout.astro";
const $$url = "/checkout";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Checkout,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
