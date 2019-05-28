<script>
  import Loader from './Loader.svelte';

  import { i18n } from '../stores/i18n.js';
  import { currentRoute, routeTo } from '../stores/routing.js';
  import { menuOpened, menuLeft, mainLeft, closeMenu } from '../stores/side-menu.js';

//import {  } from 'svelte/transition';??

</script>

<style>
  section {
    background: #ff3e00;
    width: 40vw;
    height: 100vh;
    position: absolute;
    top:0;
    left:-40vw;
    padding: 5vh 5vw;
    z-index: 10;
    color: white;
    font-family: sans-serif;
  }
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    width: 100%;
  }
  li {
    list-style: none;
    padding: 0;
    margin: 0;
    width: 100%;
    height: 2em;
    font-size: 1.5em;
  }
  h2 {
    text-align: center;
    margin: 0 1em 3em;
  }
  hr {
    border: none;
    border-top: 1px solid white;
    display: block;
    margin: 1em 0;
  }
</style>

<section style="left: {$menuLeft}vw;">
  <h2 on:click={t => closeMenu(t)}><i class="fas fa-hamburger"></i> Menu</h2>
  <ul>
    <li on:click={() => routeTo('main')}>{$i18n['my.evaluations']}</li>
    <li on:click={() => routeTo('leaderboard')}>{$i18n['leaderboard']}</li>
    <li><hr/></li>
    <li on:click={() => routeTo('about')}>{$i18n['about']}</li>
    <li on:click={() => routeTo('legal')}>{$i18n['legal']}</li>
  </ul>
  <br/>
  <p>{$i18n['title']} - v1.0</p>
  {#if $menuOpened}
  <Loader />
  {/if}
</section>