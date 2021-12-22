---
title: 'recoil-gear: The missing devtools for recoil.js'
excerpt: 'recoil-gear is devtools connector to redux devtools. Observe and debug recoil atoms and selectors in redux devtools '
coverImage: '/assets/blog/recoil-gear/recoil-gear.jpeg'
date: '2021-12-21T05:35:07.322Z'
author:
  name: Ruslan Elishaev
  picture: '/assets/blog/authors/ruslan.png'
ogImage:
  url: '/assets/blog/recoil-gear/recoil-gear.jpeg'
---

[Recoil](https://recoiljs.org/) is a great alternative for state-management libraries such as [redux](https://redux.js.org/), [redux-toolkit](https://redux-toolkit.js.org/), [mobx](https://mobx.js.org/README.html), or any other tool. No doubt that redux is the king in that field, but at the same time many developers struggle with the complexity and boilerplate that comes with redux.

I'm not going to introduce **_Recoil_** in this article. The recoil docs are quite straightforward, so please, visit the docs:


[https://recoiljs.org/docs/introduction/getting-started/](https://recoiljs.org/docs/introduction/getting-started/)

For complex implementation check this excellent article:
<https://jasonwatmore.com/post/2021/09/16/react-recoil-user-registration-and-login-example-tutorial>

## Recoil devtools
 _**Recoil**_ has functionality to allow you to observe and update state changes, but no built-in UI tool or browser extension. [Recoil-gear](https://github.com/creotip/recoil-gear) is a simple debug component that connects [_**Redux DevTools**_](https://github.com/zalmoxisus/redux-devtools-extension) to  _**Recoil**_ .
 _**Redux DevTools**_ is one of the main features that developers love working with **_Redux_**, so recoil-gear is combining two great tools.

## Getting started with Recoil and recoil-gear

install with yarn:

```shell
 yarn add recoil recoil-gear
 ```

install with npm:

```shell
 npm install recoil recoil-gear
 ```

install Redux DevTools: 

<https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en>



usage:
```jsx
import * as React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { RecoilRoot } from 'recoil'
import { RecoilDevTools } from 'recoil-gear'


ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <RecoilDevTools />
      <App />
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root')
)
```

Open up redux devtools and observe state changes in redux devtools


![recoil-gear devtools ](/assets/blog/recoil-gear/recoil-gear-redux.png)

### Resources
<https://recoiljs.org/>

<https://github.com/creotip/recoil-gear>

<https://github.com/zalmoxisus/redux-devtools-extension>