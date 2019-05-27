<script>
  import Disconnect from './Disconnect.svelte';

  import { username } from '../stores/username.js';
</script>
<style>
  footer {
    width: 99%;
    margin: 0 auto;
    padding: 0;
  }
  em {
    color: blueviolet;
    font-style: normal;
  }

</style>

<footer>
<p>Made with 🧡 and Svelte by <a href="lacourt.dev">David Lacourt</a></p>
{#if $username}<p>Bonjour, <em>{$username}</em> <Disconnect button={false}/></p>{/if}
</footer>
