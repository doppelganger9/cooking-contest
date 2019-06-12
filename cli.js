let admin = require('firebase-admin');
require('dotenv').config();

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: `${process.env.FIREBASE_PROJECT_ID}.firebaseapp.com`,
  databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`,
  projectId: `${process.env.FIREBASE_PROJECT_ID}`,
  storageBucket: `${process.env.FIREBASE_PROJECT_ID}.appspot.com`,
  messagingSenderId: `${process.env.FIREBASE_MESSAGING_SENDER_ID}`,
  appId: `${process.env.FIREBASE_APP_ID}`
};

// You need to add a service account key for firebase-adminsdk in your project on Google Cloud Console
// https://console.cloud.google.com/apis/credentials
// then save it as JSON file
// then in your env: GOOGLE_APPLICATION_CREDENTIALS=full/path/to/this-file.json
// export GOOGLE_APPLICATION_CREDENTIALS="/home/user/Downloads/service-account-file.json"

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

// run this once when you create your Firebase Project. I had to do it a second time as I commited my apikeys...
async function initDB() {
  let data = require('./initial-firestore-data.json');
  let mealsById = {};
  let contestsById = {};
  let evaluationsById = {};

  let foundMeals = [], foundMealsById = {};

  console.log('will add meals...');
  const snapshotMeals = await db.collection('meals').get();
  if (!snapshotMeals.empty) {
    // there are already meals in the DB:
    foundMeals = snapshotMeals.docs.map(doc => ({ ...doc.data(), ref:doc.ref }));
    foundMeals.map(meal => {
      foundMealsById[meal['meal-id']] = meal;
    });
  }
  for (let meal of data.meals) {
    if (foundMealsById[meal['meal-id']]) {
      console.log('meal already found in DB ' + meal['meal-id']);
      meal.ref = foundMealsById[meal['meal-id']].ref;
      mealsById[meal.id] = meal;
      continue;
    }
    let { id, ...mealWithoutId } = meal;
    try {
      let ref = await db.collection('meals').add(mealWithoutId);
      console.log(`Added meal to collection :${JSON.stringify(ref, null, 2)}\n`);
      meal.ref = ref;
      mealsById[id] = meal;
    } catch (err) {
      console.error('error trying to add meal to collection : ' + err);
      throw err;
    }
  }
  for (let contest of data.contests) {
    let { id, ...contestWithoutId } = contest;
    // transforming string IDs into Reference objects
    contestWithoutId.meals = contest.meals.map(meal => mealsById[meal].ref);
    contestWithoutId.date = admin.firestore.Timestamp.fromDate(new Date(contest.date));

    try {
      let ref = await db.collection('contests').add(contestWithoutId);
      console.log(`Added contest to collection :${JSON.stringify(ref, null, 2)}`);
      contest.ref = ref;
      contestsById[id] = contest;
    } catch (err) {
      console.error('error trying to add meal to collection : ' + err);
      throw err;
    }
  }
  for (let evaluation of data.evaluations) {
    let { id, ...evaluationWithoutId } = evaluation;
    // transforming string IDs into Reference objects
    evaluationWithoutId.meal = mealsById[evaluation.meal].ref;
    evaluationWithoutId.contest = contestsById[evaluation.contest].ref;
    try {
      let ref = await db.collection('evaluations').add(evaluationWithoutId);
      console.log(`Added evaluation to collection :${JSON.stringify(ref, null, 2)}`);
      evaluation.ref = ref;
      evaluationsById[id] = evaluation;
    } catch (err) {
      console.error('error trying to add meal to collection : ' + err);
      throw err;
    }
  }
}

initDB().then(() => console.log('init DB done')).catch((err) => console.error);

loadContestFromFirebase().then(text => console.log).catch(err => console.error)
