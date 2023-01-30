---
title: 'Applying the Principle of Least Astonishment: Improving Code Quality and User Experience'
excerpt: 'Learn how to apply the principle of least astonishment in development through real-world examples in JavaScript. Improve the usability & maintainability of code. A must-read for software developers & engineers'
coverImage: '/assets/blog/egypt.jpg'
date: '2023-01-30T12:11:53.705Z'
tags: ['Software Design', 'UX', 'Design Principles']
author:
  name: Ruslan Elishaev
  picture: '/assets/blog/authors/ruslan.png'
ogImage:
  url: '/assets/blog/apollo-test.jpeg'
---

This article discusses [**The principle of least astonishment (POLA)**](https://en.wikipedia.org/wiki/Principle_of_least_astonishment) in software development and provides examples in JavaScript to demonstrate how it can be applied to improve the usability and maintainability of code. It covers how to properly handle function arguments and naming conventions for variables and functions. By following the POLA, developers can create code that is more predictable and less prone to errors.

## Contents

- [POLA and UX](#pola-and-ux)
- [POLA and software development](#pola-and-software-development)
  - [Consistent naming conventions](#consistent-naming-conventions)
  - [User input validation](#user-input-validation)
  - [Method chaining](#method-chaining)
  - [Function overloading](#function-overloading)
  - [Simple example in React](#simple-example-in-react)
- [Conclusion](#conclusion)

## POLA and UX

POLA is a key principle in user experience (UX) design. One common example of this principle in action is in the design of the "delete" button. If the delete button is located in a location that is not consistent with the user's expectations, such as in a location that is not typically associated with deletion, it may lead to confusion and potentially cause the user to accidentally delete something they did not intend to.

The layout and placement of buttons, menus, and other interface elements should be consistent with the user's expectations and the conventions of the platform. Navigation should also be intuitive and consistent, making it easy for users to find what they are looking for.

## POLA and software development

A simple example of the POLA in code is in the naming of variables and functions. If a variable or function is named in a way that is not consistent with its purpose, it can lead to confusion and make the code more difficult to understand and maintain.

### Consistent naming conventions

```javascript
// Bad example
function calc(x, y) {
  return x * y
}

// Googd example
function multiply(x, y) {
  return x * y
}
```

In the first example the function calc does not give any information about what it does, in contrast the second example the function multiply is self-explanatory.

Another example:

```javascript
// Bad example
function add(x, y) {
  return x + y
}
const result = add('hello', 'world') // "helloworld"

// Good example
function add(x, y) {
  if (typeof x !== 'number' || typeof y !== 'number') {
    throw new Error('Both arguments must be numbers.')
  }
  return x + y
}
const result = add('hello', 'world') // throws error
```

The above code can be replaced with typescript, which will typecheck the parameters:

```typescript
function add(x: number, y: number) {
  return x + y
}
```

Here is an examples with an object:

```javascript
// Bad example
const myObject = {
  name: 'John Doe',
  id: 123,
  getName: function () {
    return this.id
  },
}
console.log(myObject.getName()) // 123

// Good example
const myObject = {
  name: 'John Doe',
  id: 123,
  getName: function () {
    return this.name
  },
}
console.log(myObject.getName()) // "John Doe"
```

In the first example, the getName function returns the id property of the object, which is not what the user would expect based on the function name. In the second example, the function returns the expected name property, making it clear and consistent with the user's expectations.

### User input validation

```javascript
// Good example:
function checkAge(age) {
  if (age < 0 || age > 120) {
    throw new Error('Invalid age: age must be between 0 and 120')
  }
}

// Bad example:
function checkAge(age) {
  if (age < 0) {
    throw new Error('Invalid age: age must be greater than 0')
  } else if (age > 120) {
    throw new Error('Invalid age: age must be less than 120')
  }
}
```

In the good example, the function checks if the age is outside the valid range in one condition, which is less surprising for the user than in the bad example where the user has to check both conditions separately, which might be more confusing.

### Method chaining

```javascript
// Good example:
class MyClass {
  constructor(value) {
    this.value = value
  }

  add(num) {
    this.value += num
    return this
  }

  multiply(num) {
    this.value *= num
    return this
  }
}

const myObj = new MyClass(5)
console.log(myObj.add(2).multiply(3).value) // 11

// Bad example:
class MyClass {
  constructor(value) {
    this.value = value
  }

  add(num) {
    return (this.value += num)
  }

  multiply(num) {
    return (this.value *= num)
  }
}

const myObj = new MyClass(5)
console.log(myObj.multiply(3).add(2).value) // 11
```

In the good example, the methods are designed to return this which allows for method chaining. This is a common pattern in JavaScript, and users might expect it. In contrast, the bad example does not return this which might be surprising for users and less intuitive to use.

### Function overloading

```javascript
// Good example:
function calculate(a, b, operation) {
  switch (operation) {
    case 'add':
      return a + b
    case 'subtract':
      return a - b
    case 'multiply':
      return a * b
    case 'divide':
      return a / b
    default:
      throw new Error(`Invalid operation: ${operation}`)
  }
}

console.log(calculate(2, 3, 'add')) // 5
console.log(calculate(5, 2, 'subtract')) // 3

// Bad example:
function calculate(a, b, operation = 'add') {
  if (operation === 'add') {
    return a + b
  } else if (operation === 'subtract') {
    return a - b
  } else if (operation === 'multiply') {
    return a * b
  } else if (operation === 'divide') {
    return a / b
  } else {
    throw new Error(`Invalid operation: ${operation}`)
  }
}

console.log(calculate(2, 3)) // 5
console.log(calculate(5, 2, 'subtract')) // 3
```

In the good example, the function is designed to take an explicit "operation" argument which makes it clear what the function is supposed to do. In contrast, the bad example has a default value for "operation" which might be surprising for the users and less clear when the function is called.

### Simple example in React

```javascript
// Bad example
import React, { useState } from 'react'

function Counter() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>Increase</button>
    </div>
  )
}

// Good example
import React, { useState } from 'react'

function Counter() {
  const [count, setCount] = useState(0)

  const increment = () => setCount(count + 1)

  return (
    <div>
      <p>{count}</p>
      <button onClick={increment}>Increase</button>
    </div>
  )
}
```

In the first example, the onClick handler for the button is defined as an anonymous function that directly updates the state using setCount. This approach can lead to unexpected results if multiple components are sharing the same state and updating it in a non-standard way.

In the second example, the onClick handler is defined as a named function, increment, that updates the state using setCount. This approach makes the code easier to understand, test, and maintain, as the intent and behavior of the component are clearly defined and encapsulated. By following the principle of least astonishment in this example, the code is more predictable, easier to understand, and less prone to errors, making it a better user experience overall.

## Conclusion

The principle of least astonishment is a design philosophy that emphasizes the importance of making systems, interfaces, and code predictable and intuitive to the user. By applying this principle, developers can create user experiences that are straightforward and easy to understand, which can improve user satisfaction and reduce the risk of errors. By keeping code and design as simple and straightforward as possible, the principle of least astonishment can lead to a better overall user experience.
