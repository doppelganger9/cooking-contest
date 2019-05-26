<script>
  export let title, when;
</script>

<section>
  <h2>{title ? title : 'loading...'}</h2>
  <h3>{when ? new Date(when.seconds * 1000).toLocaleString() : ''}</h3>
</section>