
import PDFDocument from 'pdfkit';
import nodemailer from 'nodemailer';
import { getStorage, ref, uploadBytes } from "firebase/storage";
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

const storage = getStorage();

export async function post({ request }) {
  const { orderId, customerEmail, customerName, productName, amount, shippingCost } = await request.json();

  // Create a document
  const doc = new PDFDocument();

  // Add content to the PDF
  doc.fontSize(25).text('Invoice', { align: 'center' });
  doc.moveDown();
  doc.fontSize(16).text(`Order ID: ${orderId}`);
  doc.text(`Customer: ${customerName}`);
  doc.text(`Email: ${customerEmail}`);
  doc.moveDown();
  doc.text(`Product: ${productName}`);
  doc.text(`Amount: ₹${amount}`);
  doc.text(`Shipping Cost: ₹${shippingCost}`);
  doc.moveDown();
  doc.fontSize(20).text(`Total: ₹${amount + shippingCost}`);

  // Get the PDF as a buffer
  const pdfBuffer = await new Promise(resolve => {
    const buffers = [];
    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => {
      const pdfData = Buffer.concat(buffers);
      resolve(pdfData);
    });
    doc.end();
  });


  // Upload to Firebase Storage
  const storageRef = ref(storage, `invoices/${orderId}.pdf`);
  await uploadBytes(storageRef, pdfBuffer);

  // Send email
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'maddison53@ethereal.email',
        pass: 'jn7jnAPss4f63QBp6D'
    }
  });

  const mailOptions = {
    from: 'your-email@example.com',
    to: customerEmail,
    subject: `Invoice for your order ${orderId}`,
    text: 'Please find your invoice attached.',
    attachments: [
      {
        filename: `${orderId}.pdf`,
        content: pdfBuffer,
        contentType: 'application/pdf',
      },
    ],
  };

  try {
    await transporter.sendMail(mailOptions);
    return new Response(JSON.stringify({ success: true }), {
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
