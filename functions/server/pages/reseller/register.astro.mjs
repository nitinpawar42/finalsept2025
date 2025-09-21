/* empty css                                           */
import { e as createComponent, n as renderHead, l as renderScript, r as renderTemplate } from '../../chunks/astro/server_BeWHlNiw.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                                       */
export { renderers } from '../../renderers.mjs';

const $$Register = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`<html lang="en" data-astro-cid-plh7gsbs> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Reseller Registration</title><link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">${renderHead()}</head> <body data-astro-cid-plh7gsbs> <div class="form-container" data-astro-cid-plh7gsbs> <h2 class="form-title" data-astro-cid-plh7gsbs>Reseller Registration</h2> <form id="reseller-form" class="space-y-6" data-astro-cid-plh7gsbs> <div data-astro-cid-plh7gsbs> <label class="form-label" for="fullName" data-astro-cid-plh7gsbs>Full Name</label> <input class="form-input" type="text" name="fullName" id="fullName" placeholder="Enter your full name" required data-astro-cid-plh7gsbs> </div> <div data-astro-cid-plh7gsbs> <label class="form-label" for="email" data-astro-cid-plh7gsbs>Email</label> <input class="form-input" type="email" name="email" id="email" placeholder="Enter your email address" required data-astro-cid-plh7gsbs> </div> <div data-astro-cid-plh7gsbs> <label class="form-label" for="mobile" data-astro-cid-plh7gsbs>Mobile Number</label> <input class="form-input" type="text" name="mobile" id="mobile" placeholder="Enter your mobile number" required data-astro-cid-plh7gsbs> </div> <div data-astro-cid-plh7gsbs> <label class="form-label" for="address" data-astro-cid-plh7gsbs>Address</label> <textarea class="form-textarea" name="address" id="address" placeholder="Enter your full address with zip code" required data-astro-cid-plh7gsbs></textarea> </div> <div data-astro-cid-plh7gsbs> <label class="form-label" for="profilePhoto" data-astro-cid-plh7gsbs>Profile Photo</label> <input class="form-input" type="file" name="profilePhoto" id="profilePhoto" required accept="image/*" data-astro-cid-plh7gsbs> </div> <div data-astro-cid-plh7gsbs> <label class="form-label" for="aadharCard" data-astro-cid-plh7gsbs>Aadhar Card</label> <input class="form-input" type="file" name="aadharCard" id="aadharCard" required accept="image/*,.pdf" data-astro-cid-plh7gsbs> </div> <div data-astro-cid-plh7gsbs> <label class="form-label" for="panCard" data-astro-cid-plh7gsbs>PAN Card</label> <input class="form-input" type="file" name="panCard" id="panCard" required accept="image/*,.pdf" data-astro-cid-plh7gsbs> </div> <div class="flex items-center" data-astro-cid-plh7gsbs> <input class="form-checkbox" type="checkbox" name="agree" id="agree" required data-astro-cid-plh7gsbs> <label class="ml-2 form-checkbox-label" for="agree" data-astro-cid-plh7gsbs>I agree to the terms & conditions</label> </div> <button class="submit-button" type="submit" data-astro-cid-plh7gsbs>Submit</button> </form> <div id="message" class="message" style="display: none;" data-astro-cid-plh7gsbs></div> </div> ${renderScript($$result, "/home/user/new2025/src/pages/reseller/register.astro?astro&type=script&index=0&lang.ts")} </body> </html>`;
}, "/home/user/new2025/src/pages/reseller/register.astro", void 0);

const $$file = "/home/user/new2025/src/pages/reseller/register.astro";
const $$url = "/reseller/register";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Register,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
