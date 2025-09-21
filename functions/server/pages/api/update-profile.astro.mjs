import { d as db } from '../../chunks/admin_HtBQTWCE.mjs';
import { getAuth } from 'firebase-admin/auth';
export { renderers } from '../../renderers.mjs';

const POST = async ({ request, cookies }) => {
  const sessionCookie = cookies.get("session").value;
  if (!sessionCookie) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }
  try {
    const auth = getAuth();
    const decodedCookie = await auth.verifySessionCookie(sessionCookie, true);
    const userId = decodedCookie.uid;
    const { name, bio, bannerImage } = await request.json();
    const resellerRef = db.collection("resellers").doc(userId);
    await resellerRef.update({
      name,
      bio,
      bannerImage
    });
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Error updating profile:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
