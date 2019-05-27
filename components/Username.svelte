<script>
  import FirebaseLogin from "./FirebaseLogin.svelte";

  import { i18n } from '../stores/i18n.js';
  import { username } from "../stores/username";
</script>

<style>
  section {
    border: .1em solid #ff3e00;
    max-width: 80%;
    margin: 5vh auto;
    border-radius: .5em;
    padding: 1em;
    background-image: linear-gradient(rgba(255,255,255,.8), rgba(255,255,255,0.4));
  }
</style>

{#if $username == null}
  <section>
    <h2>{$i18n['not.signedin.yet']}</h2>
    <FirebaseLogin />
  </section>
{/if}