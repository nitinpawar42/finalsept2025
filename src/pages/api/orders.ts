import type { APIRoute } from 'astro';
import { db } from '../../lib/firebase/admin';
import { RazorpayClient } from '../../lib/razorpay';

// IMPORTANT: Use environment variables in a real application.
const RAZORPAY_KEY_ID = 'your_razorpay_key_id_placeholder';
const RAZORPAY_KEY_SECRET = 'your_razorpay_key_secret_placeholder';

const razorpay = new RazorpayClient(RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET);

export const POST: APIRoute = async ({ request }) => {
  try {
    const {
        cart, 
        resellerId,
        shippingCost,
        customerDetails 
    } = await request.json();

    if (!cart || !resellerId || !customerDetails) {
      return new Response(JSON.stringify({ message: 'Missing required order data' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const totalAmount = subtotal + shippingCost;
    const totalAmountInPaise = Math.round(totalAmount * 100); // Razorpay requires amount in smallest currency unit

    // 1. Create Order in Firestore
    const orderRef = await db.collection('orders').add({
        resellerId,
        customerDetails,
        items: cart,
        subtotal,
        shippingCost,
        totalAmount,
        status: 'pending_payment',
        createdAt: new Date(),
    });
    const orderId = orderRef.id;

    // 2. Create Razorpay Order
    const razorpayOrder = await razorpay.createOrder(
        totalAmountInPaise,
        'INR',
        orderId
    );

    // 3. Send back the necessary details to the client
    return new Response(JSON.stringify({
        id: razorpayOrder.id, // This is the Razorpay order_id
        receipt: orderId, // This is our internal Firestore document ID
        amount: razorpayOrder.amount,
        razorpayKey: RAZORPAY_KEY_ID, 
    }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    let errorMessage = 'An unknown error occurred while creating the order.';
    if (error instanceof Error) {
        errorMessage = error.message;
    }
    console.error(error);
    return new Response(JSON.stringify({ message: errorMessage }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
    });
  }
};
