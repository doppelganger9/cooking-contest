import { writable, readable } from "svelte/store";

function newMeal(title, id, photoURL) {
  return {
    title,
    id,
    photoURL,
    photoAlt: title.toLowerCase(),
    rating: undefined,
    ratings: [],
  };
}

export const evaluations = writable(null);
export function initializeEvaluations() {
  evaluations.set('loading');
  setTimeout(() => {
    evaluations.set([
      newMeal('Crumble pommes poires speculoos', 'A', 'https://www.cookomix.com/wp-content/uploads/2018/08/crumble-pommes-poires-speculoos-thermomix-800x600.jpg'),
      newMeal('Crumble nectarine', 'B', 'https://www.atelierdeschefs.com/media/courslive3-b962'),
      newMeal('Crumble figues noix', 'C', 'https://www.papillesetpupilles.fr/wp-content/uploads/2006/09/Crumble-figues-noix.jpg'),
      newMeal('Crumble fraise rhubarbe', 'D', 'https://odelices.ouest-france.fr/images/recettes/crumble_fraises_rhubarbe.jpg'),
      newMeal('crumble fruit rouges', 'E', 'https://img-3.journaldesfemmes.fr/GAMtWkdxTGj4DNksByg-Edt-I0s=/750x/smart/image-icu/370448_7659566846.jpg'),
    ]);
  }, 3000);
}

// currently evaluating (to show list or detail)
export const evaluating = writable(null);

export const criterias = readable([
  'Texture', 'Saveur', 'Healthy', 'Aspect', 'Originalité'
]);

