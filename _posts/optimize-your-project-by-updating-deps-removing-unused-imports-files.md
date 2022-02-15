---
title: 'Optimization: Updating deps, removing unused imports, files and dependencies'
excerpt: 'Learn how to update your dependencies, remove unused imports,files and unused deps to optimize your project. With these cleanups you can get a better project structure and a better build time.' 
coverImage: '/assets/blog/optimize-your-project/cleaning.jpeg'
date: '2022-02-14T08:47:34.236Z'
tags: ["optimization", "cleanups"]
author:
  name: Ruslan Elishaev
  picture: '/assets/blog/authors/ruslan.png'
ogImage:
  url: '/assets/blog/optimize-your-project/cleaning.jpeg'
---
When you start a new project, everything goes well. But when a project grows, it becomes a mess. <br/>
If it's a monorepo and there are lots of developers involved, it becomes a huge mess.<br/>
That mess can be cleaned up by updating your dependencies, removing unused imports and chunks of code, removing unused files and dependencies.
Keeping your project updated, clean and organized will help you to get a better build time, increase your productivity and reduce the risk of bugs.

## Remove unused dependencies with  [**_depcheck_**](https://github.com/depcheck/depcheck)
> **_Depcheck_** is a tool for analyzing the dependencies in a project to see: how each dependency is used, which dependencies are useless, and which dependencies are missing from package.json.

In the root of your project, run the following command:

```shell
npx depcheck
```

output:

```shell
Unused dependencies
* @fontsource/inter
* @fontsource/playfair-display
Unused devDependencies
* @types/react-syntax-highlighter
```

Run the following command to remove the unused dependencies:

```shell
yarn remove @fontsource/inter @fontsource/playfair-display @types/react-syntax-highlighter
```

Now, after we cleaned up our package.json, we can move to the next step.

## Update dependencies with [**_outdated_**](https://classic.yarnpkg.com/lang/en/docs/cli/outdated/) command

The `outdated` command will show you all the outdated dependencies in your project.<br/>
Run with npm or yarn:

```shell
npm outdated
```

or

```shell
yarn outdated
```

output:

```shell
yarn outdated v1.22.15
info Color legend : 
 "<red>"    : Major Update backward-incompatible updates 
 "<yellow>" : Minor Update backward-compatible features 
 "<green>"  : Patch Update backward-compatible bug fixes                                                               
Package    Current Wanted Latest Package Type    URL
lodash     4.15.0  4.15.0 4.16.4 devDependencies https://github.com/lodash/lodash#readme
underscore 1.6.0   1.6.0  1.8.3  dependencies    https://github.com/jashkenas/underscore#readme
next-seo   4.28.1  4.29.0 5.1.0  dependencies    https://github.com/garmeeh/next-seo#readme   
✨  Done in 0.72s.                                        
```

We can see that **_lodash_** and **_underscore_** are outdated to their latest versions. <br/>
**_next-seo_** package is outdated to the **_wanted_** and **_latest_** version.

After deciding which dependencies to update, we can run the following command to update them to the **_wanted_** version:

```shell
yarn upgrade next-seo
```

Upgrading to the latest version:

```shell
yarn upgrade lodash@latest next-seo@latest
```

## Find unused source files with [**_unimported_**](https://github.com/smeijer/unimported)

By removing unused source files, you can reduce the size of your project, improve the build time, and enhance readability.
Let's see how to find unused source files with the superb **_unimported_** tool.
> **_unimported_** analyzes your code by following the require/import statements starting from your entry file.

Running unimported inside the root of next.js project:

```shell
npx unimported
```

output:
```shell
       summary               unimported v1.19.1 (next)
───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
       entry file 1        : ./pages/_app.tsx
       entry file 2        : ./pages/_document.tsx
       entry file 3        : ./pages/about.tsx
       entry file 4        : ./pages/api/hello.ts
       entry file 5        : ./pages/api/watch-project.tsx
       entry file 6        : ./pages/favorite-tools.tsx
       entry file 7        : ./pages/index.tsx
       entry file 8        : ./pages/posts/[slug].tsx
       entry file 9        : ./pages/projects.tsx

       unresolved imports  : 1
       unused dependencies : 2
       unimported files    : 4


─────┬─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
     │ 1 unresolved imports
─────┼─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
   1 │ unist
─────┴─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────


─────┬─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
     │ 2 unused dependencies
─────┼─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
   1 │ next-remote-watch
   2 │ prettier
─────┴─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────


─────┬─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
     │ 4 unimported files
─────┼─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
   1 │ components/copy-button.tsx
   2 │ components/unused.tsx
   3 │ next-sitemap.config.js
   4 │ next.config.js
─────┴─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────

```

There is 4 unimported files, 2 of them are config files related to next.js. The rest are unused components. <br/>
Safely remove those unused files.

## Remove unused imports with  [**_eslint-plugin-unused-imports_**](https://www.npmjs.com/package/eslint-plugin-unused-imports)

It's happening to all of us. We are importing a component that is not used in the file. <br/>
Sometimes we are keeping the component in the file to use it in the future, and sometimes we are just too lazy to remove it. <br/>
> Removing unused imports is a good practice to keep the code clean and easy to read. <br/> In addition to that, it helps to reduce bundle size.

Let's take a look at the following code:

````typescript jsx
import path from 'path'
import { shuffle } from '../utils'
import type {Product} from '../types'

export function randomizeProducts(products: Product[]) {
  return shuffle(products)
}
````

Notice that **_path_** package is unused. <br/>
eslint-plugin-unused-imports will help us to remove it automatically and throw an error if it's not removed. <br/>
Add unused-imports to the plugins section of your .eslintrc configuration file. You can omit the eslint-plugin- prefix:

```json
{
	"plugins": ["unused-imports"]
}
```

Then configure the rules you want to use under the rules section. I can recommend adding a check for underscores, e.g.

```json
{
	"rules": {
		"no-unused-vars": "off", // or "@typescript-eslint/no-unused-vars": "off",
		"unused-imports/no-unused-imports": "error",
		"unused-imports/no-unused-vars": [
			"warn",
			{ "vars": "all", "varsIgnorePattern": "^_", "args": "after-used", "argsIgnorePattern": "^_" }
		]
	}
}
```

Now _**Eslint**_ wil throw an error if we keep the unused import.

```shell
ESLint: 'path' is defined but never used.(unused-imports/no-unused-imports)
```

## The outcome
Keep the code clean and easy to read. Get rid of unused stuff. I will recommend removing any unused peace of code, console.logs, and comments. <br/> 
Don't keep unused stuff because you will need it in the future. We have git for that.

Keep up the good work! 🦾 🦾 🦾 
