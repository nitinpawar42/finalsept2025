import { s as storage, d as db } from '../../chunks/admin_HtBQTWCE.mjs';
import PDFDocument from 'pdfkit';
import { Writable } from 'stream';
export { renderers } from '../../renderers.mjs';

class BufferStream extends Writable {
  chunks = [];
  _write(chunk, encoding, callback) {
    this.chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk, encoding));
    callback();
  }
  toBuffer() {
    return Buffer.concat(this.chunks);
  }
}
async function generateInvoice(order, orderId) {
  const doc = new PDFDocument({ margin: 50, size: "A4" });
  const stream = new BufferStream();
  doc.pipe(stream);
  doc.fontSize(20).font("Helvetica-Bold").text("INVOICE", { align: "center" });
  doc.moveDown();
  doc.fontSize(10).font("Helvetica");
  doc.text("Sold by:", { continued: true });
  doc.font("Helvetica-Bold").text(order.reseller.businessName || "Your Business Name");
  doc.font("Helvetica").text("Your Business Address");
  const customerX = 350;
  doc.text("Billed to:", customerX, doc.y - 36, { align: "left" });
  doc.font("Helvetica-Bold").text(order.customerDetails.name, customerX, doc.y, { align: "left" });
  doc.font("Helvetica").text(order.customerDetails.address, customerX, doc.y, { align: "left" });
  doc.moveDown(2);
  doc.fontSize(10).font("Helvetica-Bold");
  doc.text(`Invoice #: ${orderId}`);
  doc.text(`Order Date: ${new Date(order.createdAt._seconds * 1e3).toLocaleDateString()}`);
  doc.moveDown(2);
  doc.font("Helvetica-Bold");
  const tableTop = doc.y;
  doc.text("Item", 50, tableTop);
  doc.text("Quantity", 250, tableTop, { width: 100, align: "right" });
  doc.text("Unit Price", 350, tableTop, { width: 100, align: "right" });
  doc.text("Total", 450, tableTop, { width: 100, align: "right" });
  doc.rect(50, tableTop - 5, 510, 20).stroke();
  doc.moveDown();
  doc.font("Helvetica");
  for (const item of order.items) {
    const y = doc.y;
    doc.text(item.name, 50, y);
    doc.text(item.quantity.toString(), 250, y, { width: 100, align: "right" });
    doc.text(`₹${item.price.toFixed(2)}`, 350, y, { width: 100, align: "right" });
    doc.text(`₹${(item.price * item.quantity).toFixed(2)}`, 450, y, { width: 100, align: "right" });
    doc.moveDown();
  }
  doc.rect(50, tableTop - 5, 510, doc.y - tableTop + 5).stroke();
  doc.moveDown();
  const totalX = 450;
  doc.font("Helvetica-Bold").text(`Subtotal:`, 350, doc.y, { align: "left" });
  doc.text(`₹${order.subtotal.toFixed(2)}`, totalX, doc.y, { align: "right" });
  doc.moveDown();
  doc.text(`Shipping:`, 350, doc.y, { align: "left" });
  doc.text(`₹${order.shippingCost.toFixed(2)}`, totalX, doc.y, { align: "right" });
  doc.moveDown();
  doc.fontSize(12).text(`Total:`, 350, doc.y, { align: "left" });
  doc.text(`₹${order.totalAmount.toFixed(2)}`, totalX, doc.y, { align: "right" });
  doc.fontSize(8).text("Thank you for your business!", 50, 750, { align: "center", width: 500 });
  doc.end();
  await new Promise((resolve, reject) => {
    stream.on("finish", async () => {
      const buffer = stream.toBuffer();
      const filePath = `invoices/${orderId}.pdf`;
      const file = storage.bucket().file(filePath);
      await file.save(buffer, {
        metadata: {
          contentType: "application/pdf"
        }
      });
      resolve();
    });
    stream.on("error", reject);
  });
  const invoiceUrl = `https://storage.googleapis.com/${storage.bucket().name}/invoices/${orderId}.pdf`;
  return invoiceUrl;
}

const POST = async ({ request }) => {
  try {
    const { orderId } = await request.json();
    if (!orderId) {
      return new Response("Order ID is required", { status: 400 });
    }
    const orderRef = db.collection("orders").doc(orderId);
    const orderDoc = await orderRef.get();
    if (!orderDoc.exists) {
      return new Response("Order not found", { status: 404 });
    }
    const orderData = orderDoc.data();
    const resellerRef = db.collection("users").doc(orderData.resellerId);
    const resellerDoc = await resellerRef.get();
    const resellerData = resellerDoc.data();
    const invoiceUrl = await generateInvoice({ ...orderData, reseller: resellerData }, orderId);
    await orderRef.update({ invoiceUrl });
    return new Response(JSON.stringify({ message: "Invoice generated successfully", invoiceUrl }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    let errorMessage = "An unknown error occurred while generating the invoice.";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    console.error("Invoice Generation Error:", error);
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
