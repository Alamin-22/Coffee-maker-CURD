import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import AddCoffee from './COmponents/Addcoffee/AddCoffee.jsx';
import UpdatedCoffee from './COmponents/UpdateCoffee/UpdatedCoffee.jsx';
import LOgin from './COmponents/Login/SIngin/LOgin.jsx';
import Register from './COmponents/Login/Register/Register.jsx';
import AuthProvider from './Provider/AuthProvider.jsx';
import Main from './Layout/Main.jsx';



const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <App></App>,
        loader: () => fetch("http://localhost:5000/coffee")
      },
      {
        path: "/addcoffee",
        element: <AddCoffee></AddCoffee>,
      },
      {
        path: "/updateCoffee/:id",
        element: <UpdatedCoffee></UpdatedCoffee>,
        loader: ({ params }) => fetch(`http://localhost:5000/coffee/${params.id}`)
      },
      {
        path: "/login",
        element: <LOgin />
      },
      {
        path: "/register",
        element: <Register />
      },

    ]
  }
]);




ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider><RouterProvider router={router} /></AuthProvider>
  </React.StrictMode>,
)
