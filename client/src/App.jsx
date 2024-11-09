import { useState } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import axios from "axios";
import AuthProvider from "./context/authContext";

axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.withCredentials = true;

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world</div>,
  },
  {
    path: "/login/user",
    element: <Login role={"user"} />,
  },
  {
    path: "/register/user",
    element: <Register role={"user"} />,
  },
  {
    path: "/login/instructor",
    element: <Login role={"instructor"} />,
  },
  {
    path: "/register/instructor",
    element: <Register role={"instructor"} />,
  },
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
