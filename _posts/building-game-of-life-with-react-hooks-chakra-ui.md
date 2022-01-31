---
title: 'Building Game of Life with React, Hooks and Chakra-UI'
excerpt: "Simplest way to build Conway's Game of Life with Typescript, React, Hooks and Chakra-UI. Repository with the source code provided."
coverImage: '/assets/blog/gol.png'
date: '2022-01-27T22:10:24.309Z'
tags: ["react", "game-of-life"]
author:
  name: Ruslan Elishaev
  picture: '/assets/blog/authors/ruslan.png'
ogImage:
  url: '/assets/blog/gol.png'
---


Game of life game is a simple cellular automaton invented by the British mathematician John Horton Conway in 1970. 
Jonathan Horton Conway was a British mathematician, logician, cryptanalyst, and theoretical biologist. He was the first to introduce the concept of a finite state machine to a formal language.
According to [**_wikipedia_**](**_https://en.wikipedia.org/wiki/Conway's_Game_of_Life_**), the rules of the game are:

1. Any live cell with fewer than two live neighbours dies, as if by underpopulation.
2. Any live cell with two or three live neighbours lives on to the next generation.
3. Any live cell with more than three live neighbours dies, as if by overpopulation.
4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

These rules, which compare the behavior of the automaton to real life, can be condensed into the following:

1. Any live cell with two or three live neighbours survives.
2. Any dead cell with three live neighbours becomes a live cell.
3. All other live cells die in the next generation. Similarly, all other dead cells stay dead.

## Building Game of life with React 

I'm not going to explain here how to start React project and other basics. Instead, I will summarize the steps I've taken to build this project.

**_useGame_** hook that consists the following building blocks:

```typescript jsx
const { 
  grid, 
  steps, 
  initialize, 
  isRunning, 
  setIsRunning, 
  randomize, 
  handleCell, 
  handleNext 
} = useGame() 
```
Check the entire code here: <br/>
https://github.com/creotip/game-of-life-react/blob/master/src/hooks/useGame.tsx


- `grid`
  - 2D array that represents the current state of the game.
  - Each cell is either dead or alive.
- `steps`
  - Number of steps that have been taken.
- `initialize`
  - This function initializes the game.
  - Resets the game to the initial state.
- `isRunning`
  - Boolean that represents whether the game is running or not.
- `setIsRunning`
  - This function sets the state of the game.
  - It can be used to start or stop the game.
- `randomize`
  - This function randomizes the cells of the game.
- `handleCell`
  - This function handles the click event on the cell.
  - It can be used to toggle the state of the cell.
- `handleNext` 
  - It can be used to advance the game by one step.


### Building cells with css grid

CSS grid is a layout system that allows you to create a grid of cells. 
In our case, it's perfect for building a game of life layout. [Chakra-UI](https://chakra-ui.com/docs/getting-started) makes it even easier with their [styled-system](https://styled-system.com/) implementation.

```typescript jsx
<SimpleGrid
  data-testid="grid-wrapper"
  gridTemplateColumns={`repeat(${COLUMNS}, 20px)`}
  gridGap="2px"
  mb="4rem"
>
  {grid &&
    Object.keys(grid).map((column, index) => (
      <SimpleGrid key={index} className="column" data-testid="column" gridGap="2px">
        {grid[column].map((cell: boolean, rowIndex: number) => (
          <Box
            onClick={() => handleCell(+column, rowIndex, cell)}
            key={rowIndex}
            data-testid="cell"
            width="20px"
            height="20px"
            backgroundColor={cell ? 'black' : 'gray.300'}
            cursor="pointer"
          />
        ))}
      </SimpleGrid>
    ))}
</SimpleGrid>
```

Basically, That's it. We've created a hook that exposes states and methods to build the game. A CSS grid that represent the UI of the game.
The entire source code is available on [**_https://github.com/creotip/game-of-life-react_**](https://github.com/creotip/game-of-life-react)

**_Demo_**: <br/>
https://game-of-life-app.netlify.app/