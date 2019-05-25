export function saveState(state, key) {
  console.log('will save state into local storage', state);
  localStorage.setItem(key, JSON.stringify(state));
}

export function getState(key) {
  const state = JSON.parse(localStorage.getItem(key));
  console.log('will restore state from local storage', state);
  return state;
}
