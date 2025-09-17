
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
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
  const { userId, customerId, cartItems, shippingAddress, totalAmount, shippingCost } = await request.json();

  const orderRef = await addDoc(collection(db, "orders"), {
    userId,
    customerId,
    items: cartItems.map(item => ({ productId: item.productId, quantity: item.quantity, price: item.product.price })),
    shippingAddress,
    totalAmount,
    shippingCost,
    paymentStatus: 'pending',
    createdAt: serverTimestamp()
  });

  return new Response(JSON.stringify({ orderId: orderRef.id }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
