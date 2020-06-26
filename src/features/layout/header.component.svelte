<script>
  import MenuButtonComponent from '../side-menu/menu-button.component.svelte';
  import SmallUserComponent from './small-user.component.svelte';

  import { i18n } from '../i18n/i18n.store.js';
  import { username } from '../user-session/username.store.js';

</script>

<style>
  header {
    background-color: #ff3e00;
    position: relative;
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
    <MenuButtonComponent />
  </div>

  <h1><img src="android-chrome-192x192.png" alt="logo"/> {$i18n['title']}</h1>
  {#if $username}
  <div class="right">
    <SmallUserComponent />
  </div>
  {/if}
</header>