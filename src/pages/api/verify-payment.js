
import { getFirestore, doc, updateDoc, getDoc } from 'firebase/firestore';
import { getApps, initializeApp } from 'firebase/app';
import crypto from 'crypto';

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
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature, orderId } = await request.json();

  const key_secret = '9oj6tXVIXCn8VGfWtxljyHs3';

  const hmac = crypto.createHmac('sha256', key_secret);
  hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
  const generated_signature = hmac.digest('hex');

  if (generated_signature === razorpay_signature) {
    const orderRef = doc(db, "orders", orderId);
    await updateDoc(orderRef, {
        paymentId: razorpay_payment_id,
        razorpayOrderId: razorpay_order_id,
        paymentStatus: 'completed',
    });

    const orderSnap = await getDoc(orderRef);
    const order = orderSnap.data();

    const customerRef = doc(db, "customers", order.customerId);
    const customerSnap = await getDoc(customerRef);
    const customer = customerSnap.data();

    // Call generate-invoice API
    await fetch('http://localhost:4321/api/generate-invoice', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        orderId: orderId,
        customerEmail: customer.email, 
        customerName: customer.name, 
        items: order.items,
        amount: order.totalAmount,
        shippingCost: order.shippingCost
      })
    });


    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } else {
    return new Response(JSON.stringify({ success: false }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
