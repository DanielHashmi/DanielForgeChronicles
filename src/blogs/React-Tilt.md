---
title: React Tilting Effect Setup
author: Daniel Hashmi
date: 11/29/2024
slug: react-tilt
image: react-tilt.png
desc: Learn how to easily integrate the React Tilt animation library into your project with this straightforward guide.
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