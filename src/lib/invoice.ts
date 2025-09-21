import PDFDocument from 'pdfkit';
import { storage } from '../firebase/admin'; // Assuming you have a storage export in your admin file
import { Writable } from 'stream';

// A custom stream to write to a buffer
class BufferStream extends Writable {
  private chunks: Buffer[] = [];

  _write(chunk: any, encoding: BufferEncoding, callback: (error?: Error | null) => void): void {
    this.chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk, encoding));
    callback();
  }

  toBuffer(): Buffer {
    return Buffer.concat(this.chunks);
  }
}

export async function generateInvoice(order: any, orderId: string): Promise<string> {
  const doc = new PDFDocument({ margin: 50, size: 'A4' });
  const stream = new BufferStream();
  doc.pipe(stream);

  // Header
  doc.fontSize(20).font('Helvetica-Bold').text('INVOICE', { align: 'center' });
  doc.moveDown();

  // Company & Customer Details
  doc.fontSize(10).font('Helvetica');
  doc.text('Sold by:', { continued: true });
  doc.font('Helvetica-Bold').text(order.reseller.businessName || 'Your Business Name');
  doc.font('Helvetica').text('Your Business Address');
  
  const customerX = 350;
  doc.text('Billed to:', customerX, doc.y - 36, { align: 'left' });
  doc.font('Helvetica-Bold').text(order.customerDetails.name, customerX, doc.y, { align: 'left' });
  doc.font('Helvetica').text(order.customerDetails.address, customerX, doc.y, { align: 'left' });
  doc.moveDown(2);

  // Order Meta
  doc.fontSize(10).font('Helvetica-Bold');
  doc.text(`Invoice #: ${orderId}`);
  doc.text(`Order Date: ${new Date(order.createdAt._seconds * 1000).toLocaleDateString()}`);
  doc.moveDown(2);

  // Table Header
  doc.font('Helvetica-Bold');
  const tableTop = doc.y;
  doc.text('Item', 50, tableTop);
  doc.text('Quantity', 250, tableTop, { width: 100, align: 'right' });
  doc.text('Unit Price', 350, tableTop, { width: 100, align: 'right' });
  doc.text('Total', 450, tableTop, { width: 100, align: 'right' });
  doc.rect(50, tableTop - 5, 510, 20).stroke();
  doc.moveDown();

  // Table Rows
  doc.font('Helvetica');
  for (const item of order.items) {
    const y = doc.y;
    doc.text(item.name, 50, y);
    doc.text(item.quantity.toString(), 250, y, { width: 100, align: 'right' });
    doc.text(`₹${item.price.toFixed(2)}`, 350, y, { width: 100, align: 'right' });
    doc.text(`₹${(item.price * item.quantity).toFixed(2)}`, 450, y, { width: 100, align: 'right' });
    doc.moveDown();
  }
  doc.rect(50, tableTop - 5, 510, doc.y - tableTop + 5).stroke();
  doc.moveDown();

  // Totals
  const totalX = 450;
  doc.font('Helvetica-Bold').text(`Subtotal:`, 350, doc.y, { align: 'left' });
  doc.text(`₹${order.subtotal.toFixed(2)}`, totalX, doc.y, { align: 'right' });
  doc.moveDown();
  doc.text(`Shipping:`, 350, doc.y, { align: 'left' });
  doc.text(`₹${order.shippingCost.toFixed(2)}`, totalX, doc.y, { align: 'right' });
  doc.moveDown();
  doc.fontSize(12).text(`Total:`, 350, doc.y, { align: 'left' });
  doc.text(`₹${order.totalAmount.toFixed(2)}`, totalX, doc.y, { align: 'right' });

  // Footer
  doc.fontSize(8).text('Thank you for your business!', 50, 750, { align: 'center', width: 500 });

  doc.end();

  // Upload to Firebase Storage
  await new Promise<void>((resolve, reject) => {
      stream.on('finish', async () => {
          const buffer = stream.toBuffer();
          const filePath = `invoices/${orderId}.pdf`;
          const file = storage.bucket().file(filePath);

          await file.save(buffer, {
              metadata: {
                  contentType: 'application/pdf',
              },
          });
          resolve();
      });
       stream.on('error', reject);
  });

  // Return the public URL
  const invoiceUrl = `https://storage.googleapis.com/${storage.bucket().name}/invoices/${orderId}.pdf`;
  return invoiceUrl;
}
