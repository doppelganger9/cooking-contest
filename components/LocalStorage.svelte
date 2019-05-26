<script>
  /**
   * This component encapsulate logic to sync state to & from LocalStorage.
   */
  export let store;
  export let key;

  //import { evaluations, evaluating } from '../stores/evaluations.js';
  import { getState, saveState } from '../backend/localStorage.js';

  // initializes state from localStorage
  $store = getState(key);

  // synchronizes state updates to localStorage
  store.subscribe( t => {
    saveState(t, key);
  });
</script>