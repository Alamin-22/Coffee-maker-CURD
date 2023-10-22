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
import { QueryClient, QueryClientProvider, } from '@tanstack/react-query';
import User2 from './COmponents/Users/User2.jsx';
const queryClient = new QueryClient()


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
      {
        path: "/user",
        element: <User></User>,
        loader: () => fetch("http://localhost:5000/user"),
      },
      {
        path: "/user2",
        element: <User2></User2>,
      },

    ]
  }
]);




ReactDOM.createRoot(document.getElementById('root')).render(


  <QueryClientProvider client={queryClient}>
    <React.StrictMode>
      <AuthProvider><RouterProvider router={router} /></AuthProvider>
    </React.StrictMode>,
  </QueryClientProvider>
)
