<script>
import { loadEvaluations } from '../../business/evaluations.js';
import { authState } from 'rxfire/auth';
//import { db, auth } from '../../backend/firebase/core.js';
import { db, auth } from '../../backend/mock/db.js';

import { username, user } from "../user-session/username.store.js";
import { i18n } from "../i18n/i18n.store.js";
import { evaluations, initializeEvaluations, contest } from '../evaluations/evaluations.store.js';

let typedUsername = "";
let error = "";

// line below = Dead code?? $user is not used anywhere!!
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
        $evaluations = await loadEvaluations(db, typedUsername, $contest);
      })();
        error = "";
    } else {
        error = "error";
    }
}

const handleEnter = (event) => event.keyCode == 13 && anonymousLogin();

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

<label for="username">{$i18n['my.name.is']} </label>
<input id="username" name="username" class={error}
  type="text"
  placeholder="{error ? $i18n['username.required.placeholder']:''}"
    bind:value={typedUsername}
    on:keydown={handleEnter}
    />
<button on:click={anonymousLogin}><i class="fas fa-sign-in-alt"></i> {$i18n['sign-in']}</button>