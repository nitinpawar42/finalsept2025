
import { getFirestore, doc, deleteDoc } from 'firebase/firestore';
import { getApps, initializeApp } from 'firebase/app';

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

export async function post({ request }) {
  const { cartItemId } = await request.json();

  await deleteDoc(doc(db, "cart", cartItemId));

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
