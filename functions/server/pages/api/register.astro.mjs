import { getAuth } from 'firebase-admin/auth';
import { d as db } from '../../chunks/admin_CaGs-zYS.mjs';
export { renderers } from '../../renderers.mjs';

const POST = async ({ request, cookies }) => {
  const { email, password, fullName, pan, mobile, address, pincode } = await request.json();
  try {
    const auth = getAuth();
    const userRecord = await auth.createUser({
      email,
      password,
      displayName: fullName
    });
    await auth.setCustomUserClaims(userRecord.uid, { role: "reseller", approvalStatus: "pending" });
    await db.collection("users").doc(userRecord.uid).set({
      email,
      role: "reseller",
      approvalStatus: "pending",
      createdAt: /* @__PURE__ */ new Date(),
      resellerDetails: {
        fullName,
        pan,
        mobile,
        address,
        pincode
      }
    });
    const sessionCookie = await auth.createSessionCookie(userRecord.uid, { expiresIn: 60 * 60 * 24 * 5 * 1e3 });
    cookies.set("session", sessionCookie, { path: "/" });
    return new Response(JSON.stringify({ message: "Reseller registered and logged in successfully" }), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (error) {
    let errorMessage = "An unknown error occurred.";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return new Response(JSON.stringify({ message: errorMessage }), {
      status: 500,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
