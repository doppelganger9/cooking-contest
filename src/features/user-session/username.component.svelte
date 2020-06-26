<script>
  import FirebaseLoginComponent from "./firebase-login.component.svelte";

  import { i18n } from '../i18n/i18n.store.js';
  import { username } from "./username.store";
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
    <FirebaseLoginComponent />
  </section>
{/if}