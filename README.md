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
	transports: ['websocket'],
	multiplex: true
});

const socket = manager.socket('/my-code-challenge-namespace');

socket.on('connect', () => {
	console.log('Connected to server');

	socket.on('message', (data) => {
		console.log('Received message:', data);
	});

	socket.emit('message', { Hello: 'world!' });
});
```
