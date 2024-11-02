import React, { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import displayVNDCurrency from "../../helpers/displayVNDCurrency"
import scrollTop from "../../helpers/scrollTop"
import FetchCategoryProductHome from "../../helpers/FetchCategoryProductHome"
import AddtoCart from "../../helpers/AddtoCart"
import Context from "../../context"

const RecommendedProduct = ({ Category, Heading }) => {
    const [data, setdata] = useState([])
    const [loading, setloading] = useState(false)
    const loadingList = new Array(11).fill(null)

    async function FetchProductDetails() {
        setloading(true)
        const response = await FetchCategoryProductHome(Category)
        setloading(false)
        // console.log("Recommended Product!", response.data)
        setdata(response.data)
    }
    useEffect(() => {
        FetchProductDetails()
    }, [])
    //Add To Cart And Buy
    const { FetchUserInCart } = useContext(Context)

    async function HandleAddtoCart(e, id) {
        await AddtoCart(e, id)
        FetchUserInCart()
    }
    return (
        <div className="container mx-auto px-4 my-6 relative">
            <h2 className="text-2xl font-semibold py-4">{Heading}</h2>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,320px))] justify-between md:gap-6 overflow-x-scroll scrollbar-none transition-all">
                {loading
                    ? loadingList.map((_, index) => {
                          return (
                              <div
                                  className="w-full min-w-[280px]  md:min-w-[320px] max-w-[280px] md:max-w-[320px]  bg-white rounded-sm shadow "
                                  key={index}
                              >
                                  <div className="bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center animate-pulse"></div>
                                  <div className="p-4 grid gap-3">
                                      <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black p-1 py-2 animate-pulse rounded-full bg-slate-200">
                                          {""}
                                      </h2>
                                      <p className="capitalize text-slate-500 p-1 animate-pulse rounded-full bg-slate-200  py-2"></p>
                                      <div className="flex gap-3">
                                          <p className="text-red-600 font-medium p-1 animate-pulse rounded-full bg-slate-200 w-full  py-2"></p>
                                          <p className="text-slate-500 line-through p-1 animate-pulse rounded-full bg-slate-200 w-full  py-2"></p>
                                      </div>
                                      <button className="text-sm  text-white px-3  rounded-full bg-slate-200  py-2 animate-pulse"></button>
                                  </div>
                              </div>
                          )
                      })
                    : data.map((product, index) => {
                          return (
                              <Link
                                  to={"/product/" + product?._id}
                                  className="w-full min-w-[280px]  md:min-w-[320px] max-w-[280px] md:max-w-[320px]  bg-white rounded-sm shadow "
                                  key={index}
                                  onClick={scrollTop}
                              >
                                  <div className="bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center">
                                      <img
                                          src={product.Productimage[0]}
                                          className="object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply"
                                          alt=""
                                      />
                                  </div>
                                  <div className="p-4 grid gap-3">
                                      <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black">
                                          {product?.Productname}
                                      </h2>
                                      <p className="capitalize text-slate-500">{product?.Category}</p>
                                      <div className="flex gap-3">
                                          <p className="text-red-600 font-medium">{displayVNDCurrency(product?.Sellingprice)}</p>
                                          <p className="text-slate-500 line-through">{displayVNDCurrency(product?.Price)}</p>
                                      </div>
                                      <button
                                          className="text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-0.5 rounded-full"
                                          onClick={(e) => HandleAddtoCart(e, product?._id)}
                                      >
                                          Add To Cart
                                      </button>
                                  </div>
                              </Link>
                          )
                      })}
            </div>
        </div>
    )
}

export default RecommendedProduct
