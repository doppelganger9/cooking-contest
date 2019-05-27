<script>
  import Loader from './Loader.svelte';

  export let title = null, when = null, meals = [], showMealDetails = true;
  import Leaderboards from './Leaderboards.svelte';

</script>

<style>
  section {
    border: .1em solid #ff3e00;
    background-image: linear-gradient(rgba(255,255,255,.8), rgba(255,255,255,0.4));
    padding: .5em;
    margin: 1em auto;
    width: 80%;
    border-radius: .5em;
  }
  h2 {
    color: #ff3e00;
  }
</style>

<section>
{#if title}
  <h2>{title}</h2>
  <h3>{when ? new Date(when.seconds * 1000).toLocaleString() : ''}</h3>
  {#if showMealDetails && meals.length>0}
    <p>Avec {meals.length} plat{meals.length>1?'s':''} à évaluer :</p>
    <p>{meals.map(m => m.title).join(', ')}</p>
  {/if}
{:else}
  <Loader />
{/if}
</section>

{#if showMealDetails && meals.length>0}
<Leaderboards {meals} />
{/if}