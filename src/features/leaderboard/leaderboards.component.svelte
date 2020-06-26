<script>
  // TODO: REFACTOR: wrong way to present the architecture: should show what (business) before the technology involved to do it (how = firebase firestore)
  import { evaluationForMeal } from '../../business/evaluations.js';
  //import { db } from '../../backend/firebase/core.js';
  import { db } from '../../backend/mock/db.js';
  
  import NiceLeaderboardsComponent from './nice-leaderboards.component.svelte';

  export let meals;

  const orderedMealsPromise = new Promise((resolve, reject) => {
    Promise.all(meals.map(meal => evaluationForMeal(db, meal['meal-id']) )).then((globalRatings) => {
      const mealsWithGlobalRatings = globalRatings.map((globalRating, i) => ({...meals[i], globalRating}));
      const orderedMeals = mealsWithGlobalRatings.sort((a,b) => (+b.globalRating) - (+a.globalRating));
      resolve(orderedMeals);
    }).catch(reject);
  });
</script>

{#await orderedMealsPromise}
  <p>⏳</p>
{:then orderedMeals}
  <NiceLeaderboardsComponent leaders={orderedMeals} maxScore={5} />
{:catch err}
  <p>⚠ {err}</p>
{/await}
