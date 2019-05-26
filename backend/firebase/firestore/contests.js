import { db } from '../core';

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