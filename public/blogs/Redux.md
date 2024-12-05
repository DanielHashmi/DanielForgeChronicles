---
title: Redux Simplified Version
author: Daniel Hashmi
date: 11/30/2024
slug: Redux
image: redux.png
desc: This is a simplified version of redux, This will guide you through all steps to use redux in your project, By just following the steps step by step you will understand how it works and how you can integrate it in your project.
---

# **Installation**

## Create a new redux app by these commands and ReduxApp is the name of the app
```ts
npx create-react-app ReduxApp
```
## Change directory to the new created app
```ts
cd ReduxApp
```
## Start the app
```ts
yarn start
```

## Install redux and connect it with react
```ts
npm i redux react-redux
```

<br>
<hr style="border:1px solid gray; background-color:gray">
<br>

# **Actions**

# Now we will create a counter app, To create that what we need.
- ## A UI Obviously
- ## Two functions INCREMENT, DECREMENT


- - ### Create UI as you wish
- - ### We call functions actions in Redux
- - - #### Create Actions folder to organize actions
- - - #### Create a js file and create an action like this

## This is an Action/Functions
## Increment
```ts
export const incFunc = (num) => {
   return{
        type: "INCREMENT",
        payload:num
   }
}
```
## Decrement In Arrow Function
```ts
export const decFunc = (num) => { type: "DECREMENT", payload: num }
```
<br>
<hr style="border:1px solid gray; background-color:gray">
<br>

# **Reducers**
## In Reducers we conditionally assign or do something, For Example: If Actions type is INCREMENT increase the state by one and if Actions type is DECREMENT and Actions payload is 5 than decrease 5 from the state

```ts
const initialState = 0;

changeNum = (state = initialState, action) => {
   switch (action.type) {
      case "INCREMENT": return state + 1;
      case "DECREMENT": return state - action.payload;
      default: return state;
   }
}
export default changeNum;
```
## We can create multiple reducers for multiple actions and combine them in one reducer to use it easily

```ts
import changeNum from "./DirectoryOfChangeNumAction";

import { combineReducers } from "redux";

const rootReducer = combineReducers({
    changeNum,
 // changeBackground, // Example
 // changeLogo, // Example
})

export default rootReducer;
```

<br>
<hr style="border:1px solid gray; background-color:gray">
<br>

# **Store**
## Store is a place in which we store our Reducers to distribute them throughout our App components, We give access of rootReducer to the store.

```ts
import { createStore } from "redux" ;

import rootReducer from "./DirectoryOfRootReducer";

const store = createStore( rootReducer );

export default store;
```
<br>
<hr style="border:1px solid gray; background-color:gray">
<br>

# **Provider**
## Provider is the person that providers Reducers to our App from the Store, We wrap our App with the Provider in the main.js file


```ts
import store from "./store";
import { Provider } from "react-redux" ;


<Provider store={ store }>
  <App/>
<Provider/>
```

<br>
<hr style="border:1px solid gray; background-color:gray">
<br>

# **Usage**

## To use it import following in your Components and use it as it is being used

```ts
import { useSelector, useDispatch } from "react-redux";
import { incFunc, decFunc } from "./DirectoryOfActions" ;

const myState = useSelector((state) => state.changeNum)
const dispatch = useDispatch()

<button onClick={() => dispatch(incFunc())}> Increase </button>
<button onClick={() => dispatch(decFunc(5))}> Decrease </button>
```