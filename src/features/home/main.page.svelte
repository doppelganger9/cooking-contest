<script>
  import ContestInfosComponent from './contest-infos.component.svelte';
  import UsernameComponent from "../user-session/username.component.svelte";
  import EvaluationsPage from '../evaluations/evaluations.page.svelte';
  import LoaderComponent from '../loader/loader.component.svelte';

  import { username } from '../user-session/username.store.js';
  import { i18n } from '../i18n/i18n.store.js';
  import { evaluating, contest } from '../evaluations/evaluations.store.js';

  import { getCurrentContest } from '../../business/contests.js';
  //import { db } from '../../backend/firebase/core.js';
  import { db } from '../../backend/mock/db.js';
  
  // load data from Firestore (here we bind business layer with infrastructure layer)
  const contestPromise = getCurrentContest(db);
  // init store with string "loading" value
  $contest = 'loading...';
  // when data is loaded, the store will be updated.
  contestPromise.then(contestData => {
    $contest = contestData;
  });

  $: showMealDetails = $username === null;

</script>


    {#await contestPromise}
      <LoaderComponent />
    {:then theContest}
      {#if !$evaluating}
        <ContestInfosComponent {...$contest} showMealDetails={showMealDetails} />
        <UsernameComponent />
      {/if}
      <EvaluationsPage />
    {:catch err}
      <p>{$i18n['woops.cannot.load.data']}</p>
      <pre>{err}</pre>
    {/await}