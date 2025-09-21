import type { APIRoute } from 'astro';
import { db, storage } from '../../lib/firebase/admin';
import { Buffer } from 'buffer';

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const price = parseFloat(formData.get('price') as string);
    const weight = parseFloat(formData.get('weight') as string);
    const length = parseFloat(formData.get('length') as string);
    const breadth = parseFloat(formData.get('breadth') as string);
    const height = parseFloat(formData.get('height') as string);
    const description = formData.get('description') as string;
    const imageFile = formData.get('image') as File;

    // Upload image to Firebase Storage
    const bucket = storage.bucket();
    const imageBuffer = Buffer.from(await imageFile.arrayBuffer());
    const fileName = `products/${Date.now()}-${imageFile.name}`;
    const file = bucket.file(fileName);

    await file.save(imageBuffer, {
      metadata: { contentType: imageFile.type },
    });
    
    const [imageUrl] = await file.getSignedUrl({ action: 'read', expires: '03-09-2491' });

    // Save product to Firestore
    const productRef = await db.collection('products').add({
      name,
      price,
      weight,
      dimensions: { length, breadth, height },
      description,
      imageUrl,
      imagePath: fileName, // Store the path for future deletion
      createdAt: new Date(),
    });

    return new Response(JSON.stringify({ id: productRef.id }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    let errorMessage = 'An unknown error occurred.';
    if (error instanceof Error) {
        errorMessage = error.message;
    }
    return new Response(JSON.stringify({ message: errorMessage }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

export const DELETE: APIRoute = async ({ url }) => {
  const id = url.searchParams.get('id');

  if (!id) {
    return new Response(JSON.stringify({ message: 'Product ID is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const productRef = db.collection('products').doc(id);
    const productDoc = await productRef.get();

    if (!productDoc.exists) {
      return new Response(JSON.stringify({ message: 'Product not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
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
    let errorMessage = 'An unknown error occurred.';
    if (error instanceof Error) {
        errorMessage = error.message;
    }
    return new Response(JSON.stringify({ message: errorMessage }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
