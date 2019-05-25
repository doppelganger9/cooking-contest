<script>
  import { evaluations, evaluating } from './stores/evaluations';
  import EvaluationPreview from './EvaluationPreview.svelte';
  import RatingForm from './RatingForm.svelte';
</script>

<style>
  section {
    border: 1px solid #ff3e00;
    max-width: 80%;
    min-width: 400px;
    margin: 5vh auto;
    border-radius: .5em;
    padding: 1em;
    color: #555;
  }
</style>

{#if $evaluations != null && $evaluations !== 'loading'}
  {#if $evaluating != null}
    <RatingForm id={$evaluating} />
  {:else}
    <section>
    <h2>Mon évaluation</h2>
    {#each $evaluations as evaluation (evaluation.meal['meal-id'])}
      <EvaluationPreview
        title={evaluation.meal.title}
        id={evaluation.meal['meal-id']}
        photoURL={evaluation.meal.photoURL}
        photoAlt={evaluation.meal.photoAlt}
        description={evaluation.meal.description}
        rating={evaluation.rating}
      />
    {/each}
    </section>
  {/if}
{:else}
  {#if $evaluations === 'loading'}
<section>
    <h3>loading data...</h3>
</section>
  {/if}
{/if}
