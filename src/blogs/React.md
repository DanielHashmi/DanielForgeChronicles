---
title: React
author: Daniel Hashmi
date: 11/30/2024
slug: React
image: react.png
desc: This is a complete blog for react that has covered all the fundamental concepts and explained every thing in detailed, This can be an amazing resource if you are starting to learn react, has covered all from basic to advance and also included state management...
---

# Why React?

- React gives us variables to put inside html instead of using DOM Manipulation.

- We can use state variables which means that once we update the state variable, it will be updated across everywhere it is being used.

- We can split our app into multiple components and reuse those components.

- React uses a virtual DOM to efficiently update the UI which is better than updating content using DOM Manipulation

- Debugging and maintainance is easy



# React Installation Using Vite

```ts
npm create vite@latest
```

```ts
cd "Project Name"
```

```ts
npm install
```

```ts
npm run dev
```
### Now you can create your app inside src/app.jsx.



## Your src/App.jsx react simple boilerplate code should looks like this when starting to create a new app
```ts
function App() {

  return (
    <>

    </>
  )
}

export default App
```
## Your src/index.css should be empty to avoid defualt styling


## The code rafce generates a simple boilerplate code for react

```ts
import React from 'react'

const Navbar = () => {
  return (
    <div>Navbar</div>
  )
}

export default Navbar
```

## You have to type everything inside these blocks inside return block
```ts
return {

  <>
    your code here...
  </>

}
```
## You can create components of codes, For Example: you created a NavBar 
```ts
src/components/Navbar.jsx
```

## Now you can import it in your App.jsx and use it multiple times
```ts
import Navbar from "./component/Navbar"


function App() {

  return (
    <>
      <Navbar />
      <Navbar />

    </>
  )
}

export default App
```

## You can pass values to Navbar.jsx file, For Example: hold="" logo=""
```ts
import Navbar from "./component/Navbar"


function App() {

  return (
    <>
      <Navbar hold="Enter Your Name" logo="DH" />
      <Navbar hold="Search Something" logo="Daniel" />

    </>
  )
}

export default App
```

## Now you can get values in a variables in the Navbar function in Navbar.jsx file, For Example: props
```ts
import React from 'react'

const Navbar = (props) => {
    return (
        <nav className='main'>
            <div className='logo'>DH</div>
            <div className='inpSec'>
                <input type="text" placeholder="Search" />
            </div>
        </nav>
    )
}

export default Navbar
```

## Now you can use them everywhere you want, For Example: {props.hold} {props.logo}

```ts
import React from 'react'
import "./Navbar.css"
const Navbar = (props) => {
    return (
        <nav className='main'>
            <div className='logo'>{props.logo}</div>
            <div className='inpSec'>
                <input type="text" placeholder={props.hold} />
            </div>
        </nav>
    )
}

export default Navbar
```

### To style you can create a CSS file inside components folder, For Example src/components/Navbar.css

Now you add styling in the css file

### You have to import css file in your component file, For Example: The styling is for the Navbar you have to import it in the Navbar file

```ts
import "./Navbar.css"
```
The styling will be applied automatically 

## You can use inline css using {{...inline css here...}}

```ts
style={{ color: "red" }}
```
You should use inline css in your component For Example: src/components/Navbar.jsx

```ts
import React from 'react'
import "./Navbar.css"
const Navbar = (props) => {
    return (
        <nav className='main'>
         <div style={{ color: "red" }} className='logo'>{props.logo}
        </div>
        </nav>
    )
}

export default Navbar
```


# Conditional Rendering In React

### We use conditional rendering when we want to do something based on a condition For Example: If we want to display a button when variable bool is true else show a text Hello!

#### We do it like this
```ts
const [bool,setBool] = useState(true)
{bool ? <button>Click Me</button> : <h1>Hello</h1>}
```
#### We do this when we want to use if else statements

## If we just want to use if statement like if the bool is true show the button else do nothing

### We do it like this

```ts
const [bool,setBool] = useState(true)
{bool && <button>Click Me</button>}
```


# Rendering Multiple Components Using Map

## Sometimes we want to render many components in one place so we need loops

This is how we do it with Map method

