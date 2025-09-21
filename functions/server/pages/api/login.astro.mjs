import { getAuth as getAuth$1 } from 'firebase-admin/auth';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
export { renderers } from '../../renderers.mjs';

const firebaseConfig = {
  apiKey: "AIzaSyABOmg9FZo711ujsPCb7XOupDM4wh-Av9o",
  authDomain: "recent2025-8c891.firebaseapp.com",
  projectId: "recent2025-8c891",
  storageBucket: "recent2025-8c891.firebasestorage.app",
  messagingSenderId: "815105434520",
  appId: "1:815105434520:web:833e4efb0224c9289e81ed",
  measurementId: "G-3217QYLK2P"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
getFirestore(app);

const POST = async ({ request, cookies }) => {
  const { email, password } = await request.json();
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const adminAuth = getAuth$1();
    const userRecord = await adminAuth.getUser(user.uid);
    const { role, approvalStatus } = userRecord.customClaims || {};
    if (role === "reseller") {
      if (approvalStatus !== "approved") {
        return new Response(JSON.stringify({ message: "Reseller not approved" }), { status: 403 });
      }
    } else if (role !== "admin") {
      return new Response(JSON.stringify({ message: "User is not an admin or reseller" }), { status: 403 });
    }
    const idToken = await user.getIdToken();
    const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn: 60 * 60 * 24 * 5 * 1e3 });
    cookies.set("session", sessionCookie, { path: "/" });
    return new Response(JSON.stringify({ message: "Logged in successfully", role }), {
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
