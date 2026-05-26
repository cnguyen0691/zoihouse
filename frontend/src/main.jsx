import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";
import { router } from "./routes/router";
import "./styles/global.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);