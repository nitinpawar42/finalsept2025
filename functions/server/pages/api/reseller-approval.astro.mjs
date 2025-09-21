import { getAuth } from 'firebase-admin/auth';
import { d as db } from '../../chunks/admin_HtBQTWCE.mjs';
export { renderers } from '../../renderers.mjs';

const POST = async ({ request }) => {
  const { uid, action, reason } = await request.json();
  if (!uid || !action) {
    return new Response(JSON.stringify({ message: "Missing uid or action" }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }
  try {
    const auth = getAuth();
    const newStatus = action === "approve" ? "approved" : "rejected";
    await auth.setCustomUserClaims(uid, { role: "reseller", approvalStatus: newStatus });
    const userRef = db.collection("users").doc(uid);
    const updateData = {
      approvalStatus: newStatus
    };
    if (action === "reject" && reason) {
      updateData.rejectionReason = reason;
    }
    await userRef.update(updateData);
    return new Response(JSON.stringify({ message: `Reseller ${newStatus} successfully` }), {
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
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
