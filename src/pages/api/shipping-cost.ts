import type { APIRoute } from 'astro';
import { DelhiveryClient } from '../../lib/delhivery';

// IMPORTANT: In a real application, use an environment variable for the API key.
const DELHI_API_KEY = 'your_delhivery_api_key_placeholder'; 
const delhivery = new DelhiveryClient(DELHI_API_KEY, 'staging');

export const POST: APIRoute = async ({ request }) => {
  try {
    const { pincode, weight } = await request.json();

    if (!pincode || !weight) {
      return new Response(JSON.stringify({ message: 'Pincode and weight are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Simulate the API call to get the shipping cost
    const data = await delhivery.getShippingCost(pincode, weight);

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    let errorMessage = 'An unknown error occurred while calculating shipping cost.';
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
