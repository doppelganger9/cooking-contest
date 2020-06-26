/**
 * This is a business logic function collection for Contests Domain.
 * There is no dependency to anything else in the app.
 * It is the App that depends on this file.
 * 
 */

export async function getCurrentContest(db) {
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