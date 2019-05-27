<script>
  import Disconnect from './Disconnect.svelte';
  import Lang from './Lang.svelte';

  import { i18n } from '../stores/i18n.js';
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
<p>{@html $i18n['footer']}</p>
{#if $username}<p>{$i18n['hello']} <em>{$username}</em> <Disconnect button={false}/></p>{/if}
<Lang />
</footer>
