import type { APIRoute } from 'astro';
import { db } from '../../../firebase/admin';
import { getAuth } from "firebase-admin/auth";

const auth = getAuth();

export const PUT: APIRoute = async ({ request, params, cookies }) => {
  const { id } = params;

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

    const formData = await request.formData();
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const address = formData.get('address') as string;

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

    await customerRef.update({
      name,
      email,
      phone,
      address,
    });

    return new Response(JSON.stringify({ message: 'Customer updated successfully' }), {
      status: 200,
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
