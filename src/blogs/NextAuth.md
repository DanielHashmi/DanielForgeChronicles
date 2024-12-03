---
title: NextAuth Working Integration Tutorial
author: Daniel Hashmi
date: 11/25/2024
slug: NextAuth
image: auth.png
desc: This is a complete guide for nextauth, In which you can authenticate you app using nextauth, this is a step by step tutorial and walk through you don't need to worry.
---


## 1. ***AuthOptions Page***

Full Code Snippet inside app/api/auth/[...nextauth]/authOptinos.ts
```typescript
import dbConnect from "@/database/connectDB";
import SignUpSchema from "@/database/schemas/signUpSchema";
import { Account, SessionOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from 'next-auth/providers/google'
import bcrypt from 'bcrypt'

interface jwtToken extends SessionOptions {
    jwt?: boolean;
}
export const authOption = {
    // ...Other providers e.g. Github or Google
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID ?? '',
            clientSecret: process.env.GOOGLE_SECRET ?? ''
        }),
        CredentialsProvider({
            credentials: {},
            async authorize(credentials) {
                const { email, pass } = credentials as { email: string; pass: string };
                await dbConnect()
                const User = await SignUpSchema.findOne({ 'email': { $eq: email } })
                const UserPassMatches = await bcrypt.compare(pass, User ? User.pass : "")

                if (!User || !User?.pass) {
                    throw new Error('User not found');
                }

                if (!UserPassMatches) {
                    throw new Error(`Incorrect password`);
                }

                return User;
            },
        }),
    ],
    session: {
        jwt: true,
        maxAge: 7 * 24 * 60 * 60
    } as jwtToken,
    secret: process.env.NEXT_AUTH_SECRET
};

```
## Brief Definition of the code above  

> **1. Imports and Dependencies:**

```typescript
import dbConnect from "@/database/connectDB";
import SignUpSchema from "@/database/schemas/signUpSchema";
import { Account, SessionOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from 'next-auth/providers/google';
import bcrypt from 'bcrypt';
```

* dbConnect: A function to establish a connection to the MongoDB database.

* SignUpSchema: Mongoose schema for user sign-up data.

* NextAuth.js Types (Account, SessionOptions, User): TypeScript interfaces for various NextAuth components.

* CredentialsProvider and GoogleProvider: Authentication providers from NextAuth.js for custom credentials and Google OAuth.

* bcrypt: Library for hashing and comparing passwords, ensuring secure password management.


> **2. Interface Definition:**

```typescript
interface jwtToken extends SessionOptions {
    jwt?: boolean;
}
```

* This TypeScript interface extends SessionOptions with an optional jwt property. It ensures that the session configuration can optionally include a JWT setting.

> **3. Authentication Configuration (authOption):**

```typescript
export const authOption = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID ?? '',
            clientSecret: process.env.GOOGLE_SECRET ?? ''
        }),
        CredentialsProvider({
            credentials: {},
            async authorize(credentials) {
                const { email, pass } = credentials as { email: string; pass: string };
                await dbConnect();
                const User = await SignUpSchema.findOne({ 'email': { $eq: email } });
                const UserPassMatches = await bcrypt.compare(pass, User ? User.pass : "");

                if (!User || !User?.pass) {
                    throw new Error('User not found');
                }

                if (!UserPassMatches) {
                    throw new Error(`Incorrect password`);
                }

                return User;
            },
        }),
    ],
    session: {
        jwt: true,
        maxAge: 7 * 24 * 60 * 60
    } as jwtToken,
    secret: process.env.NEXT_AUTH_SECRET
};

```

> ## Providers Array

The 'providers' array is where different authentication methods are configured. In this code, there are two providers:

### 1. GoogleProvider:

```typescript
GoogleProvider({
    clientId: process.env.GOOGLE_ID ?? '',
    clientSecret: process.env.GOOGLE_SECRET ?? ''
})
```
* **Purpose:** Integrates Google OAuth for authentication.

* **Object Keys:**
  * **clientId:** The Google Client ID from environment variables (process.env.GOOGLE_ID).

  * **clientSecret:** The Google Client Secret from environment variables (process.env.GOOGLE_SECRET).

* **Flow:**
  * When a user chooses to log in with Google, they are redirected to Google's OAuth page.

  * After successful authentication, Google redirects back to the application with an authentication token

