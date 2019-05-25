import { writable } from "svelte/store";
import { getCookies, setCookie } from "./backend/cookies";
import { initializeEvaluations } from './evaluations';

// This is a custom Store; it only needs to have { subscribe, set, update }

const COOKIE_NAME = 'cookiecontextuser';
const cookies = getCookies(document);
const savedCookie = cookies.find(it => it.name === COOKIE_NAME);
const savedUserNameInCookie = savedCookie ? savedCookie.value : undefined;

export const username = ((_document, initialValue) => {
  console.log(cookies);
  let _username = writable(initialValue);

  const subscribe = (x) => {
    const unsubscribe = _username.subscribe(x);
    console.log('username subscribe', x);
    return unsubscribe;
  };
  const set = (x) => {
    console.log('username set', x);
    setCookie({ document: _document, name: COOKIE_NAME, value: x });
    initializeEvaluations();
    return _username.set(x);
  };
  const reset = () => {
    console.log('username reset');
    setCookie({ document: _document, name: COOKIE_NAME, value: null, days: -1 });
    return _username.set(null);
  };
  const update = (x) => {
    console.log('username update', x);
    initializeEvaluations();
    setCookie({ document: _document, name: COOKIE_NAME, value: x });
    _username.update(() => x);
    return _username;
  };

  return {
    subscribe,
    set,
    update,
    reset,
  };

})(document, savedUserNameInCookie);
