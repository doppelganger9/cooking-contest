<script>
  import Header from './Header.svelte';
  import Footer from './Footer.svelte';
  import Loader from './Loader.svelte';
  import SideMenu from './SideMenu.svelte';

  import MainPage from './MainPage.svelte';
  import LeaderboardPage from './LeaderboardPage.svelte';
  import AboutPage from './AboutPage.svelte';
  import LegalPage from './LegalPage.svelte';

  import { i18n } from '../stores/i18n.js';
  import { mainLeft, closeMenu } from '../stores/side-menu.js';
  import { currentRoute } from '../stores/routing.js';

</script>

<style>
  main {
    padding: 0;
    margin: 0;
    font-family: sans-serif;
    text-align: center;
    
    background: rgba(120,0,100,.3);
		width: 100vw;
		height: 100vh;
		position: absolute;
		top: 0;
		left: 0;
  }
</style>

<svelte:head>
  <title>{$i18n['title']}</title>
</svelte:head>
<SideMenu />
<main style="left: {$mainLeft}vw;" on:click={() => closeMenu() }>
  <Header />

  {#if $currentRoute == 'main'}
    <MainPage />
  {:else if $currentRoute == 'leaderboard'}
    <LeaderboardPage />
  {:else if $currentRoute == 'about'}
    <AboutPage />
  {:else if $currentRoute == 'legal'}
    <LegalPage />
  {:else}
    <p>"{$currentRoute}": Je ne connais pas cette route !</p>
  {/if}

  <Footer />
</main>