<script>
  import { evaluating } from '../evaluations/evaluations.store.js';

  export let title, description, id, photoAlt, photoURL, rating; //props

  function clickEvaluation(id) {
    return function(event) {
      console.log(id);
      evaluating.set(id);
    }
  }
</script>

<style>
  article {
    display: flex;
  }
  article div {
    --image-width: 8em;
    width: var(--image-width);
    height: var(--image-width);
  }
  article div img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    text-align: left;
    margin: .2em;
    float: left;
    flex-basis: var(--image-width);
  }

  h3 {
    text-align: left;
    padding: 0 1em 0;
    flex-grow: 2;
  }
  h4 {
    font-size: .8em;
    flex-basis: 4em;
    text-align: center;
    border-left: 1px solid #ddd;
    padding-left: 1em;
  }
  h4 em {
    display: inline-block;
    font-style: normal;
    font-size: 3em;
    font-weight: 100;
  }
</style>

<article on:click|stopPropagation={clickEvaluation(id)}>
  <div><img src={photoURL} alt={photoAlt}></div>
  <h3>{id} - {title}</h3>
  {#if description != null}
    <p>{description}</p>
  {/if}
  {#if rating != null}
    <h4>Note: <em>{rating.toFixed(1)}</em></h4>
  {:else}
    <h4 style="color: red;">Note: <em style="font-size: 1em; margin-top: 1em;">pas encore noté</em></h4>
  {/if}
</article>