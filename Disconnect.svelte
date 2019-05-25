<script>
	import { username } from "./stores/username";
	import { evaluations, evaluating } from "./stores/evaluations";

  function disconnect() {
    console.log("disconnected");
		$username = null;
		$evaluating = null;
		$evaluations = null;
  }
</script>

<style>
  button:focus {outline:0;}
	button:active {
		background: #666;
 		color: white;
	  border: 1px solid black;
	}
	button:hover {
		background: #aaa;
 		color: white;
	  border: 1px solid black;
	}
	button {
	  background: #eee;
	  color: #555;
	  border: 1px solid #aaa;
	  padding: 8px 12px;
	  border-radius: 2px;
	}
</style>

<button on:click={disconnect}>Me déconnecter 👋</button>