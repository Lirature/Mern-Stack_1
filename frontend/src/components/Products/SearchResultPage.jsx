import React, { useContext } from "react"
import Context from "../../context"
import AddtoCart from "../../helpers/AddtoCart"
import { Link } from "react-router-dom"
import scrollTop from "../../helpers/scrollTop"
import displayVNDCurrency from "../../helpers/displayVNDCurrency"

const SearchResultPage = ({ data, loading }) => {
    const loadingList = new Array(13).fill(null)
    const { FetchUserInCart } = useContext(Context)

    async function HandleAddtoCart(e, id) {
        await AddtoCart(e, id)
        FetchUserInCart()
    }
    return (
        <div className="grid py-2 grid-cols-[repeat(auto-fit,minmax(200px,220px))] justify-between md:gap-6 overflow-x-scroll scrollbar-none transition-all">
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
                              className="w-full min-w-[180px]  md:min-w-[220px] max-w-[280px] md:max-w-[320px]
                               min-h-[280px]   max-h-[500px]   bg-white rounded-sm border shadow "
                              key={index}
                              onClick={scrollTop}
                          >
                              <div className="bg-slate-200 h-48 p-4 min-w-[180px] md:min-w-[145px] flex justify-center items-center">
                                  <img
                                      src={product.Productimage[0]}
                                      className="object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply"
                                      alt=""
                                  />
                              </div>
                              <div className="p-4 grid gap-2">
                                  <p className="h-[2.8em]  font-medium text-ellipsis uppercase text-sm line-clamp-2 text-black">
                                      {product?.Productname}
                                  </p>

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
    )
}

export default SearchResultPage
