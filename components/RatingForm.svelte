<script>
  import { evaluating, evaluations, contest } from '../stores/evaluations';

  import { saveEvaluationInFirebase } from '../backend/firebase/firestore/evaluations.js';
  import { username } from '../stores/username.js';

  const DEFAULT_RATING = 3;
  $: currentEvaluationIndex = $evaluations.findIndex(item => item.meal['meal-id'] === $evaluating);
  $: currentEvaluation = $evaluations.find(item => item.meal['meal-id'] === $evaluating);

  function doneEvaluating() {
    evaluations.update( list => {
      list[currentEvaluationIndex].rating = +(list[currentEvaluationIndex].ratings.reduce((acc, it) => acc+(+(it/5).toFixed(2)), 0).toFixed(2));
      saveEvaluationInFirebase($username, list[currentEvaluationIndex]).then(() => {
        // ok
      }).catch(err => {
        // error
      });
      return list;
    });
    $evaluating = null;//same as evaluating.set(null);
  }
</script>

<style>
  label { width: 10em; display: inline-block; text-align: left; padding: 1em; font-size: 1em; line-height: 2em; font-weight: bolder;
    color: darkgreen;
    border-bottom: .25em solid green;
    margin: 1em;
  }
  input:focus {outline:0;}
  input { display: inline-block; text-align: center; padding: .5em; font-size: 1.5em; line-height: 1.5em;
    font-weight: bolder;
    border-radius: 50em;
    width: 3em;
    border: .25em solid darkgreen;
    background-color: white;
  }
  h2 {
    padding: 1em;
    color: darkgreen;
  }
  h2 em {
    font-weight: 100;
    font-style: normal;
  }
  button {
    background: darkgreen;
    color: #AAEE99;
    padding: 1em 4em;
    margin: 2em auto 0;
    border-radius: .5em;
    font-size: 1em;
    border: .25em solid darkgreen;
  }
  button:focus {outline:0;}
  button:hover {
    color: darkgreen;
    background: #AAEE99;
    border: .25em solid darkgreen;
  }
  button:active {
    color: green;
    background: white;
    border: .25em solid green;
  }
  img {
    max-width: 20em;
    max-height: 20em;
    padding: 1em;
  }
  section {
    padding: 1em 0;
    background-color: #ddffaa;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Cpolygon fill='%23AE9' points='120 120 60 120 90 90 120 60 120 0 120 0 60 60 0 0 0 60 30 90 60 120 120 120 '/%3E%3C/svg%3E");
  }
</style>

<section>
  <h2><em>Mon évaluation pour</em> {currentEvaluation.meal['meal-id']}</h2>
  <h3>{currentEvaluation.meal.title}</h3>
  <img src={currentEvaluation.meal.photoURL} alt={currentEvaluation.meal.photoAlt}/>
  <br/>
    {#each $contest.criterias as criterion, indexCriterion}
    <label for="criteria{indexCriterion}">{criterion}</label><input name="criteria{indexCriterion}" type="number" min="1" max="5" bind:value={$evaluations[currentEvaluationIndex].ratings[indexCriterion]} />
    <br/>
    {/each}
  
  <button on:click={doneEvaluating}>✅ Je valide mes notes</button>
</section>