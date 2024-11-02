import { createBrowserRouter } from "react-router-dom"

import App from "../App"
import Home from "../pages/Home"
import Login from "../pages/Login"
import ForgotPassword from "../components/Users/ForgotPassword"
import Signup from "../pages/Signup"
import AdminPanel from "../pages/AdminPanel"
import AllUser from "../components/Users/AllUser"
import AllProducts from "../components/Products/AllProducts"
import CategoryProduct from "../components/Category/CategoryProduct"
import ProductDetails from "../components/Products/ProductDetails"
import Cart from "../components/Cart/Cart"
import SearchProducts from "../components/Products/SearchProducts"

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "",
                element: <Home />,
            },
            {
                path: "sign-up",
                element: <Signup />,
            },
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "product-category", 
                element: <CategoryProduct />,
            },
            {
                path: "product/:_id", //:_id - sẽ được gán cho useParams().Đúng hơn là useParams() nhận :_id thành id
                element: <ProductDetails />,
            },
            {
                path: "forgot-password",
                element: <ForgotPassword />,
            },
            {
                path: "cart",
                element: <Cart />,
            },
            {
                path: "search",
                element: <SearchProducts />,
            },
            {
                path: "admin-panel",
                element: <AdminPanel />,
                children: [
                    {
                        path: "all-users",
                        element: <AllUser />,
                    },
                    {
                        path: "all-products",
                        element: <AllProducts />,
                    },
                ],
            },
        ],
    },
])
export default router
