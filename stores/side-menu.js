import { writable } from 'svelte/store';
import { tweened } from 'svelte/motion';
import { cubicOut } from 'svelte/easing';
import { tick } from 'svelte/internal';

export const menuOpened = writable(false);

export const menuLeft = tweened(-40, {
  duration: 200,
  easing: cubicOut,
});

export const mainLeft = tweened(0, {
  duration: 200,
  easing: cubicOut,
});

export function openMenu(event) {
  if (event) event.stopPropagation();
  menuLeft.set(0);
  mainLeft.set(20);// not 30 to give a parallax kind of effect
  menuOpened.set(true);
};
export function closeMenu(event) {
  if (event) event.stopPropagation();
  menuLeft.set(-40);
  mainLeft.set(0);
  menuOpened.set(false);
};
