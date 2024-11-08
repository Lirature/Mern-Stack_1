import React, { useContext, useEffect, useRef, useState } from "react"
import FetchCategoryProductHome from "../../helpers/FetchCategoryProductHome"
import displayVNDCurrency from "../../helpers/displayVNDCurrency"
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6"
import { Link } from "react-router-dom"
import AddtoCart from "../../helpers/AddtoCart"
import Context from "../../context"

const VerticalCardProduct = ({ Category, Heading }) => {
    const [data, setdata] = useState([])
    const LoadingList = new Array(10).fill(null)
    const [loading, setloading] = useState(false)

    const scrollElement = useRef()

    useEffect(() => {
        async function Fetchdata() {
            setloading(true)
            const CategoryProduct = await FetchCategoryProductHome(Category)
            setloading(false)
            // console.log("Vertical Product", CategoryProduct.data)
            setdata(CategoryProduct?.data)
        }
        Fetchdata()
    }, [Category])

    const scrollRight = () => {
        scrollElement.current.scrollLeft += 300
    }
    const scrollLeft = () => {
        scrollElement.current.scrollLeft -= 300
    }
    //Add To Cart
    const { FetchUserInCart } = useContext(Context)

    async function HandleAddtoCart (e,id) {
        await AddtoCart(e,id)
        FetchUserInCart()
    }
    return (
        <div className="container mx-auto px-2 my-6 relative">
            <h2 className="text-2xl font-semibold py-1">{Heading}</h2>

            <div
                className="flex py-3 px-2 items-center md:gap-6 gap-4 overflow-scroll scrollbar-none transition-all scroll-smooth"
                ref={scrollElement}
            >
                <button className="bg-white shadow-md z-10 rounded-full p-2 absolute left-4 text-lg hidden md:block" onClick={scrollLeft}>
                    <FaAngleLeft />
                </button>
                <button className="bg-white shadow-md z-10 rounded-full p-2 absolute right-4 text-lg hidden md:block" onClick={scrollRight}>
                    <FaAngleRight />
                </button>
                {loading
                    ? LoadingList.map((_, index) => {
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
                                  to={"product/" + product?._id}
                                  className="w-full min-w-[280px]  md:min-w-[320px] max-w-[280px] md:max-w-[320px] 
                                 bg-white rounded-lg shadow-Default "
                                  key={index}
                              >
                                  <div className="bg-slate-100  h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center">
                                      <img
                                          src={product.Productimage[0]}
                                          className="object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply"
                                          alt=""
                                      />
                                  </div>
                                  <div className="p-4 grid gap-3 ">
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
                                          Add to Cart
                                      </button>
                                  </div>
                              </Link>
                          )
                      })}
            </div>
        </div>
    )
}

export default VerticalCardProduct
