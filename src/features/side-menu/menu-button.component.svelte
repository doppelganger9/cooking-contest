<script>
  import { closeMenu, openMenu, menuOpened } from './side-menu.store.js';
</script>

<span on:click={$menuOpened ? t => closeMenu(t) : t => openMenu(t)}><i class="fas fa-hamburger"></i> Menu</span>