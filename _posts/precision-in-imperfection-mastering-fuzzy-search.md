---
title: 'Precision in Imperfection: Mastering Fuzzy Search'
excerpt: 'Explore the power of fuzzy search with TypeScript, React, Hooks, Chakra-UI, and Hook Form. Learn how to build a dynamic search feature that can handle imperfect queries with ease.'
coverImage: '/assets/blog/fuzzy.jpg'
date: '2023-01-30T12:11:53.705Z'
tags: ['Fuzzy Search', 'Search Algorithms', 'React']
author:
  name: Ruslan Elishaev
  picture: '/assets/blog/authors/ruslan.png'
ogImage:
  url: '/assets/blog/apollo-test.jpeg'
---

In today's fast-paced digital world, search functionality is a critical component of many applications.
But what if your users make typos or enter incomplete queries? This is where **fuzzy search** comes to the rescue!
In this blog post, we'll dive into the concept of [**fuzzy search**](https://redis.com/blog/what-is-fuzzy-matching/) and explore how to implement it using TypeScript, React, React Hooks, [Chakra-UI](https://chakra-ui.com/), and React Hook Form and test it with Jest.
From building a custom search function from scratch to enhancing the search experience with fuzzy matching algorithms, this comprehensive guide will equip you with the tools to implement a robust and dynamic search feature that can handle imperfect queries with ease.

## Contents

