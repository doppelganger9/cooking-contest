<script>
  export let title = null, when = null, meals = [], showMealDetails = true;
</script>

<style>
  section {
    background: lightgray;
    padding: 1em 0;
  }
  h2 {
    color: #ff3e00;
  }
</style>

<section>
  <h2>{title ? title : 'loading...'}</h2>
  <h3>{when ? new Date(when.seconds * 1000).toLocaleString() : ''}</h3>
  {#if showMealDetails && meals.length>0}
  <p>Avec {meals.length} plat{meals.length>1?'s':''} à évaluer :</p>
  <p>{meals.map(m => m.title).join(', ')}</p>
  {/if}
</section>