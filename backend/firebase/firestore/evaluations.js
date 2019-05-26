import { db } from '../core';

export async function loadFirebaseEvaluations(username, contest) {
  console.log('fetching evaluations data from Firebase', username, contest);
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
          aData.id = doc.id;
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

export async function saveEvaluationInFirebase(username, evaluation) {
  console.log('sending updated/new evaluation data to Firebase', username, evaluation);
  return new Promise((resolve, reject) => {
    const evaluationsRef = db.collection('evaluations');
    evaluationsRef
      .doc(evaluation.id)
      .get()
      .then(snapshot => {
        if (!snapshot.exists) {
          reject('Not yet implemented');
        } else {
          // Merge with existing doc
          const data = snapshot.data();

          return db.collection('evaluations').doc(evaluation.id).update({
            rating: evaluation.rating,
            ratings: [...evaluation.ratings]
            // updated: admin.firestore.Timestamp.fromDate(new Date());
          }).then(() => {
            return resolve();
          }).catch(err => {
            return reject(err);
          });
        }
      })
      .catch(err => {
        console.error('Error getting documents', err);
        return reject(err);
      });
  });
}