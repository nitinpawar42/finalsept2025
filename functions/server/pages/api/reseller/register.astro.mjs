import { d as db } from '../../../chunks/admin_HtBQTWCE.mjs';
export { renderers } from '../../../renderers.mjs';

const POST = async ({ request }) => {
  try {
    const formData = await request.formData();
    const fullName = formData.get("fullName");
    const email = formData.get("email");
    if (!fullName || !email) {
      return new Response(
        JSON.stringify({ message: "Missing required fields" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    const resellerRef = await db.collection("resellers").add({
      fullName,
      email,
      status: "pending",
      // Set initial status to pending approval
      createdAt: /* @__PURE__ */ new Date()
    });
    console.log("New reseller created with ID:", resellerRef.id);
    return new Response(
      JSON.stringify({
        message: "Your profile has been created and is pending approval."
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" }
      }
    );
  } catch (error) {
    console.error("Error creating reseller:", error);
    return new Response(
      JSON.stringify({ message: "An error occurred while creating your profile." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
