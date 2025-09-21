export { renderers } from '../../renderers.mjs';

class DelhiveryClient {
  apiKey;
  baseUrl;
  constructor(apiKey, mode = "staging") {
    this.apiKey = apiKey;
    this.baseUrl = mode === "production" ? "https://track.delhivery.com/api" : "https://staging-express.delhivery.com/api";
  }
  async getShippingCost(pincode, weight) {
    console.log(`Simulating shipping cost calculation for pincode: ${pincode}, weight: ${weight}kg`);
    const mockCost = Math.floor(Math.random() * 151) + 50;
    return { cost: mockCost };
  }
}

const DELHI_API_KEY = "your_delhivery_api_key_placeholder";
const delhivery = new DelhiveryClient(DELHI_API_KEY, "staging");
const POST = async ({ request }) => {
  try {
    const { pincode, weight } = await request.json();
    if (!pincode || !weight) {
      return new Response(JSON.stringify({ message: "Pincode and weight are required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const data = await delhivery.getShippingCost(pincode, weight);
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    let errorMessage = "An unknown error occurred while calculating shipping cost.";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    console.error(error);
    return new Response(JSON.stringify({ message: errorMessage }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
