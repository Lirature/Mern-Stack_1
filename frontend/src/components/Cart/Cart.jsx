import React, { useContext, useEffect, useState } from "react"
import SummaryAPI from "../../common"
import { MdDelete } from "react-icons/md"

import Context from "../../context"
import displayVNDCurrency from "../../helpers/displayVNDCurrency"

const Cart = () => {
    const [data, setdata] = useState([])
    const [loading, setloading] = useState(false)
    const loadingCart = new Array(5).fill(null)
    const context = useContext(Context)

    async function ViewProductInCart() {
        const fetchdata = await fetch(SummaryAPI.ProductInCart.url, {
            method: SummaryAPI.ProductInCart.method,
            credentials: "include",
        })
        const response = await fetchdata.json()

        if (response.success) {
            setdata(response.data)
        }
        if (response.error) {
            setdata(response.message)
        }
    }

    const handleLoading = async () => {
        setloading(true)
        await ViewProductInCart()
        setloading(false)
    }

    useEffect(() => {
        handleLoading()
    }, [])

    async function IncreaseQty(id, qtty) {
        const fetchdata = await fetch(SummaryAPI.QuantityProductInCart.url, {
            method: SummaryAPI.QuantityProductInCart.method,
            credentials: "include",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                _id: id,
                quantity: qtty + 1,
            }),
        })
        const responseData = await fetchdata.json()

        if (responseData.success) {
            ViewProductInCart()
        }
    }

    async function DecreaseQty(id, qty) {
        if (qty >= 2) {
            const fetchdata = await fetch(SummaryAPI.QuantityProductInCart.url, {
                method: SummaryAPI.QuantityProductInCart.method,
                credentials: "include",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({
                    _id: id,
                    quantity: qty - 1,
                }),
            })
            const responseData = await fetchdata.json()

            if (responseData.success) {
                ViewProductInCart()
            }
        }
    }

    async function DeleteProduct(id) {
        const fetchdata = await fetch(SummaryAPI.DeleteProductInCart.url, {
            method: SummaryAPI.DeleteProductInCart.method,
            credentials:"include",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                _id: id,
            }),
        })
        const response = await fetchdata.json()
        if (response.success) {
            ViewProductInCart()
            context.FetchUserInCart()
        }
    }


    //ToTal
    const totalQty = data.reduce((previousValue, currentValue) => previousValue + currentValue.quantity, 0)
    const totalPrice = data.reduce((prev, curr) => prev + curr.quantity * curr?.ProductId?.Sellingprice, 0)
    // Update Product In Cart

    return (
        <div className="container mx-auto">
            <div className="text-center text-lg my-3">
                {data.length === 0 && !loading && <p className="bg-slate-100 py-5">Giỏ Hàng Trống</p>}
            </div>
            <div className="flex flex-col lg:flex-row gap-10 lg:justify-between p-4">
                {/* View Product In Cart  */}
                <div className="w-full max-w-3xl">
                    {loading
                        ? loadingCart?.map((el, index) => {
                              return (
                                  <div
                                      key={el + " Product In Cart Loading" + index}
                                      className="w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded"
                                  ></div>
                              )
                          })
                        : data?.map((product, index) => {
                              return (
                                  <div
                                      key={product?._id + "Add To Cart Loading"}
                                      className="w-full bg-white h-32 my-2 border border-slate-300  rounded grid grid-cols-[128px,1fr]"
                                  >
                                      <div className="w-32 h-32 bg-slate-200">
                                          <img
                                              src={product?.ProductId?.Productimage[0]}
                                              className="w-full h-full object-scale-down mix-blend-multiply"
                                              alt=""
                                          />
                                      </div>
                                      <div className="px-4 py-2 relative">
                                          {/**delete product */}
                                          <div
                                              className="absolute right-0 text-red-600 rounded-full p-2 hover:bg-red-600 hover:text-white cursor-pointer"
                                              onClick={() => DeleteProduct(product?._id)}
                                          >
                                              <MdDelete />
                                          </div>
                                          <h2 className="text-lg lg:text-xl text-ellipsis line-clamp-1">
                                              {product?.ProductId?.Productname}
                                          </h2>
                                          <p className="capitalize text-slate-500">{product?.ProductId.Category}</p>
                                          <div className="flex items-center justify-between">
                                              <p className="text-red-600 font-medium text-lg">
                                                  {displayVNDCurrency(product?.ProductId?.Sellingprice)}
                                              </p>
                                              <p className="text-slate-600 font-semibold text-lg">
                                                  {displayVNDCurrency(product?.ProductId?.Sellingprice * product?.quantity)}
                                              </p>
                                          </div>
                                          <div className="flex items-center gap-3 mt-1">
                                              {/* Update Product In Cart */}
                                              <button
                                                  className="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded "
                                                  onClick={() => DecreaseQty(product?._id, product?.quantity)}
                                              >
                                                  -
                                              </button>
                                              <span>{product?.quantity}</span>
                                              <button
                                                  className="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded "
                                                  onClick={() => IncreaseQty(product?._id, product?.quantity)}
                                              >
                                                  +
                                              </button>
                                          </div>
                                      </div>
                                  </div>
                              )
                          })}
                </div>
                {/* Total */}
                <div className="mt-5 lg:mt-0 w-full max-w-sm">
                    {loading ? (
                        <div className="h-36 bg-slate-200 border border-slate-300 animate-pulse"></div>
                    ) : (
                        <div className="h-36 bg-white">
                            <h2 className="text-white bg-red-600 px-4 py-1">Tổng Cộng</h2>
                            <div className="flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600">
                                <p>Số Lượng</p>
                                <p>{totalQty}</p>
                            </div>
                            <div className="flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600">
                                <p>Tổng Tiền</p>
                                <p>{displayVNDCurrency(totalPrice)}</p>
                            </div>
                            <button className="bg-blue-600 p-2 text-white w-full mt-2">Payment</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Cart