```ts
import { useState } from "react"

function App() {
  const [todos, setTodos] = useState([
    {
      title: "hello #1",
      id: "123"
    },
    {
      title: "hello #2",
      id: "456"
    },
    {
      title: "hello #3",
      id: "789"
    }
  ])

  function Todo({ props }) {
    return <>
      <h1>{props.title}</h1>
      <h1>{props.id}</h1>
    </>
  }
  return (
    <>
      {todos.map((todo) => {
        return <Todo props={todo} />
      })}
    </>
  )
}

export default App
```

#### But we need to add a unique key to each component so we do it like this
```ts
import { useState } from "react"

function App() {
  const [todos, setTodos] = useState([
    {
      title: "hello #1",
      id: "123"
    },
    {
      title: "hello #2",
      id: "456"
    },
    {
      title: "hello #3",
      id: "789"
    }
  ])

  function Todo({ props }) {
    return <>
      <h1>{props.title}</h1>
      <h1>{props.id}</h1>
    </>
  }
  return (
    <>
      {todos.map((todo) => {
        return <Todo key={todo.id} props={todo} />
      })}
    </>
  )
}

export default App
```
#### Remember we need a unique key in this example id is the key: key={todo.id}

# UseState Hook
## We use useState hook to avoid DOM Manipulation system
### To use useState we have to import it from react

```ts
import { useState } from "react"
```

## We can use it like this
```ts
 const [count, setCount] = useState(0)
 ```
 Remember to use it directly in the function not inside return block

```ts
function App() {

  const [count, setCount] = useState(0)

  return (
    <>
    </>
  )
}
```

## What this code means 

## const [count, setCount] = useState(0)

- ### const is a JavaScript variable
- ### count is the value
- ### setCount is a function that allows us to change the value
- ### = is the assignment operator
- ### useState is a function that returns two things
- #### the value
- #### and a method that has the ability to change the value
- ### 0 is the initial value that we can give as an argument

## The benefit of useState is For Example: We have a variable that has initial value 5 we printed it and the value was 5 now we update the value to 10 we already printed it but still it will print 5 because we didn't printed it again after updating it
```ts
let value = 5;
console.log(value) // Output 5
value = 5
console.log(value) // we have to print it again
```

## But in react hook useState if we update it ones it will be updated automatically everywhere it is being used
```ts
  const [count, setCount] = useState(5)
  console.log(count) // Output 5 after updating Output 10
  let a = count
  console.log(a) // Output 5 after updating Output 10

  setCount(() => count = 10) // as we update it the output will show the updated value
 ```
 Always remember to import useState from react


 # useEffect Hook

 ### What is useEffect: UseEffect is a function that is used when you want something to happen after a certain components renders, loads or changes

 ## This is a simple use case of useEffect 
 ```ts
  useEffect(() => {
    alert("Hello World")
  }, [])
```
The empty array is for a value
This code means! show alert when nothing changes because of empty array []
so it will show alert only one time when the page loads first time

## This code means! show alert when value changes
```ts
  useEffect(() => {
    alert("Hello World")
  }, [value])
```

## If we don't pass an empty array than it will show alert on every render

```ts
  useEffect(() => {
    alert("Hello World")
  })
```
This function will run on every render so because react re renders App function on every change so this function runs on every change

# Return in useEffect
## return in useEffect runs when a certain component unmounts

```ts
   useEffect(() => {
        return () => {
          alert("Component was unmounted") // Runs when the component is unmounted
        }
      },[])
```


## 19
# useRef Hook

### Why useRef: In react we have a problem that everything re renders when a state changes For Example: We create a button and when we click on it variable num increases by one but in react we can't do it directly because it will refresh it again to zero than it will be updated! again it will be zero...because react re renders everything

```ts
import { useState, useEffect } from "react"

function App() {
  const [count, setCount] = useState(0)
  let num = 0
  useEffect(() => {
    num = num + 1
    console.log(num) // Output 1 never changes
  })
  return (
    <>
      <button onClick={() => { setCount(count + 1) }}>Click Me</button>
    </>
  )
}

export default App

console.log(a)
```
This code never increase num one by one it remains 1 always


