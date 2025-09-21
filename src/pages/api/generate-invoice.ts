import type { APIRoute } from 'astro';
import { db } from '../../lib/firebase/admin';
import { generateInvoice } from '../../lib/invoice';

export const POST: APIRoute = async ({ request }) => {
  try {
    const { orderId } = await request.json();

    if (!orderId) {
      return new Response('Order ID is required', { status: 400 });
    }

    // Fetch the order and related data
    const orderRef = db.collection('orders').doc(orderId);
    const orderDoc = await orderRef.get();

    if (!orderDoc.exists) {
      return new Response('Order not found', { status: 404 });
    }

    const orderData = orderDoc.data();

    const resellerRef = db.collection('users').doc(orderData.resellerId);
    const resellerDoc = await resellerRef.get();
    const resellerData = resellerDoc.data();

    // Generate the invoice and get the URL
    const invoiceUrl = await generateInvoice({ ...orderData, reseller: resellerData }, orderId);

    // Update the order with the invoice URL
    await orderRef.update({ invoiceUrl });

    return new Response(JSON.stringify({ message: 'Invoice generated successfully', invoiceUrl }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    let errorMessage = 'An unknown error occurred while generating the invoice.';
    if (error instanceof Error) {
        errorMessage = error.message;
    }
    console.error('Invoice Generation Error:', error);
    return new Response(JSON.stringify({ message: errorMessage }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
