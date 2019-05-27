import { writable } from 'svelte/store';

const langs = ['en', 'fr'];

const labelsByLang = {
  "en": {
    "title": "Cooking Contest!",
  },
  "fr": {
    "title": "Concours de Cuisine !",
  }
};

console.log('i18n defaulting to FR');
export const i18n = writable(labelsByLang['fr']);