# That's why we use useRef
## This is how useRef code looks like
```ts
const num = useRef(0)
```
## Now we use this variable like this
```ts
num.current
```
This works fine
```ts
import { useState, useEffect, useRef } from "react"

function App() {
  const [count, setCount] = useState(0)
  let num = useRef(0)
  useEffect(() => {
    num.current = num.current + 1
    console.log(num.current)
  })
  return (
    <>
      <button onClick={() => { setCount(count + 1) }}>Click Me</button>
    </>
  )
}

export default App
```
## Now if we change the num variable react do not re render and useEffect will not be triggered still if we change something else react will re render everything except the num variable so the num variable persists and useEffect will be triggered

## We can also use useRef like this
```ts
let ref = useRef(0)

ref.current.style.backgroundColor = "red"

<button ref={ref}>Click Me</button> // The button will be red
```
### The full code looks likes this
```ts
import { useEffect, useRef } from "react"

function App() {

  let ref = useRef()
  
  useEffect(() => {
    ref.current.style.backgroundColor = "red"
  })
  return (
    <>
      <button ref={ref}>Click Me</button>
    </>
  )
}

export default App
```
We cannot use it without useEffect

# Difference betweent useRef, useState, Normal variable

- <b>Normal variable:</b> Normal variable will be re initialized when rerendering it means we can't update it because its value can't survive rerendering

- <b>useState:</b> useState survives rerendering and it will update the updated value automatically when a certain value changes

- <b>useRef:</b> useRef also survives rerendering but it cannot automatically update the values, it acts like a Normal variable in normal javascript


# useContext Hook

## We use useContext Hook to get access to our variable directly in our components 

## FIrst we will create a JavaScript file then we'll import and export createContext inside the javascript file
```ts
import { createContext } from 'react'
export const contextHook = createContext()
```

## Now we can use it in our App.jsx file we will simply import it inside our App and wrap our component like this
```ts
 <contextHook.Provider value={ count }>
   <Navbar />
 </contextHook.Provider>
```
### We can access the count variable inside the Navbar component and components it means we have the ease to access our variables directly inside our components without passing them through a hierarchy

## We can use the variables like this
```ts
import React, { useContext } from 'react'
import { contextHook } from './context'

const Navbar = () => {
    const newContext = useContext(contextHook)
    return (
        <nav>
            navbar{newContext.count}
        </nav>
    )
}

export default Navbar
```

### We can also pass multiple variables inside an object
```ts
 <contextHook.Provider value={{ count, count2 }}>
   <Navbar />
 </contextHook.Provider>
```
### And can use them like this

```ts
import React, { useContext } from 'react'
import { contextHook } from './context'

const Navbar = () => {
    const newContext = useContext(contextHook)
    return (
        <nav>
            navbar{newContext.count}
            navbar2{newContext.count2}
        </nav>
    )
}

export default Navbar
```


# useMemo Hook

## Why we use useMemo Hook
- Just because react rerenders whenever a State changes thats why we use useMemo Hook 
- If we are doing a huge computing in a function when a state changes react rerenders so the function starts computing again it means whenever a state changes the function starts from start again and again and our app becomes slow and hangy 
## What useMemo Hook does 
- It Memoizes/Saves the results by caching them to avoid redundant computations and return them when same input occurs again and again
so when react rerenders it does not computes again because its saved.

- It also has a dependency array to tell it when to compute when react renders For Example we can tell it that you should recompute when the computation changes

## We use it like this

### Import it

```ts
import { useMemo } from "react"
```

### To save the results in memory we use useMemo() Hook
```ts
const isMagicalNum = useMemo(() => numbers.find(item => item.isMagical === true), [numbers])
```
### Now it only recomputes when the array [numbers] changes otherwise it uses the previous results again and again

## This is an Example

```ts
import { useMemo, useState } from "react"
const nums = new Array(30_000_000).fill(0).map((_, i) => {
  return {
    index: i,
    isMagical: i === 29_000_000
  }
})

function App() {
  const [count, setCount] = useState(0)
  const [numbers, setNumbers] = useState(nums)
  const magical = useMemo(() => numbers.find(item => item.isMagical === true), [numbers])
  console.log("hello")
  return (
    <>
      <h1>The magical number is {magical.index} and count is {count}</h1>
      <button onClick={() => {
        setCount((count) => count + 1);
        if (count === 10) {
          setNumbers(new Array(30_000_000).fill(0).map((_, i) => {
            return {
              index: i,
              isMagical: i === 28_000_000
            }
          }))
        }
      }}>Click Me</button>
    </>
  )
}

export default App
```
# useCallback Hook

