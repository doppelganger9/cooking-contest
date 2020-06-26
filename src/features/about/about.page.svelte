<script>
  import { i18n } from '../i18n/i18n.store.js';
</script>

<style>
  section {
    border: .1em solid #ff3e00;
    background-image: linear-gradient(rgba(255,255,255,.8), rgba(255,255,255,0.4));
    padding: .5em;
    margin: 1em auto;
    width: 80%;
    border-radius: .5em;
  }
  h2 {
    color: #ff3e00;
  }
</style>

<section>
  <h2>About</h2>
  <p>{@html $i18n['about.contents']}</p>
</section>