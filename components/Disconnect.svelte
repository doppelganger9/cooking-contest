<script>
	import { username } from "../stores/username";
	import { i18n } from "../stores/i18n";
	import { evaluations, evaluating } from "../stores/evaluations";

	export let button = true; // render as button or link.

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
	  border: 1px solid #aaa;
	  padding: 8px 12px;
	  border-radius: 2px;
	}
	a {
		text-decoration: underline;
	}
	a:hover {
		color: blueviolet;
		font-weight: bolder;
		cursor: pointer;
	}
</style>

{#if button}
<button on:click={disconnect}><i class="fas fa-sign-out-alt"></i> {$i18n['sign-out']}</button>
{:else}
<a on:click={disconnect}><i class="fas fa-sign-out-alt"></i> {$i18n['sign-out']}</a>
{/if}