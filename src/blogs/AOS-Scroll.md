---
title: AOS Scrolling Effect Setup
author: Daniel Hashmi
date: 11/29/2024
slug: AOS-Scroll
image: AOS.png
desc: This is a very simple and easy way to integrate a scroll sliding effect animation, In this guide you will setup AOS library in your project very straight forward.
---

## Installation

```typescript
npm install --save aos@next
npm i --save-dev @types/aos
```

## Import It
```typescript
import AOS from 'aos';
import 'aos/dist/aos.css';
```

## Initialize It
```typescript
  useEffect(() => {
    if (typeof window !== 'undefined') {
      AOS.init();
    }
  }, [])
```

## Use It Like This On Your Element
```typescript
<div data-aos="fade-left" data-aos-duration="1000" data-aos-offset="250">
</div>
```