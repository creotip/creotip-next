---
title: 'Using query params as state management tool in React'
excerpt: 'An example of react app with useQueryParams as state management tool for filters in e-commerce app'
coverImage: '/assets/blog/question.jpeg'
date: '2021-12-28T05:35:07.322Z'
tags: ["react", "state-management", "query params"]
author:
  name: Ruslan Elishaev
  picture: '/assets/blog/authors/ruslan.png'
ogImage:
  url: '/assets/blog/question.jpeg'
---

## Summary
- **Use query params as state manager in react app**
- **Implement useQueryParams hook as state manager for e-commerce products filters**
- **Share the stateful app link**

## useQueryParams is not a replacement for [redux](https://redux.js.org/), [recoil](https://recoiljs.org/) or [context](https://reactjs.org/docs/context.html)

Query params are an excellent addition to existing state management tools. With [**_useQueryParams_**](https://github.com/pbeshai/use-query-params) we are not only managing the state, but we can share the stateful link with our friends.

## Shareable link

Let's say we have an e-commerce app. That app has a complex filter and uses those inputs to filter and sort out the products we want. Next, we want to share those filtered products with somebody else. With the usual state management tools, it's not possible. The good old query params provide us the possibility to save some values into a URL and share that URL.

## useQueryParams hook to the rescue

With the help of **_useQueryParams_** hook, we can leverage query params to force re-render in react app.
1. Change some filter input
2. URL is changed instantly with the help of [_**History API**_](https://developer.mozilla.org/en-US/docs/Web/API/History_API)
3. The app is listening to changes in the URL and re-renders accordingly to the modification

## Getting started with use-query-params 

install with yarn:

```shell 
yarn add use-query-params
```

install with npm:

```shell 
npm install use-query-params
```

<br/>

**Wrap the app with QueryParamProvider**
```typescript jsx
// index.tsx:
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { ChakraProvider } from '@chakra-ui/react'
import { QueryParamProvider } from 'use-query-params'
import { createBrowserHistory } from 'history'

export const history = createBrowserHistory()

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <QueryParamProvider history={history as any}>
        <App />
      </QueryParamProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
```

>   Note that in this example we are not going to use a routing library. If your app is wrapped with a router, check the docs here: <br/>
> https://github.com/pbeshai/use-query-params/tree/master/packages/use-query-params#readme


<br/>

**Usage in App.tsx**


- Listen for changes to the URL and force the app to re-render
- Fetch products from external API and set returned data to local state
- Consume data in ```<ItemsList />``` 

<br/>

```typescript jsx
// App.tsx
import { useEffect, useState, useReducer } from 'react'
import { Box } from '@chakra-ui/react'
import ItemsList from './components/items-list'
import Filters from './components/filters'
import { history } from './index'

const API_URL = 'https://fakestoreapi.com/products'

export interface ItemProps {
  title: string
  id: number
  image: string
  category: string
  price: string
}

function App() {
  const [rawProducts, setRawProducts] = useState<ItemProps[]>([])
  const [categories] = useState([
    `men's clothing`,
    'jewelery',
    'electronics',
    `women's clothing`,
  ])

  const [, forceUpdate] = useReducer((x) => x + 1, 0)
  useEffect(() => {
    history.listen(() => {
      forceUpdate()
    })
  }, [])

  const getProducts = async () => {
    const res = await fetch(API_URL)
    const json = await res.json()
    setRawProducts(json)
  }

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <Box className="App" maxWidth="800px" mx="auto" px={4}>
      <Box as="header" textAlign="center" py={7}>
        <Box as="h1" fontSize="1.5rem">
          Query params state management
        </Box>
      </Box>

      <Box>
        <Box fontSize="2rem" textAlign="center">
          Products List
        </Box>
        <Filters categories={categories} />
        <ItemsList rawProducts={rawProducts} categories={categories} />
      </Box>
    </Box>
  )
}

export default App

```

<br/>

**Create `<ItemsList />` component**

```typescript jsx
// components/items-list.tsx
import { useEffect, useState } from 'react'
import { Badge, Box, Grid, Image } from '@chakra-ui/react'
import { ItemProps } from '../App'
import { StringParam, useQueryParam } from 'use-query-params'

interface Props {
  rawProducts: ItemProps[]
  categories: string[]
}
const ItemsList = ({ rawProducts, categories }: Props) => {
  const [categoryParam] = useQueryParam('filterByCategory', StringParam)

  const [filteredProducts, setFilteredProducts] = useState(rawProducts)

  const isFiltered = categoryParam && categories.includes(categoryParam)

  const filterByCategory = (p: ItemProps[], cat: string) => {
    return p.filter((item) => item.category === cat)
  }

  useEffect(() => {
    if (isFiltered) {
      setFilteredProducts(filterByCategory(rawProducts, categoryParam))
    } else {
      setFilteredProducts(rawProducts)
    }
  }, [rawProducts, categoryParam, isFiltered])

  return (
    <Box>
      <Grid templateColumns="repeat(3, 1fr)" gap={10}>
        {filteredProducts.length &&
          filteredProducts.map((item) => (
            <Box
              key={item.id}
              boxShadow="lg"
              borderRadius={5}
              overflow="hidden"
              position="relative"
              padding={5}
            >
              <Image
                src={item.image}
                boxSize="250px"
                objectFit="cover"
                mb={4}
              />
              <Box fontSize="sm">{item.title}</Box>
              <Badge>{item.category}</Badge>
            </Box>
          ))}
      </Grid>
    </Box>
  )
}

export default ItemsList

```


<br/>

**Create `<Filters />` component**

```typescript jsx
// components/filters.tsx
import React from 'react'
import { Box, Flex, Select } from '@chakra-ui/react'
import { StringParam, useQueryParam } from 'use-query-params'

interface Props {
  categories: string[]
}
const Filters = ({ categories }: Props) => {
  const [categoryParam, setCategoryParam] = useQueryParam(
    'filterByCategory',
    StringParam
  )

  return (
    <Flex my={4} alignItems="center">
      Filter by category{' '}
      <Box mx={2}>
        <Select
          placeholder="Select option"
          onChange={(e) => setCategoryParam(e.target.value)}
          defaultValue={categoryParam ? categoryParam : ''}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </Select>
      </Box>
    </Flex>
  )
}

export default Filters

```


## The outcome

Now we are able to change the values in the select box and see that the products filtered out, and the URL params getting the values of the filter.

 - Change the category in select box to "electronics". 
 - The URL should change to: https://localhost:3000/?filterByCategory=electronics 
 - Refresh the page.
 - The products should be filtered by "electronics" category


### Codesandbox example
https://codesandbox.io/s/new-darkness-gwlwf?file=/src/App.tsx

### Resources
https://github.com/pbeshai/use-query-params
