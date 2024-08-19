import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { DAppProvider } from "@usedapp/core";
import { getDefaultProvider } from "ethers";

const SHIBARIUM_CHAIN_ID = 157;

const config = {
  readOnlyChainId: SHIBARIUM_CHAIN_ID,
  readOnlyUrls: {
    [SHIBARIUM_CHAIN_ID]: "https://puppynet.shibrpc.com",
  },
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <DAppProvider config={config}>
      <App />
    </DAppProvider>
  </StrictMode>
);
