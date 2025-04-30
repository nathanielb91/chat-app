# Brandlive Code Challenge

## Description

Create a React project that is a chat room.

Leverage Redux or Context API, and use our `code-challenge.brandlive-dev.com` socket.io server, and scss to make it pretty.

## Get Started

Write the codes under the sections with comment `// TODO: Your code here...`

## Requirements

1. User lands on page and enters name
2. Name is stored in local storage
3. User can enter chat messages and see chat messages from other people using app
4. Store chat history in local storage so that if user refreshes, messages will reappear.
5. Local storage can expire after 1 hour.

## Socket.io Example

```typescript
import { Manager } from "socket.io-client";

const manager = new Manager("https://code-challenge.brandlive-dev.com", {
  transports: ["websocket"],
  multiplex: true,
});

const socket = manager.socket("/my-code-challenge-namespace");

socket.on("connect", () => {
  console.log("Connected to server");

  socket.on("message", (data) => {
    console.log("Received message:", data);
  });

  socket.emit("message", { Hello: "world!" });
});
```

# 💬 Real-Time Chat App – Brandlive Code Challenge

This project is a sleek, modern real-time chat app built with **React**, **Socket.IO**, and **SCSS**, with global state management via **React Context + useReducer**. It allows users to join a public chat room, send and receive messages in real time, and retain message history for up to one hour.

---

## 🧠 Reasoning & Approach

My goal was to build a clean, responsive user experience while following the outlined requirements. I chose **React Context** instead of Redux to keep the global state simple and lightweight — perfect for the scale of this app. I also made sure to:

- Centralize session state and socket logic in one context (`session.tsx`)
- Persist chat and username in localStorage with an expiration mechanism
- Build clear, reusable components (`Username`, `Chat`, `Message`, `MessageInput`)
- Add thoughtful UI/UX polish with SCSS animations, styled chat bubbles, and input validation

---

## ✂️ Shortcuts & Tradeoffs

- No user authentication (by design for this exercise), so all usernames are client-trusted
- No server-side filtering or rate-limiting for messages
- Assumes single-room use (i.e. global chat) — namespaces could be extended for multi-room support
- Chat messages stored locally are not synced if user clears storage or switches devices

---

## ⚙️ Setup Instructions

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

## Running Unit Tests

This project uses **Jest** and **React Testing Library**

```bash
npm test
```
