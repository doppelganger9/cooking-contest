<script>
  import FirebaseLogin from "./FirebaseLogin.svelte";
  import Disconnect from "./Disconnect.svelte";

  import { username } from "../stores/username";
</script>

<style>
  em {
    color: blueviolet;
    font-style: normal;
  }
</style>

{#if $username != null}
  <h2>Bonjour, <em>{$username}</em></h2>
  <Disconnect />
{:else}
  <h2>Vous n'êtes pas encore inscrit</h2>
  <FirebaseLogin />
{/if}