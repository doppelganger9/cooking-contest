<script>
  import Header from './Header.svelte';
  import Username from "./Username.svelte";
  import Footer from './Footer.svelte';
  import Evaluations from './Evaluations.svelte';
  import ContestInfos from './ContestInfos.svelte';
  import Loader from './Loader.svelte';

  import { username } from '../stores/username.js';
  import { i18n } from '../stores/i18n.js';
  import { evaluating, evaluations, contest } from '../stores/evaluations.js';

	import { loadContestFromFirebase } from '../backend/firebase/firestore/contests.js';

  // load data from Firestore
  const contestPromise = loadContestFromFirebase();
  // init store with string "loading" value
  $contest = 'loading...';
  // when data is loaded, the store will be updated.
  contestPromise.then(contestData => {
    $contest = contestData;
  });

  $: showMealDetails = $username === null;

</script>

<style>
  main {
    padding: 0;
    margin: 0;
    font-family: sans-serif;
    text-align: center;
  }
</style>

<svelte:head>
  <title>{$i18n['title']}</title>
</svelte:head>
<main>
  <Header username={$username}></Header>
  {#if !$evaluating}
    <ContestInfos {...$contest} showMealDetails={showMealDetails} />
  {/if}
  {#await contestPromise}
    <Loader />
  {:then theContest}
    {#if !$evaluating}
    <Username />
    {/if}
    <Evaluations />
  {:catch err}
    <p>Oups 🤭 nous n'arrivons pas à charger les données</p>
    <pre>{err}</pre>
  {/await}
  <Footer />
</main>