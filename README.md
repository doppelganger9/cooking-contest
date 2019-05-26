# Cooking Contest

![logo](public/android-chrome-192x192.png)

This is a [Svelte](https://svelte.dev) app.

It lives at https://github.com/doppelganger9/cooking-contest.

## Get started

*Note that you will need to have [Node.js](https://nodejs.org) installed.*

Install the dependencies...

```bash
cd cooking-contest
npm install
```

...then start [Rollup](https://rollupjs.org):

```bash
npm run dev
```

Navigate to [localhost:5000](http://localhost:5000).
You should see the app running.
Edit a component file in `src`, save it, and reload the page to see your changes.

## Deploying to the web

### With [Firebase](https://firebase.google.com)

Install `firebase-cli` if you haven't already:

```bash
npm install -g firebase-cli
```

First time, create a project in Firebase, and do

```bash
firebase init
```

Copy `.env.example` into `.env` and change values inside with yours from Firebase console.

---

### hiding sensitive apikeys via dotenv, replace plugin

When building,

- we rely on [dotenv](https://github.com/motdotla/dotenv) to read a `.env` file containing all the Firebase's sensitive informations (Api keys, project ID, etc.) and to expose them in `process.env`.
- this is then assigned to words in the [Rollup-plugin-replace](https://github.com/rollup/rollup-plugin-replace) configuration inside `rollup.config.js`
- in the end, it replaces the `<@FIREBASE_...@>` in the `firebase.js` file with real string values.
- you won't see my api keys in this repo 🤷‍♂️

---

Once this is done, from within your project folder:

```bash
npm run build
firebase auth
firebase deploy
```

A `.firebaserc` will be created, do not commit it.

## Contributing

See [CONTRIBUTING](CONTRIBUTING.md) file.

## License

See [LICENCE](LICENCE) file.
