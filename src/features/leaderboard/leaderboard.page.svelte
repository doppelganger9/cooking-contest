<script>
  import LeaderboardsComponent from './leaderboards.component.svelte';

  import { contest } from '../evaluations/evaluations.store.js';

</script>

<br/>

<LeaderboardsComponent meals={$contest.meals}/>

<br/>