<script>
  import Leaderboards from './Leaderboards.svelte';

  import { contest } from '../stores/evaluations.js';

</script>

<br/>

<Leaderboards meals={$contest.meals}/>

<br/>