import React, { useEffect, useState } from "react"
import "./App.css"
import { Outlet } from "react-router-dom"
import Header from "./default/Header"
import Footer from "./default/Footer"
import "react-toastify/dist/ReactToastify.css"
import { ToastContainer } from "react-toastify"
import SummaryAPI from "./common"
import Context from "./context"
import { useDispatch } from "react-redux"
import { setUsers } from "./store/userSlice"

const App = () => {
    const dispatch = useDispatch()

    const [ProductInCart, setProductInCart] = useState(0)

    async function FetchUserCurrent() {
        const dataResponse = await fetch(SummaryAPI.current_user.url, {
            method: SummaryAPI.current_user.method,
            credentials: "include",
        })
        const dataApi = await dataResponse.json()

        if (dataApi.success) {
            dispatch(setUsers(dataApi.data))
        }
    }

    async function FetchUserInCart() {
        const fetchdata = await fetch(SummaryAPI.QuantityInCart.url, {
            method: SummaryAPI.QuantityInCart.method,
            credentials: "include",
        })
        const response = await fetchdata.json()
        // console.log("Data API", response)
        setProductInCart(response?.data?.Count)
    }

    useEffect(() => {
        // user details
        FetchUserCurrent()
        // User Details Cart Product
        FetchUserInCart()
    })

    return (
        <>
            <Context.Provider
                value={{
                    FetchUserCurrent, // user detail fetch
                    ProductInCart, // current user add to cart product count,
                    FetchUserInCart,
                }}
            >
                <Header />
                <ToastContainer position="top-center" />
                <main className="min-h-[calc(100vh-120px)] pt-16">
                    <Outlet />
                </main>
                <Footer />
            </Context.Provider>
        </>
    )
}

export default App
