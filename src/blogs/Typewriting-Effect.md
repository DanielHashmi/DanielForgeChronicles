---
title: Typewriter Effect Setup
author: Daniel Hashmi
date: 11/30/2024
slug: Typewriting-Effect
image: typewritereffect.png
desc: This is a simple and step by step guide to integrate typewriter-effect in your project, With this you can get an effect of typing on your specific element that you want...
---


## Installation

```ts
npm i typewriter-effect 
```

Import It
```ts
import Typewriter from 'typewriter-effect';
```

## Use It Like This

```ts
<h1>
  <Typewriter options={{ ...TypingEffectOptions, strings: ["Hello","World"] }} />
</h1>
```
###  // Output one by one if its an array of strings else show only one string

## Options
```ts
    const TypingEffectOptions: TypingType = {
        strings: [""],
        autoStart: startHover,
        loop: true,
        delay: 0,
        deleteSpeed: 0,
        pauseFor: 3000,
    }
```