## useCallback Hook works same as useMemo Hook, the only defference is that the useMemo Hook Memoizes the results and the useCallback Memoizes the whole function itself and returns a Memoize version of that function

## We use it like this

### Import it

```ts
import { useCallback } from "react"
```

### To freaze a function in memory we use useCallback() Hook
```ts
const hello = useCallback(() => {
  return "hello"
}, [anything])
```
### Now it only recomputes when the array [anything] changes otherwise it uses the previous results again and again

## This is an Example

```ts
import Navbar from "./component/Navbar"
import { useCallback, useState } from "react"

function App() {
  const [count, setCount] = useState(0)
  const [adj, setAdj] = useState("good")
  console.log(count)
  const hello = useCallback(() => {
    return "hello"
  }, [])

  return (
    <>
      <Navbar adj={adj} hello={hello} />
      <button onClick={() => setCount(count + 1)}>Count</button>
    </>
  )
}

export default App
```


# useForm Hook

### useForm Hook is a package we have to install it then we can import it

## Why we use useForm Hook

### useForm Hook is a package that gives us predefined code for form handling
- It gives us predefined checks for usernames. passwords etc...

## Install It
```ts
npm i react-hook-form
```

## Import It
```ts
import { useForm } from "react-hook-form"
```
## Get the keys from the useForm Hook by calling it inside a variable like this

```ts
const {
  register,
  handleSubmit,
  setError,
  formState: { errors, isSubmitting },
} = useForm()
```
## Now we can use the keys in our form like this

## register Key
```ts
<input {...register("username", { required: { value: true, message: "This field is required" }, minLength: { value: 6, message: "Min Length is 6" }, maxLength: { value: 12, message: "Max Length is 12" } })} type="text" />
```
## handleSubmit
```ts
const onSubmit = (data) => console.log(data)
<form onSubmit={handleSubmit(onSubmit)}></form>
```
## setError
```ts
const onSubmit = (data) => setError("myForm", { message: "This user is not allowed" })

<form onSubmit={handleSubmit(onSubmit)}></form>

{errors.myForm && <div style={{ color: "red" }}>{errors.myForm.message}</div>}
```
## formState

```ts
{errors.username && <div style={{ color: "red" }}>{errors.username.message}</div>}

{isSubmitting && <div style={{ color: "white" }}>Submiting...</div>}


<input disabled={isSubmitting} type="submit" value="Submit" />
```

## A Form Example
```ts
import { useForm } from "react-hook-form"

function App() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm()

  const delay = (time) => {
    return new Promise((res, rej) => {
      setTimeout(() => {
        res()
      }, time * 1000);
    })
  }

  const onSubmit = async (data) => {
    await delay(2)
    if (data.username != "Daniel") {
      setError("myForm", { message: "This user is not allowed" })
    }
    console.log(data)
  }
  return (
    <>
      {isSubmitting && <div style={{ color: "white" }}>Submiting...</div>}
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <input placeholder="username" {...register("username", { required: { value: true, message: "This field is required" }, minLength: { value: 6, message: "Min Length is 6" }, maxLength: { value: 12, message: "Max Length is 12" } })} type="text" />
        {errors.username && <div style={{ color: "red" }}>{errors.username.message}</div>}
        <br />
        <input placeholder="password" {...register("password", { required: { value: true, message: "This field is required" }, minLength: { value: 6, message: "Min Length is 6" }, maxLength: { value: 12, message: "Max Length is 12" } })} type="password" />
        {errors.password && <div style={{ color: "red" }}>{errors.password.message}</div>}
        <br />
        <input disabled={isSubmitting} type="submit" value="Submit" />
        {errors.myForm && <div style={{ color: "red" }}>{errors.myForm.message}</div>}
      </form >
    </>
  )
}

export default App
```

# To submit form data to an Express App we can do by following these steps

## Install cors, body-parser, express

