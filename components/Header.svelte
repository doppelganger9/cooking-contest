<script>
  export let username;
</script>

<style>
  div {
    position: absolute;
    top: 0;
    margin: 0;
    padding: .5em .1em;
    color: white;
    font-size: 2em;
    z-index: 2;
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
    background-color: #ff3e00;
    margin: 0;
    padding: .5em 0.1em;
  }
</style>

<header>
  <h1><img src="android-chrome-192x192.png" alt="logo"/> Cooking Contest!</h1>
  {#if username}
  <div class="right">
    <i class="fas fa-user-circle"></i> {username}
  </div>
  {/if}
</header>