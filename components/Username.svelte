<script>
  import FirebaseLogin from "./FirebaseLogin.svelte";

  import { username } from "../stores/username";
</script>

<style>
  section {
    border: 1px solid #ff3e00;
    max-width: 80%;
    margin: 5vh auto;
    border-radius: .5em;
    padding: 1em;
    color: #555;
  }
</style>

{#if $username == null}
  <section>
    <h2>Vous n'êtes pas encore inscrit</h2>
    <FirebaseLogin />
  </section>
{/if}