## Express
```ts
npm i express@4
```

## Cors
```ts
npm i cors
```

## BodyParser
```ts
npm i body-parser
```

## Now create a server.js file and create a basic express app and import cors, bodyParser and use them like this

```ts
import express from "express"
const app = express()
const port = 3000
import cors from "cors"
import bodyParser from "body-parser"

app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('Hello hashir!')
})
app.post('/', (req, res) => {
    console.log(req.body)
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
```

## Now simply post the data in the onSubmit function in the URL using fetch
```ts
const onSubmit = async (data) => {
  let req = await fetch("http://localhost:3000/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) })
}
``` 
## The data in this onSubmit function is the data that you submit when submiting the form after filling the input boxes
## Because we are calling this function when we submit the form

```ts
<form onSubmit={handleSubmit(onSubmit)}></form>
```

# Event Handling In React

### We can simply handle events in react like this
```ts
function App() {


  return (
    <>
      <button onClick={ }></button>
      <button onMouseOver={ }></button>
    </>
  )
}

export default App
```
### We can get the javascript addEventListener e like this

```ts
function App() {
  function hello(e) {
    console.log(e.target)
  }

  return (
    <>
      <div onClick={hello}>
        <button >Hello</button>
      </div>
    </>
  )
}

export default App
```
### element.addEventListener((e)=>{})

## Inputs In React

### We handle inputs in react in a different way
```ts
import { useState } from "react"
function App() {
  const [form, setForm] = useState({ email: "mango111@gmail.com", phone: "45341111" })
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
    console.log(form)
  }
  return (
    <>
      <input type="text" name="email" value={form.email} onChange={handleChange} />

      <input type="text" name="phone" value={form.phone} onChange={handleChange} />
    </>
  )
}

export default App
```

#### This way we can handle multiple inputs in one handleChange function

## What the code means above

### This is an object
```ts
const [form, setForm] = useState({ email: "mango111@gmail.com", phone: "45341111" })
```
#### It contains two key value pairs: email, phone

### This is a function that sets the form objects keys values
```ts
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
    console.log(form)
  }
```
- E is the event of the element of which it is being listened
- e.target.name is the name attribute of the input
- e.target.value is the value attribute of the input

### These are the inputs
```ts
    <input type="text" name="email" value={form.email} onChange={handleChange} />

      <input type="text" name="phone" value={form.phone} onChange={handleChange} />
```
- It has a name and a value attribute
- It has a onChange event inside the event it has a function handleChange


# Routing In React

## We use routing to avoid reloading our page when changing pages

# Installation of React Router DOM

Install by running this code
```ts
npm i react-router-dom
```

## Now import createBrowserRouter, RouterProvider and Link from React Router DOM in your App
```ts
import { createBrowserRouter, RouterProvider, Link } from 'react-router-dom'
```
## Create a new router
```ts
const Router = createBrowserRouter()
```

## Now you can use it like this
#### We can go to the pages like this


```ts
function App() {
  const Router = createBrowserRouter([
    {
      path: '/',
      element:<> <Navbar /> <Home /> </>
    },
    {
      path: '/about',
      element:<> <Navbar /> <About /> </>
    },
    {
      path: '/contact',
      element:<> <Navbar /> <Contact /> </>
    }
  ])
  return (
    <>
      <RouterProvider router={Router} />
    </>
  )
}

export default App
```

### Now we need RouterProvider
#### To use RouterProvider we have to add it where ever we want to use our components

### For Example
```ts
function App() {
  const Router = createBrowserRouter([
    {
      path: '/',
      element:<> <Navbar /> <Home /> </>
    },
    {
      path: '/about',
      element:<> <Navbar /> <About /> </>
    },
    {
      path: '/contact',
      element:<> <Navbar /> <Contact /> </>
    }
  ])
  return (
    <>
      <RouterProvider router={Router} />
    </>
  )
}

export default App
```

## Now you can create a simple Navbar with buttons home, about, contact and we should use { Link } instead of a/anchor and { to } instead of href
### For Example

```ts
import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav>
            <Link to="/">Home</Link>

            <Link to="/about">About</Link>

            <Link to="/contact">Contact</Link>
        </nav>
    )
}

export default Navbar

```

