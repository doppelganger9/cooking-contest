import { writable } from 'svelte/store';
/**
 * Dumb i18n
 *
 * How to use:
 *
 * In your component's <script> part:
 *     import { i18n } from '../stores/i18n.js';
 *
 * Then in your component's HTML part:
 *    use {$i18n['key']}
 * or use {@html $i18n['key']} if your content has some markup.
 *
 **/

const langs = ['en', 'fr'];

const labelsByLang = {
  "en": {
    "title": "Cooking Contest!",
    "hello": "Hello, ",
    "sign-in": "Sign-in!",
    "not.signedin.yet": "You're not signed in yet",
    "my.name.is": "My name is ",
    "sign-out": "Sign-out 👋",
    "username.required.placeholder": "👉your name HERE 👈",
    "footer": `Cooked by <a href="https://lacourt.dev">David Lacourt</a> with 🧡, some <a href="https://svelte.dev"><img src="https://svelte.dev/favicon.ico" alt="svelte-logo"/>Svelte</a> and a pinch of <a href="https://firebase.google.com/">🔥Firebase</a>`,
    "my.evaluation": "My evaluation",
    "my.evaluations": "My evaluations",
    "leaderboard": "Leaderboard",
    "about": "About",
    "legal": "Legal",
    "woops.cannot.load.data": "WOops 🤭 we cannot load data",
    "about.contents": "This website is the result of its author's participation in cooking contest, coupled with the need to try SvelteJS.",
    "legal.contents": "Lorem.. ipsum?",
  },
  "fr": {
    "title": "Concours de Cuisine !",
    "hello": "Bonjour, ",
    "sign-in": "Commencer !",
    "not.signedin.yet": "Vous n'êtes pas encore inscrit",
    "my.name.is": "Je m'appelle ",
    "sign-out": "Me déconnecter 👋",
    "username.required.placeholder": "👉ton nom ICI 👈",
    "footer": `Concocté par <a href="https://lacourt.dev">David Lacourt</a> avec une dose d'🧡, de <a href="https://svelte.dev"><img src="https://svelte.dev/favicon.ico" alt="svelte-logo"/>Svelte</a> et de <a href="https://firebase.google.com/">🔥Firebase</a>`,
    "my.evaluation": "Mon évaluation",
    "my.evaluations": "Mes évaluations",
    "leaderboard": "Résultats",
    "about": "à propos",
    "legal": "mentions légales",
    "woops.cannot.load.data": "Oups 🤭 nous n'arrivons pas à charger les données",
    "about.contents": "Ce site a été créé après que son auteur ait participé à des concours culinaires, couplé à son besoin de tester SvelteJS.",
    "legal.contents": "Lorem.. ipsum?",
  }
};

export function switchLang(newLang) {
  if (langs.indexOf(newLang) < 0) {
    return;
  }
  lang.set(newLang);
  console.log('i18n switching to ' + newLang);
  i18n.set(labelsByLang[newLang]);
}

const DEFAULT_LANG = 'fr';

console.log('i18n defaulting to FR');
export const lang = writable(DEFAULT_LANG);
export const i18n = writable(labelsByLang[DEFAULT_LANG]);
