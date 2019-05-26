import { db } from '../core';

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
