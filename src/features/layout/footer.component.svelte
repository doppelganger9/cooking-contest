<script>
  import DisconnectComponent from '../user-session/disconnect.component.svelte';
  import LangComponent from '../i18n/lang.component.svelte';

  import { i18n } from '../i18n/i18n.store.js';
  import { username } from '../user-session/username.store.js';
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
<p>{@html $i18n['footer']} | <LangComponent /></p>
{#if $username}<p>{$i18n['hello']} <em>{$username}</em> <DisconnectComponent button={false}/></p>{/if}
</footer>
