
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { resellers, products } from '../data/mock.js';

const firebaseConfig = {
  "projectId": "recent2025-8c891",
  "appId": "1:815105434520:web:833e4efb0224c9289e81ed",
  "storageBucket": "recent2025-8c891.appspot.com",
  "apiKey": "AIzaSyABOmg9FZo711ujsPCb7XOupDM4wh-Av9o",
  "authDomain": "recent2025-8c891.firebaseapp.com",
  "messagingSenderId": "815105434520"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function seedDatabase() {
  try {
    console.log("Seeding resellers...");
    for (const reseller of resellers) {
      await addDoc(collection(db, "resellers"), reseller);
    }
    console.log("Resellers seeded successfully!");

    console.log("Seeding products...");
    for (const product of products) {
      await addDoc(collection(db, "products"), product);
    }
    console.log("Products seeded successfully!");

  } catch (error) {
    console.error("Error seeding database:", error);
  }
}

seedDatabase().then(() => {
  console.log("Database seeding complete.");
  process.exit(0);
});
