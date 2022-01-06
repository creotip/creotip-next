---
title: 'Testing form elements with React Testing Library'
excerpt: "React Testing Library is an extension of the excellent React Testing Library. Let's examine testing forms use cases by examples."
coverImage: '/assets/blog/recoil-gear/recoil-gear.jpeg'
date: '2022-01-03T16:43:32.340Z'
tags: ["react-testing-library", "react"]
author:
  name: Ruslan Elishaev
  picture: '/assets/blog/authors/ruslan.png'
ogImage:
  url: '/assets/blog/mongodb-atlas-how-to-create/cover.webp'
---

[**_React Testing Library_**](https://testing-library.com/docs/react-testing-library/intro/) is an extension of the excellent **_Testing Library_** (RTL) and builds on top of the DOM Testing Library by adding APIs for working with React components.
RTL combined with [**_JEST_**](https://jestjs.io/) allows you easily to test UI components and react-hooks.

## Testing forms with React Testing Library
Forms are one of the most complex parts of web development. Testing those forms is vital for keeping your app almost bug-free.
Let's examine some use cases!


## Testing text input with React Testing Library

```jsx
import { render, screen } from '@testing-library/react'
import React, { useState } from 'react'
import type { ChangeEvent } from 'react'
import userEvent from '@testing-library/user-event'

const TestInput = () => {
  const [val, setVal] = useState('')
  return (
    <div>
      <h1>Your favorite fruit is {val}</h1>
      <input
        placeholder="Free text"
        value={val}
        data-testid="test-input"
        onChange={(e: ChangeEvent<{ value: string }>) => setVal(e.target.value)}
      />
    </div>
  )
}

describe('<TestInput />', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TestInput />)
    expect(baseElement).toBeTruthy()
  })

  it('should allow user to change value', function () {
    render(<TestInput />)
    userEvent.type(screen.getByTestId('test-input'), 'mango')

    const input = screen.getByTestId<HTMLInputElement>('test-input')
    expect(input.value).toBe('mango')
  })
})
```

