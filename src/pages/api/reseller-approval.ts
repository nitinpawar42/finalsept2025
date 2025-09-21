import type { APIRoute } from 'astro';
import { getAuth } from 'firebase-admin/auth';
import { db } from '../../lib/firebase/admin';

export const POST: APIRoute = async ({ request }) => {
  const { uid, action, reason } = await request.json();

  if (!uid || !action) {
    return new Response(JSON.stringify({ message: 'Missing uid or action' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const auth = getAuth();
    const newStatus = action === 'approve' ? 'approved' : 'rejected';

    // Update custom claims in Firebase Auth
    await auth.setCustomUserClaims(uid, { role: 'reseller', approvalStatus: newStatus });

    // Update the user document in Firestore
    const userRef = db.collection('users').doc(uid);
    const updateData: { approvalStatus: string; rejectionReason?: string } = {
      approvalStatus: newStatus,
    };

    if (action === 'reject' && reason) {
      updateData.rejectionReason = reason;
    }

    await userRef.update(updateData);

    // TODO: In a real application, you would also send an email to the reseller here.

    return new Response(JSON.stringify({ message: `Reseller ${newStatus} successfully` }), {
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

export const GET: APIRoute = async () => {
  try {
    const usersSnapshot = await db.collection('users').where('approvalStatus', '==', 'pending').get();
    const pendingResellers = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    return new Response(JSON.stringify(pendingResellers), {
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
