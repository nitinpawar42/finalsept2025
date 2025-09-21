import type { APIRoute } from 'astro';
import { db } from '../../lib/firebase/admin';
import { getAuth } from "firebase-admin/auth";

const auth = getAuth();

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    const sessionCookie = cookies.get("session").value;
    const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);
    const resellerId = decodedClaims.uid;

    const formData = await request.formData();
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const address = formData.get('address') as string;

    const customerRef = await db.collection('customers').add({
      name,
      email,
      phone,
      address,
      resellerId,
      createdAt: new Date(),
    });

    return new Response(JSON.stringify({ id: customerRef.id }), {
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

export const DELETE: APIRoute = async ({ url, cookies }) => {
  const id = url.searchParams.get('id');

  if (!id) {
    return new Response(JSON.stringify({ message: 'Customer ID is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const sessionCookie = cookies.get("session").value;
    const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);
    const resellerId = decodedClaims.uid;

    const customerRef = db.collection('customers').doc(id);
    const customerDoc = await customerRef.get();

    if (!customerDoc.exists) {
      return new Response(JSON.stringify({ message: 'Customer not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (customerDoc.data().resellerId !== resellerId) {
      return new Response(JSON.stringify({ message: 'Unauthorized' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    await customerRef.delete();

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
