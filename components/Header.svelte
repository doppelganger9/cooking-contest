<script>
  import MenuButton from './MenuButton.svelte';
  import SmallUser from './SmallUser.svelte';

  import { i18n } from '../stores/i18n.js';
  import { username } from '../stores/username.js';

</script>

<style>
  header {
    background-color: #ff3e00;
  }
  div {
    position: absolute;
    top: 0;
    margin: 0;
    padding: .5em .1em;
    color: white;
    z-index: 2;
    font-size: 1.3em;
    width: 3em;
    text-align: center;
  }
  div.right {
    right: 1em;
  }
  div.left {
    left: 1em;
  }
  img {
    height: 1em;
    vertical-align: top;
    padding: 0 .5em;
  }
  h1 {
    position: relative;
    color: white;
    font-size: 2em;
    margin: 0 auto;
    padding: .5em 0.1em;
    z-index: 3;
    width: 50vw;
  }
</style>

<header>
  <div class="left">
    <MenuButton />
  </div>

  <h1><img src="android-chrome-192x192.png" alt="logo"/> {$i18n['title']}</h1>
  {#if $username}
  <div class="right">
    <SmallUser/>
  </div>
  {/if}
</header>