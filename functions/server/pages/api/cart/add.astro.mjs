import { getFirestore, collection, query, where, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore';
import { getApps, initializeApp } from 'firebase/app';
export { renderers } from '../../../renderers.mjs';

const firebaseConfig = {
  apiKey: "AIzaSyABOmg9FZo711ujsPCb7XOupDM4wh-Av9o",
  authDomain: "recent2025-8c891.firebaseapp.com",
  projectId: "recent2025-8c891",
  storageBucket: "recent2025-8c891.firebasestorage.app",
  messagingSenderId: "815105434520",
  appId: "1:815105434520:web:833e4efb0224c9289e81ed"
};

if (!getApps().length) {
  initializeApp(firebaseConfig);
}

const db = getFirestore();

async function post({ request }) {
  const { productId, quantity, userId } = await request.json();

  const cartRef = collection(db, 'cart');

  const q = query(cartRef, where("userId", "==", userId), where("productId", "==", productId));

  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    await addDoc(cartRef, { userId, productId, quantity });
  } else {
    const cartDoc = querySnapshot.docs[0];
    const newQuantity = cartDoc.data().quantity + quantity;
    await updateDoc(doc(db, "cart", cartDoc.id), { quantity: newQuantity });
  }

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  post
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
