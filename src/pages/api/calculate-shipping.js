
import axios from 'axios';

export async function post({ request }) {
  const { weight, length, breadth, height, destinationPincode } = await request.json();

  const delhiveryToken = 'YOUR_DELHIVERY_TOKEN'; // Replace with your actual Delhivery token

  try {
    const response = await axios.get('https://track.delhivery.com/api/kinko/v1/invoice/charges/.json', {
      params: {
        md: 'E',
        ss: 'DTO',
        d_pin: destinationPincode,
        o_pin: '110043', // Origin pincode, replace with your actual origin pincode
        cgm: weight * 1000, // Weight in grams
        cl: length,
        cb: breadth,
        ch: height,
        pt: 'Pre-paid',
      },
      headers: {
        'Authorization': `Token ${delhiveryToken}`,
        'Content-Type': 'application/json',
      },
    });

    const shippingCost = response.data[0].total_amount;

    return new Response(JSON.stringify({ shippingCost }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
