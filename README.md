# Cooking Contest

![logo](public/android-chrome-192x192.png)

This is a [Svelte](https://svelte.dev) app.

It lives at https://github.com/doppelganger9/cooking-contest.

[I talked about it in a blog post](https://lacourt.dev/2019/05/20).

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
- you won't see my api keys in this repo 🤷‍♂️ (at least, I hope so...)

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

## Development Cost

At the moment, I've spent ~~22~~ 26 hours (~4 work days) on this webapp, starting from scratch (no prior knowledge).
I'm very impressed by the learning curve, simplicity of the framework and the resulting code is so lean and clean.

- I started a little playground project on CodeSandbox, then downloaded it and iterated from there, commiting to git.
- Adding i18n took me half an hour.
- Adding Routing and an animated side menu took me 2 hours, including reading the docs and using the Svelte REPL to understand how tweening and easing works.
- Integrating Firebase took me a little more than 8 hours.
- Playing with CSS, look & feel and design took me a few hours as it is not of my strength, to say the least 🙄.
- the last 2 hours were used to rebase interactively my local repo a few times to cleanup a bit, removing sensitive API Keys, adding a license, providing a name and description in package.json. You are seeing the end result.

### 2020 Update

- (+1h) Completely refactored the source files directory structure, and file names to expose features, business and mockable infrastructure.
- (+1h) added a mock implementation to replace Firebase Auth and Firestore for future E2E testing
- (+30min) added and configured Cypress to begin writing E2E tests.
- (+1h30) wrote first E2E tests, disabling service workers and adding data-e2e attribute to select things in tests the correct way
- (+15min) ran npm audit fix a few times
- (+30min) added code coverage generated from E2E tests

### Future plans

This repository and project is still missing on CI/CD features to automatically build, test and publish app, and also manage dependency updates automatically. 

I'll see to that in the future.