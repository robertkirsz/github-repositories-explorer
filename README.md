# GitHub Repositories Explorer

An app that lets you search for GitHub users and list their repos. Made as a part of a recruitment process.

Check it out here: https://repos-explorer.netlify.app

## Installation
```bash
npm install
```

## Development
```bash
npm start
```
The app will be available at http://localhost:1987/ with Hot Module Replacement ([HMR](https://webpack.js.org/guides/hot-module-replacement/)) enabled.

## Building
```bash
npm run build
npm run serve
```
The production-ready app will be built into the `dist` folder, served from there, and made available at http://localhost:8080/.

## Linting
```bash
npm run lint
npm run prettier
```

## Testing
```bash
npm test
```

You can also run `npm run test:coverage` to generate coverage report.

I'm using [Testing Library](https://testing-library.com/) with Jest. I'm focusing on testing the flow from the user perspective and not the implementation details (although I do some `store.getState()` checks here and there).

## Build system
I decided to write a custom webpack + Babel setup, rather than using a ready-made solution like [Create React App](https://create-react-app.dev/) (which I like a lot) mostly because I didn't have an opportunity to do that recently and I like writing build setups from scratch.

It's a simple JSX-parsing, async/await-supporting setup with `src` being treated as a root-level folder to enable absolute paths for importing files.

## Redux
I didn't check Redux docs in ages and I was surprised in now something called [Redux Toolkit](https://redux-toolkit.js.org/). It's an official module that "is intended to be the standard way to write Redux logic". It's quite nice, I like the `createSlice()` function that bundles actions and reducers together and the `createAsyncThunk()` that makes it very easy to handle request statuses ("pending", "fulfilled", "rejected"). It also uses [Immer](https://immerjs.github.io/immer/) behind the scenes which let us use mutating syntax but makes sure the data is not being mutated.

I think I'll be using this toolkit in the future, it reduces the infamous Redux boilerplate significantly. I'm perfectly fine (and at that point much more fluent) working with Redux the old way though 👍

## UX changes
I decided to make some changes in the UX 😬 I normally NEVER DO THAT! I always stick to the designs and try to implement them as close to the intentions of the authors as possible. I started as a web designer myself, so I have respect for the work designers do. But here I decided it will be more fun to replace the "submit" button with an input that makes requests automatically as you type. I also added a "search more" button that appends more search results to the existing list.

## Custom modules
I'm using [styled-kit](https://www.npmjs.com/package/styled-kit) - it's a tiny styled-components-based npm package that exposes a `Div` component I wrote years ago. It's a generic wrapper element useful for when we need a container for some other components. It's flex-based and makes it easy to control the layout and spacing of its children.

The module has a simple [demo page](https://robertkirsz.github.io/styled-kit/) (work in progress). There's also something called `HeightTransition` there but it's not yet documented.

## Code format
These ESLint and Prettier configs that I'm using are rules that I use in my personal projects, but I'm fine using any style guides.
