import type { APIRoute } from 'astro';
import { db } from '../../lib/firebase/admin';
import { DelhiveryClient } from '../../lib/delhivery';

const DELHI_API_KEY = 'your_delhivery_api_key_placeholder';
const delhivery = new DelhiveryClient(DELHI_API_KEY, 'staging');

export const POST: APIRoute = async ({ request }) => {
  try {
    const { orderId } = await request.json();

    if (!orderId) {
      return new Response('Order ID is required', { status: 400 });
    }

    // Fetch the order data
    const orderRef = db.collection('orders').doc(orderId);
    const orderDoc = await orderRef.get();

    if (!orderDoc.exists) {
      return new Response('Order not found', { status: 404 });
    }
    const orderData = orderDoc.data();

    // Simulate the shipment booking process
    console.log(`Simulating shipment booking for order: ${orderId}`);
    const mockTrackingId = `DEL-${Math.random().toString(36).substring(2, 12).toUpperCase()}`;
    
    // Update the order with the tracking information
    await orderRef.update({
      status: 'shipped',
      shippingDetails: {
        trackingId: mockTrackingId,
        provider: 'Delhivery',
        bookedAt: new Date(),
      }
    });

    return new Response(JSON.stringify({ 
        message: 'Shipment booked successfully', 
        trackingId: mockTrackingId 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    let errorMessage = 'An unknown error occurred while booking the shipment.';
    if (error instanceof Error) {
        errorMessage = error.message;
    }
    console.error('Shipment Booking Error:', error);
    return new Response(JSON.stringify({ message: errorMessage }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
