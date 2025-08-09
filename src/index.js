import React from "react";
import ReactDOM from "react-dom/client";
import { Timeline } from "./pages";

function App() {
  return <Timeline />;
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
