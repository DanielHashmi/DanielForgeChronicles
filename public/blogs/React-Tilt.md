---
title: React Tilting Effect Setup
author: Daniel Hashmi
date: 11/29/2024
slug: React-Tilt
image: React-Tilt.png
desc: This is a very simple and easy way to integrate react tilting effect animation library, In this guide you will setup React Tilt library in your project very straight forward.
---

## Installation

```typescript
npm install react-tilt     
```

## Import It
```typescript
import { Tilt } from "react-tilt"
```
## Wrap Your Element With This

```typescript
<Tilt> Your Element </Tilt>
```
## Add Options Like This

```typescript
<Tilt options={{ max: 2, scale: 1.01, speed: 800, easing: "ease" }}>
   Your Element Here 👈...
</Tilt>
```