- [What is Fuzzy Search](#what-is-fuzzy-search)
- [Use Cases of Fuzzy Search](#use-cases-of-fuzzy-search)
- [Famous apps and platforms that utilize fuzzy search](#famous-apps-and-platforms-that-utilize-fuzzy-search)
- [Implementing the Fuzzy Search Feature](#implementing-the-fuzzy-search-feature)
- [Conclusion](#conclusion)

## What is Fuzzy Search?

Fuzzy search, also known as [**approximate string matching**](https://en.wikipedia.org/wiki/Approximate_string_matching), is a text matching technique that aims to find approximate matches of a given query in a collection of texts or data. It allows for flexible searching by accounting for minor differences between the search query and the data being searched. Fuzzy search is especially useful when dealing with large datasets or when users may input imperfect or incomplete queries.

## Use Cases of Fuzzy Search

Fuzzy search can be beneficial in a wide range of applications where approximate matching is required. Some common use cases of fuzzy search include:

- Search functionality in web applications: Fuzzy search can enhance the search functionality of web applications by providing more relevant results even when users input imperfect or incomplete queries. For example, in an e-commerce website, fuzzy search can help users find products even if they misspell the product name or use different variations of the same word.

- Autocomplete suggestions: Fuzzy search can be used to provide autocomplete suggestions as users type in a search or input field. It can help users quickly find relevant options even if they make typos or use different word forms.

- Spell checking and correction: Fuzzy search can be used for spell checking and correction in applications that involve text input, such as text editors or chat applications. It can suggest correct spellings even when users make typos or input words with missing or extra characters.

- Natural language processing: Fuzzy search can be used in applications that involve natural language processing, such as sentiment analysis, text classification, or entity recognition. It can help in matching similar words or phrases, even if they have slight differences.

### Famous apps and platforms that utilize fuzzy search

1. Google: Google's search engine uses fuzzy search algorithms to provide accurate results even when the user's query contains typos, misspellings, or other errors. Google's "Did you mean" feature is a classic example of fuzzy search in action, where it suggests alternative search queries based on approximate matches.

1. GitHub: GitHub, a popular code hosting platform, uses fuzzy search to help developers find relevant repositories, files, and code snippets.

1. Slack: Slack, a widely used team communication platform, employs fuzzy search to help users find messages, channels, and users within a large volume of conversations.

1. Trello: Trello, a popular project management tool, uses fuzzy search to help users find boards, cards, and labels by leveraging approximate matching algorithms.

1. eCommerce websites: Many eCommerce websites, such as Amazon, eBay, and Shopify, use fuzzy search to help users find products based on approximate matching of product names, descriptions, or attributes. This allows users to find relevant products even if they are not exactly sure about the exact product name or spelling.

Music streaming platforms: Music streaming platforms like Spotify, Apple Music, and Pandora use fuzzy search to help users find songs, artists, albums, and playlists based on approximate matching of song titles, artist names, or album names. This allows users to find and discover music even with slight variations or misspellings in their search queries.

### An example from google

![google fuzzy search](/assets/blog/fuzzy/fuzzy-google.png)

&nbsp;
&nbsp;
&nbsp;

### An example from amazon

![amazon fuzzy search](/assets/blog/fuzzy/amazon-fuzzy.png)

## Implementing the Fuzzy Search Feature

Create a basic `fuzzySearch()` function with a [HashMap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) to store normalized items

```typescript
// fuzzy-search.ts

interface SearchResult {
  item: string
  score: number
}

function fuzzySearch(query: string, items: string[]): SearchResult[] {
  const results: SearchResult[] = []
  const normalizedQuery = query
    .toLowerCase()
    .replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')

  const normalizedItemsMap = new Map<string, string>()

  for (const item of items) {
    const normalizedItem = normalizedItemsMap.get(item) || item.toLowerCase()
    normalizedItemsMap.set(item, normalizedItem)

    let score = 0
    let i = 0
    let j = 0

    while (i < normalizedQuery.length && j < normalizedItem.length) {
      if (normalizedQuery[i] === normalizedItem[j]) {
        score++
        i++
        j++
      } else {
        j++
      }
    }

    const finalScore =
      score * (score / (normalizedQuery.length * normalizedItem.length))

    if (finalScore > 0) {
      results.push({ item, score: finalScore })
    }
  }

  results.sort((a, b) => b.score - a.score)

  return results
}
```

This fuzzy search function takes a query string and an array of items to search through.
A HashMap `normalizedItemsMap` is created to store the normalized versions of items. The normalized item is retrieved from the map using the original item as the key, if it already exists in the map. This avoids redundant normalization operations for the same item, which can improve performance when dealing with a large number of items.
Then, it calculates a fuzzy score for each item based on the number of matching characters.

Finally, it sorts the results by score in descending order and returns an array of search results, each containing the original item and its fuzzy score.

> Note that this is a simple example and there are many other more advanced fuzzy search algorithms and libraries available depending on your use case.

Create a react hook the utilizes the fuzzySearch function

```tsx
// use-fuzzy-search.tsx
import { useState } from 'react'
import { fuzzySearch, SearchResult } from './fuzzy-search'

const useFuzzySearch = (items: any) => {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])

  const performSearch = (query: any) => {
    if (query) {
      const searchResult = fuzzySearch(query, items)
      setSearchResults(searchResult)
    } else {
      setSearchResults([])
    }
  }

  return { searchResults, performSearch }
}

export default useFuzzySearch
```

In this custom hook, we're using useState to manage the search results state. The performSearch function takes a search query as input, uses the **fuzzySearch()** function to perform fuzzy search on the list of items, and updates the search results state accordingly.

Let's test the `fuzzySearch()` function with jest

```typescript
// fuzzy-search.test.ts
import { fuzzySearch, SearchResult } from './fuzzy-search'

describe('fuzzySearch', () => {
  const items = ['apple', 'banana', 'cherry', 'date', 'elderberry']

  it('should return correct search results for a query', () => {
    const query = 'ae'
    const expectedResults: SearchResult[] = [
      { item: 'apple', score: expect.any(Number) },
      { item: 'date', score: expect.any(Number) },
    ]

    const results = fuzzySearch(query, items)
    expect(results).toEqual(expect.arrayContaining(expectedResults))
  })

  it('should return empty array for an empty query', () => {
    const query = ''
    const results = fuzzySearch(query, items)
    expect(results).toEqual([])
  })

  it('should return empty array for no matching items', () => {
    const query = 'xyz'
    const results = fuzzySearch(query, items)
    expect(results).toEqual([])
  })
})
```

In this example, we're using Jest to write tests for the fuzzySearch function. We have three test cases:
one to check if the function returns correct search results for a given query,
one to check if it returns an empty array for an empty query, and one to check if it returns an empty array for a query that doesn't match any items. We use Jest's expect functions to make assertions about the expected results and the actual results returned by the fuzzySearch function.

Now we will construct the UI. First let's create the input form with react-hook-form lib

```jsx
/// search-input.tsx

import { useForm } from 'react-hook-form'
import { Input } from '@chakra-ui/react'

const SearchInput = ({ onSearch }: any) => {
  const { register } = useForm()

  return (
    <form>
      <Input
        {...register('searchQuery', {
          onChange: (e) => onSearch(e.target.value),
        })}
        placeholder="Enter your search query..."
        size="lg"
      />
    </form>
  )
}

export default SearchInput
```

Search results list

```jsx
// search-results.tsx

import React from 'react'
import { Box, Text } from '@chakra-ui/react'
import { SearchResult } from './fuzzy-search'

interface SearchResultsProps {
  results: SearchResult[];
}

const SearchResults = ({ results }: SearchResultsProps) => {
  return (
    <Box mt={4}>
      {results.length === 0 ? (
        <Text color="gray.500">No results found.</Text>
      ) : (
        results.map((result) => (
          <Box key={result.item} p={4} bg="gray.100" my={2}>
            <Text>{result.item}</Text>
            <Text color="gray.500">{`Score: ${result.score.toFixed(2)}`}</Text>
          </Box>
        ))
      )}
    </Box>
  )
}

export default SearchResults
```

Wrap it up

```jsx
import React from 'react'
import { ChakraProvider, Container, Heading } from '@chakra-ui/react'
import SearchInput from './search-input'
import SearchResults from './search-results'
import useFuzzySearch from './use-fuzzy-search'

const items = ['Apple', 'Banana', 'Orange', 'Strawberry', 'Grapes']

const App = () => {
  const { searchResults, performSearch } = useFuzzySearch(items)

  const handleSearch = (query: string) => {
    console.log('search started')
    performSearch(query)
  }

  return (
    <ChakraProvider>
      <Container maxW="xl" mt={10}>
        <Heading as="h1" size="xl" mb={4}>
          Fuzzy Search Example
        </Heading>
        <SearchInput onSearch={handleSearch} />
        <SearchResults results={searchResults} />
      </Container>
    </ChakraProvider>
  )
}

export default App
```

### The result

<iframe src="https://codesandbox.io/embed/fuzzy-search-react-chakra-ui-lwxn8n?fontsize=14&hidenavigation=1&theme=dark"
     style={{width: "100%", height: "500px", border: "0", borderRadius: "4px", overflow:"hidden"}}
     title="fuzzy-search-react-chakra-ui"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

## Conclusion

Fuzzy search is a powerful technique that can enhance the search functionality of your applications. By allowing for flexible matching and accommodating imperfect queries, fuzzy search can improve the user experience and make search more accessible and user-friendly.
