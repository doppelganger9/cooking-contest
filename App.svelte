<script>
  import Username from "./Username.svelte";
  import Footer from './Footer.svelte';
  import Evaluations from './Evaluations.svelte';
  import LocalStorage from './LocalStorage.svelte';
  import { username } from './stores/username.js';
  import { evaluating, evaluations } from './stores/evaluations.js';
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
  <LocalStorage store={evaluations} key={"cooking-contest-evaluations"} />
  <LocalStorage store={username} key={"cooking-contest-username"} />
  <LocalStorage store={evaluating} key={"cooking-contest-evaluating"} />
	<h1>C<small>🍩🍪</small>king C<small>🎂</small>ntest!</h1>
  <section>
    <Username />
  </section>
  <Evaluations />
  <Footer />
</main>