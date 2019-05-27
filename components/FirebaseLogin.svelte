<script>
	import { authState } from 'rxfire/auth';
	import { auth } from '../backend/firebase/core.js';
	import { loadFirebaseEvaluations } from '../backend/firebase/firestore/evaluations.js';
  import { username, user } from "../stores/username";
  import { evaluations, initializeEvaluations, contest } from '../stores/evaluations';

	let typedUsername = "";
	let error = "";

  const unsubscribe = authState(auth).subscribe(u => $user = u);

  function anonymousLogin() {
		if (typedUsername) {
      auth.signInAnonymously().catch(error => {
        // Handle Errors here.
        let errorCode = error.code;
        let errorMessage = error.message;
        console.error(`Error trying to sign-in anonymously to Firebase: ${errorCode} ${errorMessage}`, error);
      });
			console.log("connected", typedUsername);
      $username = typedUsername;
      initializeEvaluations();
      (async () => {
        // TODO: I remember seeing that in svelte Promises should be handled directly...
        $evaluations = await loadFirebaseEvaluations(typedUsername, $contest);
      })();
			error = "";
		} else {
			error = "error";
		}
  }
</script>

<style>
	button {
	  background:  rgb(29, 195, 29);
	  color: white;
	  border: 1px solid green;
	  padding: 8px 12px;
	  border-radius: 2px;
		font-size: 1em;
	}
	input.error {
		border-color: red;
		color: red;
		background-color: lightpink;
	}
	input.error::placeholder {
		color: white;
		font-size: 1.5em;

	}
	input {
	  background: #eee;
	  color:  blueviolet;
		border: none;
	  border-bottom: .1em solid black;
	  padding: 0.2em .5em;
		font-size: 1em;
	}
</style>

<label for="username">Je m'appelle </label>
<input id="username" name="username" class={error}
  type="text"
  placeholder="{error ? `👉ton nom ICI 👈`:``}"
	bind:value={typedUsername}
	/>
<button on:click={anonymousLogin}>commencer !</button>