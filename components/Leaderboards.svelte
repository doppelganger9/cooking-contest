<script>
  // TODO: REFACTOR: wrong way to present the architecture: should show what (business) before the technology involved to do it (how = firebase firestore)
  import { evaluationForMeal } from '../backend/firebase/firestore/evaluations.js';
  export let meals;

  const orderedMealsPromise = new Promise((resolve, reject) => {
    Promise.all(meals.map(meal => evaluationForMeal(meal['meal-id']) )).then((globalRatings) => {
      const mealsWithGlobalRatings = globalRatings.map((globalRating, i) => ({...meals[i], globalRating}));
      const orderedMeals = mealsWithGlobalRatings.sort((a,b) => (+b.globalRating) - (+a.globalRating));
      resolve(orderedMeals);
    }).catch(reject);
  });
</script>

<section>
  <h2>Tableau</h2>
  <ul>
  {#await orderedMealsPromise}
    <li>⏳</li>
  {:then orderedMeals}
    {#each orderedMeals as meal, i}
      <li>{i == 0 ? '🥇' : i == 1 ? '🥈' : i == 2 ? '🥉' : ''}{meal.title}&nbsp;<em>{meal.globalRating}</em></li>
    {/each}
  {:catch err}
    <li>⚠ {err}</li>
  {/await}
  </ul>
</section>