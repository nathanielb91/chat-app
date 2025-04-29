import { createContext, useEffect, useReducer } from "react";
import { Manager, Socket } from "socket.io-client";
import {
  getLocalStorage,
  setLocalStorage
} from "../lib/storage";


type ChatMessage = {
  sender: string;
  text: string;
  timestamp: number;
};

type SessionState = {
  username: string | null;
  messages: ChatMessage[];
  socket: Socket | null;
};

type Action =
  | { type: "SET_USERNAME"; payload: string }
  | { type: "ADD_MESSAGE"; payload: ChatMessage }
  | { type: "SET_SOCKET"; payload: Socket };

const initialState: SessionState = {
  username: null,
  messages: [],
  socket: null,
};

function sessionReducer(state: SessionState, action: Action): SessionState {
  switch (action.type) {
    case "SET_USERNAME": {
      setLocalStorage("username", action.payload);
      return { ...state, username: action.payload };
    }
    case "ADD_MESSAGE": {
      const updatedMessages = [...state.messages, action.payload];
      setLocalStorage("chat-messages", updatedMessages);
      setLocalStorage("chat-messages-timestamp", Date.now());
      
      return { ...state, messages: updatedMessages };
    }
    case "SET_SOCKET": {
      return { ...state, socket: action.payload };
    }
    default: {
      return state;
    }
  }
}


export const SessionContext = createContext<{
  state: SessionState;
  dispatch: React.Dispatch<Action>;
}>({ state: initialState, dispatch: () => null });

export const SessionProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(sessionReducer, initialState);

  useEffect(() => {
    const storedUsername = getLocalStorage<string>("username");
    if (storedUsername) {
      dispatch({ type: "SET_USERNAME", payload: storedUsername });
    }

    const storedMessages = getLocalStorage<ChatMessage[]>("chat-messages");
    const timestamp = getLocalStorage<number>("chat-messages-timestamp");    
    const isExpired = timestamp && Date.now() - timestamp > 1000 * 60 * 60;

    if (!isExpired && storedMessages) {
      const isValid = Array.isArray(storedMessages) &&
        storedMessages.every((m) => m.text && m.sender && m.timestamp);
      if (isValid) {
        storedMessages.forEach((msg) =>
          dispatch({ type: "ADD_MESSAGE", payload: msg })
        );
      }
    }
    

    const manager = new Manager("https://code-challenge.brandlive-dev.com", {
      transports: ["websocket"],
      multiplex: true,
    });
    const socket = manager.socket("/my-code-challenge-namespace");

    socket.on("connect", () => {
      console.log("Connected to server");
    });

    socket.on("message", (data) => {
      if (typeof data === "string") {
        const sender = data.split(":")[0];
        const text = data.substring(data.indexOf(":") + 1).trim();
        dispatch({
          type: "ADD_MESSAGE",
          payload: { sender, text, timestamp: Date.now() },
        });
      }
    });

    dispatch({ type: "SET_SOCKET", payload: socket });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <SessionContext.Provider value={{ state, dispatch }}>
      {children}
    </SessionContext.Provider>
  );
};
