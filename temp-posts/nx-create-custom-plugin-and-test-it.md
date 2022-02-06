---
title: "NX: Create custom plugin generator and test it"
excerpt: "Workspace generators in NX allow you to create custom plugins, components, libs or apps and test them. This is a simple example of how to do it."
coverImage: '/assets/blog/generators.jpeg' 
date: '2022-01-30T14:15:46.787Z' 
tags: ["react", "game-of-life"] 
author: 
    name: Ruslan Elishaev 
    picture: '/assets/blog/authors/ruslan.png' 
ogImage:
    url: '/assets/blog/generators.jpeg'
---

In the previous article we learned how to use, deploy and run [microservices with docker and kubernetes](https://creotip.io/posts/nx-monorepo-running-microservices-locally-with-docker-kubernetes) in NX monorepo. 

Now we will learn how to create a custom component generator in NX and test it. <br/>
In NX, Workspace generators provide a way to automate many tasks you regularly perform as part of your development workflow.
Whether it is scaffolding out components, features, or ensuring libraries are generated and structured in a certain way,
generators help you standardize these tasks in a consistent, and predictable manner. Nx provides tooling around
creating, and running custom generators from within your workspace.

## Create NX workspace

```shell
npx create-nx-workspace --preset=react
```

Choose desired name for your project and react app:
```shell
Need to install the following packages:
  create-nx-workspace
Ok to proceed? (y) y
✔ Workspace name (e.g., org name)     · nx-starter
? Application name                    › react-test-app 
```

Now we have a workspace with a React app. Let's create a custom generator!

## Creating custom plugin generator
In a huge monorepo project there is a possibility to have many plugins, apps, libs, and components.
Let's imagine that our monorepo going to have dozens of react plugins. Each plugin has shared sets of rules, configurations, providers, wrappers, and test templates.
With NX we can create a generator, so we don't need to copy and paste the same code for each plugin. Less copy-paste, fewer human errors.
After creating a generator we can test it to be sure it works properly.

Generate the initial files needed for your workspace generator.
```shell
nx generate @nrwl/workspace:workspace-generator my-react-component
```

After the command is finished, the workspace generator is created under the tools/generators.
```shell    
nx-starter/
├── apps/
├── libs/
├── tools/
│   ├── generators
│   |   └── my-react-component/
│   |   |    ├── index.ts
│   |   |    └── schema.json
├── nx.json
├── package.json
└── tsconfig.base.json
```

Let's modify the schema.json file. We will add an option that will allow us to add recoil state to our component.

```json
{
  "$schema": "http://json-schema.org/schema",
  "cli": "nx",
  "$id": "my-react-component",
  "type": "object",
  "properties": {
    "name": {
      "type": "string",
      "description": "Library name",
      "$default": {
        "$source": "argv",
        "index": 0
      }
    },
    "generate-recoil-state": {
      "description": "Generate recoil state",
      "type": "boolean",
      "default": false
    }
  },
  "required": ["name"]
}
```
