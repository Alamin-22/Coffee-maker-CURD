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
import User from './COmponents/Users/User.jsx';



const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <App></App>,
        loader: () => fetch("https://coffee-server-ccv7ypnby-alamins-projects-a414811e.vercel.app/coffee")
      },
      {
        path: "/addcoffee",
        element: <AddCoffee></AddCoffee>,
      },
      {
        path: "/updateCoffee/:id",
        element: <UpdatedCoffee></UpdatedCoffee>,
        loader: ({ params }) => fetch(`https://coffee-server-ccv7ypnby-alamins-projects-a414811e.vercel.app/coffee/${params.id}`)
      },
      {
        path: "/login",
        element: <LOgin />
      },
      {
        path: "/register",
        element: <Register />
      },
      {
        path: "/user",
        element: <User></User>,
        loader: () => fetch("https://coffee-server-ccv7ypnby-alamins-projects-a414811e.vercel.app/user"),
      }

    ]
  }
]);




ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider><RouterProvider router={router} /></AuthProvider>
  </React.StrictMode>,
)
