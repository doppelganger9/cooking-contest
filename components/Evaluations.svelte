<script>
  import EvaluationPreview from './EvaluationPreview.svelte';
  import RatingForm from './RatingForm.svelte';
  import Loader from './Loader.svelte';

  import { evaluations, evaluating } from '../stores/evaluations';
  import { i18n } from '../stores/i18n.js';
</script>

<style>
  section {
    border: .1em solid #ff3e00;
    max-width: 80%;
    margin: 5vh auto;
    border-radius: .5em;
    padding: 1em;
    background-image: linear-gradient(rgba(255,255,255,.8), rgba(255,255,255,.5));
  }
</style>

{#if $evaluations != null && $evaluations !== 'loading'}
  {#if $evaluating != null}
    <RatingForm id={$evaluating} />
  {:else}
    <section>
    <h2>{$evaluations.length > 1 ? $i18n['my.evaluations']:$i18n['my.evaluation']}</h2>
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
    <Loader />
</section>
  {/if}
{/if}
