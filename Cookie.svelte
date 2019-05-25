<script>
  /**
   * This component encapsulate logic to sync state to & from LocalStorage.
   */
  import { username } from './stores/evaluations.js';
  import { getState, saveState } from './stores/backend/localStorage.js';

  // initializes state from localStorage
  $username = getCookie();

  // synchronizes state updates to localStorage
  evaluations.subscribe( t => {
    saveState(t);
  });
</script>