<script>
  import HeaderComponent from './layout/header.component.svelte';
  import FooterComponent from './layout/footer.component.svelte';
  import LoaderComponent from './loader/loader.component.svelte';
  import SideMenuComponent from './side-menu/side-menu.component.svelte';

  import MainPage from './home/main.page.svelte';
  import LeaderboardPage from './leaderboard/leaderboard.page.svelte';
  import AboutPage from './about/about.page.svelte';
  import LegalPage from './legal/legal.page.svelte';

  import { i18n } from './i18n/i18n.store.js';
  import { mainLeft, closeMenu } from './side-menu/side-menu.store.js';
  import { currentRoute } from './routing/routing.store.js';

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
<SideMenuComponent />
<main style="left: {$mainLeft}vw;" on:click={() => closeMenu() }>
  <HeaderComponent />

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

  <FooterComponent />
</main>