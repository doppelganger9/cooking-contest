<script>
  // TODO: REFACTOR: wrong way to present the architecture: should show what (business) before the technology involved to do it (how = firebase firestore)
  import { evaluationForMeal } from '../backend/firebase/firestore/evaluations.js';

  import NiceLeaderboards from './NiceLeaderboards.svelte';

  export let meals;

  const orderedMealsPromise = new Promise((resolve, reject) => {
    Promise.all(meals.map(meal => evaluationForMeal(meal['meal-id']) )).then((globalRatings) => {
      const mealsWithGlobalRatings = globalRatings.map((globalRating, i) => ({...meals[i], globalRating}));
      const orderedMeals = mealsWithGlobalRatings.sort((a,b) => (+b.globalRating) - (+a.globalRating));
      resolve(orderedMeals);
    }).catch(reject);
  });
</script>

{#await orderedMealsPromise}
  <p>⏳</p>
{:then orderedMeals}
  <NiceLeaderboards leaders={orderedMeals} maxScore={5} />
{:catch err}
  <p>⚠ {err}</p>
{/await}
