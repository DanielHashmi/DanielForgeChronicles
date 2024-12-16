---
title: How to setup Tailwind CSS
author: Daniel Hashmi
date: 11/30/2024
slug: Tailwind-CSS-Setup
image: tailwind-css.png
desc: This is TailwindCss setup, this will guide you how to setup tailwindcss in you project, very easily and well explained step by step tutorial.
---

## Step 1: Run the following commands.
```tsx
npm install -D tailwindcss
npx tailwindcss init
```

<br>
<br>


## Step 2: Update tailwind.config.js file to include this line Below.
```tsx
content: ["*.html"],
```

<br>
<br>


## Step 3: Create src/input.css to include the code Below.
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

<br>
<br>


## Step 4: Link src/output.css file in your HTML file.
```tsx
<link rel="stylesheet" href="src/output.css">
```

<br>
<br>


## Step 5: Run the following command in the terminal.
```tsx
npx tailwindcss -i ./src/input.css -o ./src/output.css --watch
```

<br>
<br>

## Step 6 Optional: You can make the command above short by adding following line in package.json file in "scripts" json objec, and now build is the command.
```tsx
"build":"npx tailwindcss -i ./src/input.css -o ./src/output.css --watch"
```

<br>
<br>

## Step 7 Optional: Now run the following command.
```tsx
npm run build
```
<br>
<br>

## Step 8 Be Conscious!: to replace the src/ to your specfic folder this is just an exemple src is replaced with style.
```tsx
"build":"npx tailwindcss -i ./style/input.css -o ./style/output.css --watch"
```