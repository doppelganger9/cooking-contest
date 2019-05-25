<script>
	import { username } from "./stores/username";
	import { initializeEvaluations } from './stores/evaluations.js';

  function connect() {
		if (typedUsername) {
			console.log("connected", typedUsername);
			$username = typedUsername;
			initializeEvaluations();
			error = "";
		} else {
			error = "error";
		}
  }
	let typedUsername = "";
	let error = "";
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
<input name="username" class={error}
  type="text"
  placeholder="{error ? `👉ton nom ICI 👈`:``}"
	bind:value={typedUsername}
	/>
<button on:click={connect}>commencer !</button>