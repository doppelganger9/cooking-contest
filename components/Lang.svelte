<script>
import { i18n, switchLang, lang } from '../stores/i18n.js';
</script>

<style>
button {
  color: blueviolet;
}
</style>

{#if $lang == 'fr'}
<button on:click={() => switchLang('en')}>🇺🇸</button>
{:else if $lang == 'en'}
<button on:click={() => switchLang('fr')}>🇫🇷</button>
{/if}