<script>
import { i18n, switchLang, lang } from '../i18n/i18n.store.js';
</script>

<style>
button {
  color: blueviolet;
  border: none;
  background: transparent;
}
button:hover {
  font-weight: bolder;
  background-color: blueviolet;
}
</style>

{#if $lang == 'fr'}
<button data-e2e="btn-i18n" data-lang="fr" on:click={() => switchLang('en')}>🇫🇷 ➡️ 🇺🇸</button>
{:else if $lang == 'en'}
<button data-e2e="btn-i18n" data-lang="en" on:click={() => switchLang('fr')}>🇺🇸 ➡️ 🇫🇷</button>
{/if}