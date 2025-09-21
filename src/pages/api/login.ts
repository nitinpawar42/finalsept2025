
import type { APIRoute } from 'astro';
import { auth as adminAuth } from '../../lib/firebase/admin';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth as clientAuth } from '../../lib/firebase/client';

export const POST: APIRoute = async ({ request, cookies }) => {
  const { email, password } = await request.json();

  try {
    const userCredential = await signInWithEmailAndPassword(clientAuth, email, password);
    const user = userCredential.user;

    const userRecord = await adminAuth.getUser(user.uid);
    
    const { role, approvalStatus } = userRecord.customClaims || {};

    if (role === 'reseller') {
      if (approvalStatus !== 'approved') {
        return new Response(JSON.stringify({ message: 'Reseller not approved' }), { status: 403 });
      }
    } else if (role !== 'admin') {
      return new Response(JSON.stringify({ message: 'User is not an admin or reseller' }), { status: 403 });
    }

    const idToken = await user.getIdToken();
    const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn: 60 * 60 * 24 * 5 * 1000 });

    cookies.set('session', sessionCookie, { path: '/' });

    return new Response(JSON.stringify({ message: 'Logged in successfully', role }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    let errorMessage = 'An unknown error occurred.';
    if (error instanceof Error) {
        errorMessage = error.message;
    }
    return new Response(JSON.stringify({ message: errorMessage }), {
      status: 401,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};
