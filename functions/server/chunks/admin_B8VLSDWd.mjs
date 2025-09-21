import admin from 'firebase-admin';

if (!admin.apps.length) {
  if (process.env.FIREBASE_CONFIG) {
    const firebaseConfig = JSON.parse(process.env.FIREBASE_CONFIG);
    admin.initializeApp({
      credential: admin.credential.cert(firebaseConfig),
      projectId: firebaseConfig.projectId
    });
  } else {
    // For local development or build purposes where FIREBASE_CONFIG might not be set
    admin.initializeApp({
        projectId: 'recent2025-8c891',
    });
  }
}

const db = admin.firestore();
const auth = admin.auth();
const storage = admin.storage();

export { auth as a, db as d, storage as s };
