import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Roots from "./assets/features/layouts/Roots.tsx";
import Home from "./routes/Home/Home.tsx";
import Product from "./routes/products/Product.tsx";
import Detail from "./routes/detail/Detail.tsx";

import Checkout from "./routes/Checkout.tsx";
import Login from "./routes/login/Login.tsx";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import { store } from "./assets/features/store/store.ts";
import NotFound from "./routes/NotFound.tsx";
import Register from "./routes/register/Register.tsx";
import Cart from "./routes/cart/Cart.tsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Roots></Roots>,
    errorElement: <div>some thing wrong !!!</div>,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "product",
        element: <Product />,
      },
      {
        path: "product/:type",
        element: <Product />,
      },
      {
        path: "detail/:id",
        element: <Detail />,
      },
      {
        path: "cart",
        element:<Cart/>
      },
      {
        path: "checkout",
        element: <Checkout />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
const client = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider>
      <QueryClientProvider client={client}>
        <Provider store={store}>
          <RouterProvider router={router}></RouterProvider>
        </Provider>
      </QueryClientProvider>
    </ChakraProvider>
  </React.StrictMode>
);
