import { db } from '../core';

function emptyEvaluations(username, contest) {
  return contest.meals.map(meal => ({ author: username, 'contest-id': contest['contest-id'], contest, meal, 'meal-id': meal['meal-id'], rating: undefined, ratings: [3, 3, 3, 3, 3] }));
}

export async function loadFirebaseEvaluations(username, contest) {
  console.log('fetching evaluations data from Firebase', username, contest);
  return new Promise((resolve, reject) => {
    const evaluationsRef = db.collection('evaluations');
    evaluationsRef
      .where('author', '==', username)
      .where('contest-id', '==', contest['contest-id'])
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          console.log('No matching documents.');
          return resolve(emptyEvaluations(username, contest));
        }

        const dataByMealId = {};
        snapshot.docs.map(doc => {
          console.log(doc.id, '=>', doc.data());
          const aData = doc.data();
          aData.meal = contest.meals.find(m => m['meal-id'] === aData['meal-id']);
          aData.contest = contest;
          aData.id = doc.id;
          dataByMealId[aData['meal-id']] = aData;
          return aData;
        });
        const evaluations = emptyEvaluations(username, contest)
          .map(evaluation => dataByMealId[evaluation['meal-id']] ? dataByMealId[evaluation['meal-id']] : evaluation);
        return resolve(evaluations);
      })
      .catch(err => {
        console.error('Error getting documents', err);
        return reject(err);
      });
  });
}

async function updateEvaluation(username, evaluation) {
  const evaluationsRef = db.collection('evaluations');
  try {
    const snapshot = await evaluationsRef
      .doc(evaluation.id)
      .get();

    if (!snapshot.exists) {
      console.log('No matching documents. Will create new one');
      return await saveNewEvaluation(username, evaluation);
    } else {
      // Merge with existing doc
      return await evaluationsRef.doc(evaluation.id).update({
        rating: evaluation.rating,
        ratings: [...evaluation.ratings],
        // updated: admin.firestore.Timestamp.fromDate(new Date());
      });
    }
  } catch(err) {
    console.error('Error updating document', err);
    throw err;
  }
}

async function saveNewEvaluation(username, evaluation) {
  const evaluationsRef = db.collection('evaluations');

  try {
    console.log('No matching documents. Will create new one');

    const newDocument = {
      'author': evaluation['author'] || username,
      'contest': (await db.collection('contests').where('contest-id', '==', evaluation['contest-id']).get()).docs[0].ref,
      'contest-id': evaluation['contest-id'],
      'meal': (await db.collection('meals').where('meal-id', '==', evaluation['meal-id']).get()).docs[0].ref,
      'meal-id': evaluation['meal-id'],
      'rating': evaluation.rating,
      'ratings': [...evaluation.ratings],
      //'created': { seconds: new Date().getTime() / 1000, nanoseconds: 0 },
    };

    return await evaluationsRef.add(newDocument);
  } catch (err) {
    console.error('Error saving document', err);
    throw err;
  }
}

export async function saveEvaluationInFirebase(username, evaluation) {
  console.log('sending updated/new evaluation data to Firebase', username, evaluation);
  return new Promise((resolve, reject) => {
    if (evaluation.id) {
      return updateEvaluation(username, evaluation).then(resolve).catch(reject);
    } else {
      return saveNewEvaluation(username, evaluation).then(resolve).catch(reject);
    }
  });
}

// TODO : replace with firebase functions trigger to do it serverless-side instead of front-side.
export async function evaluationForMeal(mealId) {
  const snapshot = await db.collection('evaluations').where('meal-id', '==', mealId).get();
  if (snapshot.empty) {
    // no evaluations for this meal yet
    return '?';
  }
  let sum = 0;
  const count = snapshot.docs.length;
  snapshot.forEach(doc => {
    const data = doc.data();
    sum += data.rating;
  });
  return (sum / count).toFixed(2);
}