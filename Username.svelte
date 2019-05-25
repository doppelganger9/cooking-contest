<script>
  import Login from "./Login.svelte";
  import Disconnect from "./Disconnect.svelte";

  import { username } from "./stores/username";

  //let cookie = document.cookie["cookingcontest_username"];
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
  <Login />
{/if}