### 2. CredentialsProvider:

```typescript
CredentialsProvider({
    credentials: {},
    async authorize(credentials) {
        const { email, pass } = credentials as { email: string; pass: string };
        await dbConnect();
        const User = await SignUpSchema.findOne({ 'email': { $eq: email } });
        const UserPassMatches = await bcrypt.compare(pass, User ? User.pass : "");

        if (!User || !User?.pass) {
            throw new Error('User not found');
        }

        if (!UserPassMatches) {
            throw new Error(`Incorrect password`);
        }

        return User;
    },
})

```

* **Purpose:** Provides custom authentication using email and password.

* **Object Keys:**
  * credentials: Object containing user credentials. In this case, it is an empty object {}, as the credentials are processed in the authorize function.

* **authorize Function:**
  * Extracts email and password from credentials.

  * Connects to the database using dbConnect.

  * Finds the user by email in the database (SignUpSchema.findOne).

  * Compares the provided password with the stored hashed password using bcrypt.
compare.

  * Throws an error if the user is not found or if the password does not match.
Returns the user object if authentication is successful.

> ## Session Configuration

```typescript
session: {
    jwt: true,
    maxAge: 7 * 24 * 60 * 60
} as jwtToken,
```

* **jwt:** Setting jwt: true indicates that sessions should be managed using JSON Web Tokens (JWT).
* **maxAge:** Sets the maximum age of the session in seconds (7 days in this case).

> ## Secret Configuration

```typescript
secret: process.env.NEXT_AUTH_SECRET
```
* **Purpose:** Provides a secret key for encrypting the session tokens. This key is obtained from environment variables (process.env.NEXT_AUTH_SECRET).

## 2. ***Route Page***

Full Code Snippet inside app/api/auth/[...nextauth]/route.ts

```typescript
import NextAuth from "next-auth/next";
import { authOption } from "./authOptions";

const handler = NextAuth(authOption);

export { handler as GET, handler as POST };
```

> ## 1. Importing NextAuth

```typescript
import NextAuth from "next-auth/next";
```

* **NextAuth:** This is a function from the next-auth library, specifically from the next-auth/next module. It is used to configure and handle authentication in a Next.js application.
* **Purpose:** NextAuth is the primary function used to create API routes for handling authentication. It initializes authentication handlers for Next.js API routes based on the provided configuration.

> ## 2. Importing Authentication Options

```typescript
import { authOption } from "./authOptions";
```

* **authOption:** This is an object containing the authentication configuration, imported from a module named authOptions. The authOption configuration typically includes details like providers, session settings, and other authentication-related options.
* **Purpose:** By importing authOption, you are applying a predefined set of authentication rules and configurations to the NextAuth function. This makes the NextAuth setup modular and maintainable.

> ## 3. Creating the Handler

```typescript
const handler = NextAuth(authOption);
```
* **handler:** This constant stores the result of calling NextAuth with the authOption configuration.
* **Purpose:** handler is a function that will handle requests to the authentication API routes. It processes authentication requests based on the authOption configuration. This includes handling user sign-ins, sign-outs, and session management.

> ## 4. Exporting the Handler

```typescript
export { handler as GET, handler as POST };
```
* **handler as GET and handler as POST:** These exports configure the API route to handle both **GET** and **POST** HTTP methods. By doing this, you make the handler function available for both types of HTTP requests:

  * **GET:** Used for requests that retrieve data. In the context of authentication, **GET** requests be used to fetch the current session or user information.
  * **POST:** Used for requests that modify data. This is commonly used for sign-in or sign-out requests in authentication flows.
  
### We import this SessionProvider in the layout and wrap our whole app with this component because SessionProvider runs on client side

```typescript
'use client'
import { SessionProvider } from "next-auth/react";

const AuthWrapper = ({ children }: any) => {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}

export default AuthWrapper
```

## This is a simplified version of authOption
```typescript
import CredentialsProvider from "next-auth/providers/credentials";

export const authOption = {
    providers: [
        CredentialsProvider({
            credentials: {},
            async authorize(credentials: any) {
                const { email, password } = credentials;
                console.log(email);
                console.log(password);

                return { email, password } as any;
            },
        }),
    ],
    session: {
        jwt: true,
        maxAge: 7 * 24 * 60 * 60
    },
}; 
```

