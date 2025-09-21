import { d as db, s as storage } from '../../../chunks/admin_HtBQTWCE.mjs';
import { Buffer } from 'buffer';
export { renderers } from '../../../renderers.mjs';

const PUT = async ({ request, params }) => {
  const { id } = params;
  if (!id) {
    return new Response(JSON.stringify({ message: "Product ID is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }
  try {
    const formData = await request.formData();
    const name = formData.get("name");
    const price = parseFloat(formData.get("price"));
    const weight = parseFloat(formData.get("weight"));
    const length = parseFloat(formData.get("length"));
    const breadth = parseFloat(formData.get("breadth"));
    const height = parseFloat(formData.get("height"));
    const description = formData.get("description");
    const imageFile = formData.get("image");
    const productRef = db.collection("products").doc(id);
    const productDoc = await productRef.get();
    if (!productDoc.exists) {
      return new Response(JSON.stringify({ message: "Product not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" }
      });
    }
    const productData = productDoc.data();
    let imageUrl = productData.imageUrl;
    let imagePath = productData.imagePath;
    if (imageFile && imageFile.size > 0) {
      if (imagePath) {
        await storage.bucket().file(imagePath).delete();
      }
      const bucket = storage.bucket();
      const imageBuffer = Buffer.from(await imageFile.arrayBuffer());
      const fileName = `products/${Date.now()}-${imageFile.name}`;
      const file = bucket.file(fileName);
      await file.save(imageBuffer, {
        metadata: { contentType: imageFile.type }
      });
      [imageUrl] = await file.getSignedUrl({ action: "read", expires: "03-09-2491" });
      imagePath = fileName;
    }
    await productRef.update({
      name,
      price,
      weight,
      dimensions: { length, breadth, height },
      description,
      imageUrl,
      imagePath
    });
    return new Response(JSON.stringify({ message: "Product updated successfully" }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    let errorMessage = "An unknown error occurred.";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return new Response(JSON.stringify({ message: errorMessage }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  PUT
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
