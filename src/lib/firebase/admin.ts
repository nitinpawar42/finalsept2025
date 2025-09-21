import 'dotenv/config';
import admin from 'firebase-admin';

// Get the service account key from the environment variable
const serviceAccountString = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

// Throw an error if the service account key is not set
if (!serviceAccountString) {
  throw new Error('The FIREBASE_SERVICE_ACCOUNT_KEY environment variable is not set. Please add it to your .env file.');
}

let serviceAccount;
try {
  // Parse the service account key string into a JSON object
  serviceAccount = JSON.parse(serviceAccountString);
} catch (error) {
  // Throw a more specific error if the JSON is malformed
  console.error("Failed to parse FIREBASE_SERVICE_ACCOUNT_KEY. Make sure it is a valid JSON string.");
  throw error; // Re-throw the original parsing error
}

// Initialize the Firebase Admin SDK only if it hasn't been initialized yet
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

// Export the initialized services
export const auth = admin.auth();
export const db = admin.firestore();