## And create the components Home.jsx, About.jsx, Contact.jsx inside components to keep the example simple

#### Just create home and about like this

```ts
import React from 'react'

const Contact = () => {
  return (
    <div>Contact</div>
  )
}

export default Contact
```

## Now your App.jsx looks like this 

```ts
import { useState } from "react"
import Navbar from "./component/Navbar"
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from "./component/Home"
import About from "./component/About"
import Contact from "./component/Contact"


function App() {
  const Router = createBrowserRouter([
    {
      path: '/',
      element:<> <Navbar /> <Home /> </>
    },
    {
      path: '/about',
      element:<> <Navbar /> <About /> </>
    },
    {
      path: '/contact',
      element:<> <Navbar /> <Contact /> </>
    }
  ])
  return (
    <>
      <RouterProvider router={Router} />
    </>
  )
}

export default App
```

## You can click on the elements in your browser and see the results

## Now your pages will change without reloading the pages with the help of <b>react-router-dom</b>


# We can also get Params from the browser using useParams

```ts
import { useParams } from 'react-router-dom'
```

## Create a component
```ts
import React from 'react'
import { useParams } from 'react-router-dom'
const User = () => {
  const params = useParams()
  return (
    <div>Username is {params.username}</div>
  )
}

export default User
```
## Add :/colons before the variable, For Example /:username

```ts
import Navbar from "./component/Navbar"
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import User from "./component/User"


function App() {
  const Router = createBrowserRouter([
    {
      path: '/user/:username',
      element: <> <Navbar /> <User /> </>
    }
  ])
  return (
    <>
      <RouterProvider router={Router} />
    </>
  )
}

export default App
```

## Now if you type anything after / it will be displayed
#### if i type following in the browser
```ts
/daniel
```
## Output
```ts
Username is daniel
```

## We can add patterns in our links like when ever we click on the link its background color should change

## Todo that instead of using { Link } we use { NavLink }

```ts
import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav>
            <NavLink className={(e => e.isActive ? "blue" : "")} to="/">Home</NavLink>

            <NavLink className={(e => e.isActive ? "blue" : "")} to="/about">About</NavLink>

            <NavLink className={(e => e.isActive ? "blue" : "")} to="/contact">Contact</NavLink>
        </nav>
    )
}

export default Navbar
```
### And then we can give it a class like this
## Remember! we have to define the class

# Redux In React

## We use redux in big project where we want to use our states, functions etc... to our components directly easily

## FIrst Install It
```ts
npm install @reduxjs/toolkit react-redux
```

## Now create a redux folder and create a store.js file in it. Now create a redux store in it

```ts
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
    reducer: {}
})
```
## Now we have to give access our App.jsx to this store, To do it we just need to import Store, Provider and wrap our App with the Provider
```ts
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'


import { store } from './redux/store.js'
import { Provider } from "react-redux"

ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>

    <Provider store={store}>
      <App />
    </Provider>

  </React.StrictMode>

)
```

## To store variables, functions etc... to our store we have to create slices.

# Slices
- Slice is just a state in which we can store data the difference is that it can be used in any of our component without passing it as a prop

## In this example we created a counterSlice it is just a state that has 3 functions through which we can manipulate the state, The initial value of the state is 0
```ts
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: 0,
}

export const counterS1ice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1
        },
        decrement: (state) => {
            state.value -= 1
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload
        },

    },
})

export const { increment, decrement, incrementByAmount } = counterS1ice.actions
export default counterS1ice.reducer
```


## To increase the value of this state we use dispatch like this, Before everything we have to import them and assign them in variables

## Importing
```ts
import { useSelector, useDispatch } from 'react-redux'

import { increment, decrement, incrementByAmount } from './redux/counter/counterSlice'
```
## Assigning
```ts
const count = useSelector((state) => state.counter.value)

const dispatch = useDispatch()
```

## Usage
### Whenever we click on this button the state increases by one
```ts
<button onClick={() => { dispatch(increment()) }}>+</button>
```

### Same with decrement and incrementByAmount
```ts
<button onClick={() => { dispatch(decrement()) }}>-</button>
<button onClick={() => { dispatch(incrementByAmount(2)) }}>+</button>
```
