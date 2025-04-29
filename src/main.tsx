import { createRoot } from "react-dom/client";
import App from "./App";
import { SessionProvider } from "./contexts/session";
import './index.css';

const rootElement = document.getElementById("root");

if (rootElement) {
  createRoot(rootElement).render(
    <SessionProvider>
      <App />
    </SessionProvider>
  );
}
