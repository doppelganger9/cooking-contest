let admin = require('firebase-admin');
require('dotenv').config();

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: `${process.env.FIREBASE_PROJECT_ID}.firebaseapp.com`,
  databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`,
  projectId: `${process.env.FIREBASE_PROJECT_ID}`,
  storageBucket: `${process.env.FIREBASE_PROJECT_ID}.appspot.com`,
  messagingSenderId: `${process.env.FIREBASE_SENDER_ID}`,
  appId: `${process.env.FIREBASE_APP_ID}`
};

admin.initializeApp({...firebaseConfig,
  credential: admin.credential.applicationDefault(),
});

const db = admin.firestore();

async function loadContestFromFirebase() {
  return new Promise((resolve, reject) => {
    const contestsRef = db.collection('contests');
    contestsRef/*TODO: only current one where('author', '==', username)*/.get()
      .then(snapshot => {
        if (snapshot.empty) {
          console.log('No contests found in Firebase Cloud Firestore.');
          return resolve({});
        }

        const data = snapshot.docs[0].data();
        Promise.all(data.meals.map(async m => {
          const got = await m.get();
          return got.exists ? got.data() : null;
        })).then((meals) => {
          data.meals = meals;
          return resolve(data);
        }).catch(err => reject(err));
      })
      .catch(err => {
        console.error('Error getting documents', err);
        return reject(err);
      });
  });
}

(async () => console.log(await loadContestFromFirebase()))();