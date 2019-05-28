<script>
  import Username from "./Username.svelte";
  import Evaluations from './Evaluations.svelte';
  import Loader from './Loader.svelte';
  import ContestInfos from './ContestInfos.svelte';

  import { username } from '../stores/username.js';
  import { i18n } from '../stores/i18n.js';
  import { evaluating, contest } from '../stores/evaluations.js';

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


    {#await contestPromise}
      <Loader />
    {:then theContest}
      {#if !$evaluating}
        <ContestInfos {...$contest} showMealDetails={showMealDetails} />
        <Username />
      {/if}
      <Evaluations />
    {:catch err}
      <p>{$i18n['woops.cannot.load.data']}</p>
      <pre>{err}</pre>
    {/await}