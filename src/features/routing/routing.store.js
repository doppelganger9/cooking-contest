import { writable } from 'svelte/store';

export const currentRoute = writable('main');

export function routeTo(targetPage) {
  // TODO: some animation ?
  currentRoute.set(targetPage);
}