import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "./components/ui/toaster.jsx";
import TaskManagerContextProvider from "./context/index.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <TaskManagerContextProvider>
      <App />
      <Toaster />
    </TaskManagerContextProvider>
  </BrowserRouter>
);
