<script>
  import Username from "./Username.svelte";
  import Footer from './Footer.svelte';
  import Evaluations from './Evaluations.svelte';
  import ContestInfos from './ContestInfos.svelte';

  import { username } from './stores/username.js';
  import { evaluating, evaluations, contest } from './stores/evaluations.js';

  import { loadContestFromFirebase } from './firebase.js';

  // load data from Firestore
  const contestPromise = loadContestFromFirebase();
  // init store with string "loading" value
  $contest = 'loading...';
  // when data is loaded, the store will be updated.
  contestPromise.then(contestData => {
    $contest = contestData;
  });

</script>

<style>
  main {
    padding: 0;
    margin: 0;
    font-family: sans-serif;
    text-align: center;
  }
  h1 {
    color: white;
    font-size: 2em;
    background-color: #ff3e00;
    box-sizing: border-box;
    margin: 0;
    padding: .5em 0.1em;
    min-width: 445px;
  }
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

<main>
	<h1>C<small>🍩🍪</small>king C<small>🎂</small>ntest!</h1>
  <ContestInfos {...$contest} />
  <section>
    <Username />
  </section>
  <Evaluations />
  <Footer />
</main>