# Real-Time Chat App – Brandlive Code Challenge

This project is a sleek, modern real-time chat app built with **React**, **Socket.IO**, and **SCSS**, with global state management via **React Context + useReducer**. It allows users to join a public chat room, send and receive messages in real time, and retain message history for up to one hour.

---

## Reasoning & Approach

My goal was to build a clean, responsive user experience while following the outlined requirements. I chose **React Context** instead of Redux to keep the global state simple and lightweight — perfect for the scale of this app. I also made sure to:

- Centralize session state and socket logic in one context (`session.tsx`)
- Persist chat and username in localStorage with an expiration mechanism
- Build clear, reusable components (`Username`, `Chat`, `Message`, `MessageInput`)
- Add thoughtful UI/UX polish with SCSS animations, styled chat bubbles, and input validation

---

## Shortcuts & Tradeoffs

- No user authentication (by design for this exercise), so all usernames are client-trusted
- No server-side filtering or rate-limiting for messages
- Assumes single-room use (i.e. global chat) — namespaces could be extended for multi-room support
- Chat messages stored locally are not synced if user clears storage or switches devices

---

## Setup Instructions

### 1. Install dependencies

```bash
npm install
```

### 2. Run the development server

```bash
npm run dev
```

### 3. Build for production

```bash
npm run build
```

---

## Running Unit Tests

This project uses **Jest** and **React Testing Library**

```bash
npm test
```

**Included test coverage:**

- Username component: input validation, error display, submit button logic
- MessageInput component: send behavior, input clearing
- validation.ts: regex utility for validating usernames

---

## Environment Variables

No .env file is needed. Socket config is hardcoded as:

```ts
Host: https://code-challenge.brandlive-dev.com
Namespace: /my-code-challenge-namespace
```

---

## UX Features & Extras

- Gradient background + entry animations
- Smart message styling with "own" vs "other" message bubbles
- Chat messages persist across reloads for 1 hour
- Input validation with animated error messages
- Mobile-responsive layout

---

## Scale & Security Thoughts (Looking ahead)

If this project were to grow or go into production, I'd focus on:

- **Scalability:** Replace the hardcoded single-room setup with dynamic rooms and user sessions, backed by a real-time database (like Firebase or Redis) for syncing messages across clients and devices.
- **Security:** Add server-side validation and rate limiting to prevent spam or abuse. On the client side, introduce authenticated sessions (JWT or OAuth) and sanitize user input to avoid injection or XSS attacks.
