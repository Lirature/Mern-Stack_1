import React, { useContext, useEffect, useRef, useState } from "react"
import FetchCategoryProductHome from "../../helpers/FetchCategoryProductHome"
import displayVNDCurrency from "../../helpers/displayVNDCurrency"
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6"
import { Link } from "react-router-dom"
import AddtoCart from "../../helpers/AddtoCart"
import Context from "../../context"

const HorizontalCardProduct = ({ Category, Heading }) => {
    //Data and catch API
    const [data, setdata] = useState([])
    const LoadingList = new Array(10).fill(null)
    const [loading, setloading] = useState(false)

    const scrollElement = useRef()

    useEffect(() => {
        async function Fetchdata() {
            setloading(true)
            const CategoryProduct = await FetchCategoryProductHome(Category)
            setloading(false)
            // console.log("Horizontal Product", CategoryProduct.data)
            setdata(CategoryProduct?.data)
        }
        Fetchdata()
    }, [Category])
    //Action slide
    const scrollRight = () => {
        scrollElement.current.scrollLeft += 400
    }
    const scrollLeft = () => {
        scrollElement.current.scrollLeft -= 400
    }
    //Add To Cart
    const { FetchUserInCart } = useContext(Context)

    async function HandleAddtoCart(e, id) {
        await AddtoCart(e, id)
        FetchUserInCart()
    }

    return (
        <div className="container mx-auto px-2 my-6 relative">
            <h2 className="text-2xl font-semibold py-4">{Heading}</h2>

            <div
                className="flex py-3 px-2 items-center gap-4 md:gap-6 overflow-scroll scrollbar-none transition-all scroll-smooth"
                ref={scrollElement}
            >
                <button
                    className="bg-white shadow-md z-10 rounded-full p-2 absolute left-4 text-xl hidden md:block"
                    onClick={scrollLeft}
                >
                    <FaAngleLeft />
                </button>
                <button
                    className="bg-white shadow-md z-10 rounded-full p-2 absolute right-4 text-xl hidden md:block"
                    onClick={scrollRight}
                >
                    <FaAngleRight />
                </button>
                {loading
                    ? LoadingList.map((_, index) => {
                          return (
                              <div
                                  className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] 
                                    md:max-w-[320px] h-36 bg-white rounded-sm shadow flex"
                                  key={index}
                              >
                                  <div className="bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px] animate-pulse"></div>
                                  <div className="p-2 grid w-full gap-2">
                                      <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black bg-slate-200 animate-pulse p-1 rounded-full">
                                          {""}
                                      </h2>
                                      <p className="capitalize text-slate-500 p-1 bg-slate-200 animate-pulse rounded-full"></p>
                                      <div className="gap-2 flex flex-col">
                                          <p className="text-red-600 font-medium p-2 bg-slate-200 w-full animate-pulse rounded-full"></p>
                                          <p className="text-slate-500 line-through p-2 bg-slate-200 w-full animate-pulse rounded-full"></p>
                                      </div>
                                      <button className="text-sm  text-white p-2  rounded-full w-full bg-slate-200 animate-pulse"></button>
                                  </div>
                              </div>
                          )
                      })
                    : data.map((product, index) => {
                          return (
                              <Link
                                  to={"product/" + product?._id}
                                  className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-44 
                                   bg-white  hover:shadow-highlight shadow cursor-pointer flex"
                                  key={index}
                              >
                                  <div className="bg-slate-100  p-4  w-full md:max-w-[160px]">
                                      <img
                                          src={product.Productimage[0]}
                                          className="object-scale-down h-full hover:scale-125 transition-all mix-blend-multiply"
                                          alt=""
                                      />
                                  </div>
                                  <div className="p-4 grid h-full  w-full md:max-w-[160px] ">
                                      <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black">
                                          {product?.Productname}
                                      </h2>
                                      <p className="capitalize text-slate-500">{product?.Category}</p>
                                      <div className=" gap-1 flex flex-col">
                                          <p className="text-red-600 font-medium">{displayVNDCurrency(product?.Sellingprice)}</p>
                                          <p className="text-slate-500 line-through">{displayVNDCurrency(product?.Price)}</p>
                                      </div>
                                      <button
                                          className="text-sm bg-red-600 hover:bg-red-700 text-white  py-1 rounded-full"
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

export default HorizontalCardProduct
