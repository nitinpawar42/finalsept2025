import { s as storage, d as db } from '../../chunks/admin_HtBQTWCE.mjs';
import { Buffer } from 'buffer';
export { renderers } from '../../renderers.mjs';

const POST = async ({ request }) => {
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
    const bucket = storage.bucket();
    const imageBuffer = Buffer.from(await imageFile.arrayBuffer());
    const fileName = `products/${Date.now()}-${imageFile.name}`;
    const file = bucket.file(fileName);
    await file.save(imageBuffer, {
      metadata: { contentType: imageFile.type }
    });
    const [imageUrl] = await file.getSignedUrl({ action: "read", expires: "03-09-2491" });
    const productRef = await db.collection("products").add({
      name,
      price,
      weight,
      dimensions: { length, breadth, height },
      description,
      imageUrl,
      imagePath: fileName,
      // Store the path for future deletion
      createdAt: /* @__PURE__ */ new Date()
    });
    return new Response(JSON.stringify({ id: productRef.id }), {
      status: 201,
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
const DELETE = async ({ url }) => {
  const id = url.searchParams.get("id");
  if (!id) {
    return new Response(JSON.stringify({ message: "Product ID is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }
  try {
    const productRef = db.collection("products").doc(id);
    const productDoc = await productRef.get();
    if (!productDoc.exists) {
      return new Response(JSON.stringify({ message: "Product not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" }
      });
    }
    const productData = productDoc.data();
    if (productData && productData.imagePath) {
      const bucket = storage.bucket();
      await bucket.file(productData.imagePath).delete();
    }
    await productRef.delete();
    return new Response(null, { status: 204 });
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
  DELETE,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
