
import type { APIRoute } from 'astro';
import { db } from '../../../lib/firebase/admin'; // Import the initialized db

export const POST: APIRoute = async ({ request }) => {
    try {
        const formData = await request.formData();
        const fullName = formData.get('fullName') as string;
        const email = formData.get('email') as string;

        if (!fullName || !email) {
            return new Response(
                JSON.stringify({ message: 'Missing required fields' }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        // Create a new reseller document in Firestore
        const resellerRef = await db.collection('resellers').add({
            fullName,
            email,
            status: 'pending', // Set initial status to pending approval
            createdAt: new Date(),
        });

        console.log('New reseller created with ID:', resellerRef.id);

        return new Response(
            JSON.stringify({
                message: 'Your profile has been created and is pending approval.',
            }),
            {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    } catch (error) {
        console.error('Error creating reseller:', error);
        return new Response(
            JSON.stringify({ message: 'An error occurred while creating your profile.' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
};
