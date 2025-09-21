import { d as db } from '../../../chunks/admin_HtBQTWCE.mjs';
import { getAuth } from 'firebase-admin/auth';
export { renderers } from '../../../renderers.mjs';

const auth = getAuth();
const PUT = async ({ request, params, cookies }) => {
  const { id } = params;
  if (!id) {
    return new Response(JSON.stringify({ message: "Customer ID is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }
  try {
    const sessionCookie = cookies.get("session").value;
    const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);
    const resellerId = decodedClaims.uid;
    const formData = await request.formData();
    const name = formData.get("name");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const address = formData.get("address");
    const customerRef = db.collection("customers").doc(id);
    const customerDoc = await customerRef.get();
    if (!customerDoc.exists) {
      return new Response(JSON.stringify({ message: "Customer not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" }
      });
    }
    if (customerDoc.data().resellerId !== resellerId) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), {
        status: 403,
        headers: { "Content-Type": "application/json" }
      });
    }
    await customerRef.update({
      name,
      email,
      phone,
      address
    });
    return new Response(JSON.stringify({ message: "Customer updated successfully" }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    let errorMessage = "An unknown error occurred.";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return new Response(JSON.stringify({ message: errorMessage }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  PUT
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
