---
title: What is fresh and stale in TypeScript
author: Daniel Hashmi
date: 11/29/2024
slug: Structural-Typing-in-Typescript
image: typescript-icon.svg
desc: This is commonly a confusing topic in typescript that i tried to cover and make things a little bit clear, This short blog explains the difference between fresh and stale in typescript...
---


> # 1. ( Object literal are fresh object's ) 
### These objects cannot be assigned to another object with extra properties or misspelled properties 


```typescript
let a = { name: 'Tom' }
a = { name: 'Daniel', age: 19 } // <--( Fresh Literal Object ) Error! extra age does not exist in ( Object a )
```

> # 2. ( Object's derived from a class are also fresh objects )
### but can be assigned to another object with extra properties or misspelled properties 

```ts
class A {
    name: string = 'Tom';
}
class B {
    name: string = 'Daniel';
    age: number = 19;
}

let objA = new A() 

objA = new B() // <--( Fresh Class Derived Object ) No Error! extra age can be assigned if all required properties are available but cannot be accessed directly, using conditions will be needed! ( instanceof )
```

> # 3. ( Stale objects are object that are assigned to a variable )
### These objects can be assigned to an object with extra properties or misspelled properties

```ts
let obj1 = { name: 'Tom' };
let obj2 = { name: 'Tom', age: 17 };

obj1 = obj2 // <--( Stale Object ) No Error! extra age can be assigned if all required properties are available but cannot  be accessed directly but still there other ways to access age property ( as  or <> ) <-- Type Casting etc...
```
# Differences between Fresh and Stale
```ts
 { name: 'Tom', age: 17 } // <-- Fresh Object ( Object Literal )
```
```ts
new A() // <-- Fresh Object ( Class Derived Object )
```
## vs

```ts
let obj2 = { name: 'Tom', age: 17 }
//   ^
//   ^-- Stale Object
```
```ts
let obj3 = obj2  // <-- Stale Object ) 
```

> #### Attention! Variable Difference

