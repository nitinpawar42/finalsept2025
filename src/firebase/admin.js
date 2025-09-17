
import admin from "firebase-admin";

const serviceAccount = process.env.GOOGLE_APPLICATION_CREDENTIALS ? JSON.parse(Buffer.from(process.env.GOOGLE_APPLICATION_CREDENTIALS, 'base64').toString('ascii')) : {};

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: `https://recent2025-8c891.firebaseio.com`
  });
}

export const db = admin.firestore();
export const auth = admin.auth();
