import { writable } from "svelte/store";

export const evaluations = writable(null);
export function initializeEvaluations() {
  evaluations.set('loading');
}

// currently evaluating (to show list or detail)
export const evaluating = writable(null);

export const contest = writable(null);