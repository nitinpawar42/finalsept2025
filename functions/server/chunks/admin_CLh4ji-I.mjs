import admin from 'firebase-admin';

if (!admin.apps.length) {
  if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    const serviceAccount = JSON.parse(Buffer.from(process.env.GOOGLE_APPLICATION_CREDENTIALS, 'base64').toString('ascii'));
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: `https://recent2025-8c891.firebaseio.com`
    });
  } else {
    // Initialize without credentials for local development or build purposes
    admin.initializeApp({
        projectId: 'recent2025-8c891',
    });
  }
}

const db = admin.firestore();
const auth = admin.auth();
const storage = admin.storage();

export { auth as a, db as d, storage as s };
