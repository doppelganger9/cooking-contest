import firebase from 'firebase/app';// rollup bundle issue with ESM import
import 'firebase/auth';
import 'firebase/firestore';

// Rollup Replace plugin will inject values.
const firebaseConfig = {
  apiKey: '<@FIREBASE_API_KEY@>',
  authDomain: '<@FIREBASE_PROJECT_ID@>.firebaseapp.com',
  databaseURL: 'https://<@FIREBASE_PROJECT_ID@>.firebaseio.com',
  projectId: '<@FIREBASE_PROJECT_ID@>',
  storageBucket: '<@FIREBASE_PROJECT_ID@>.appspot.com',
  messagingSenderId: '<@FIREBASE_MESSAGING_SENDER_ID@>',
  appId: '<@FIREBASE_APP_ID@>',
};

console.log(firebase);

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = firebase.firestore();


export async function loadFirebaseEvaluations(username, contest) {
  return new Promise((resolve, reject) => {
    const evaluationsRef = db.collection('evaluations');
    evaluationsRef
      .where('Auteur', '==', username)
      .where('contest-id', '==', contest['contest-id'])
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          console.log('No matching documents.');
          return resolve([]);
        }

        const data = snapshot.docs.map(doc => {
          console.log(doc.id, '=>', doc.data());
          const aData = doc.data();
          aData.meal = contest.meals.find(m => m['meal-id'] === aData['meal-id']);
          aData.contest = contest;
          return aData;
        });
        return resolve([...data]);
      })
      .catch(err => {
        console.error('Error getting documents', err);
        return reject(err);
      });
  });
}

export async function loadContestFromFirebase() {
  return new Promise((resolve, reject) => {
    const contestsRef = db.collection('contests');
    contestsRef/*TODO: only current one where('Auteur', '==', username)*/.get()
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