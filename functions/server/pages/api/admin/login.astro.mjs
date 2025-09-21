import { getAuth } from 'firebase-admin/auth';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { a as auth } from '../../../chunks/client_DsVVQFFS.mjs';
export { renderers } from '../../../renderers.mjs';

const POST = async ({ request, cookies }) => {
  const { email, password } = await request.json();
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const adminAuth = getAuth();
    const userRecord = await adminAuth.getUser(user.uid);
    const { role } = userRecord.customClaims || {};
    if (role !== "admin") {
      return new Response(JSON.stringify({ message: "User is not an admin" }), { status: 403 });
    }
    const idToken = await user.getIdToken();
    const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn: 60 * 60 * 24 * 5 * 1e3 });
    cookies.set("session", sessionCookie, { path: "/" });
    return new Response(JSON.stringify({ message: "Logged in successfully" }), {
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
      status: 401,
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
