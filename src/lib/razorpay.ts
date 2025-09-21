import Razorpay from 'razorpay';

export class RazorpayClient {
  private instance: any;

  constructor(keyId: string, keySecret: string) {
    this.instance = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });
  }

  async createOrder(amount: number, currency: string, receipt: string) {
    const options = {
      amount, // amount in the smallest currency unit
      currency,
      receipt,
    };

    try {
      // In a real app, this would make a real API call.
      // For now, we simulate success.
      console.log('Simulating Razorpay order creation with options:', options);
      
      // Mock response mimicking Razorpay's order_id
      const mockOrderId = `order_${Math.random().toString(36).substring(2, 15)}`;
      
      return {
        id: mockOrderId,
        ...options
      };

    } catch (error) {
      console.error("Razorpay Error:", error);
      throw new Error('Failed to create Razorpay order.');
    }
  }
}
