import React, { useCallback, useContext, useEffect } from "react"
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import SummaryAPI from "../../common"
import { FaStar } from "react-icons/fa"
import { FaStarHalf } from "react-icons/fa"
import displayVNDCurrency from "../../helpers/displayVNDCurrency"
import RecommendedProduct from "./RecommendedProduct"
import Context from "../../context"
import AddtoCart from "../../helpers/AddtoCart"

const ProductDetails = () => {
    // data original
    const [data, setdata] = useState({
        Productname: "",
        Brandname: "",
        Category: "",
        Productimage: [],
        Description: "",
        Price: "",
        Sellingprice: "",
    })
    //Fetch data and default loading
    const params = useParams()
    const [loading, setloading] = useState(false)
    const loadinglistImage = new Array(4).fill(null)

    async function FetchProductDetails() {
        setloading(true)
        const fetchdata = await fetch(SummaryAPI.ProductDetails.url, {
            method: SummaryAPI.ProductDetails.method,
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                ProductId: params?._id,
            }),
        })
        setloading(false)
        const response = await fetchdata.json()
        setdata(response?.data)
        setactiveImage(response?.data.Productimage[0])
    }

    useEffect(() => {
        FetchProductDetails()
    }, [params])

    // Image slide cursor

    const [activeImage, setactiveImage] = useState("")

    const ListProduct = (ImgURL) => {
        setactiveImage(ImgURL)
    }
    //Zoom image
    const [Zoomimage, setZoomimage] = useState(false)

    const [zoomImageCoordinate, setZoomImageCoordinate] = useState({
        x: 0,
        y: 0,
    })

    const HandleZoomImage = useCallback(
        (e) => {
            setZoomimage(true)
            const { left, top, height, width } = e.target.getBoundingClientRect()

            // console.log("Coordinates" ,left,top,height,width)
            const x = (e.clientX - left) / width
            const y = (e.clientY - top) / height

            setZoomImageCoordinate({
                x,
                y,
            })
        },
        [zoomImageCoordinate],
    )

    const HandleLeaveZoom = () => {
        setZoomimage(false)
    }
    //Add To Cart And Buy
    const { FetchUserInCart } = useContext(Context)
    const navigate = useNavigate()
    async function HandleAddtoCart (e,id) {
        await AddtoCart(e,id)
        FetchUserInCart()
    }

    async function HandleBuyProduct (e,id) {
        await AddtoCart(e,id)
        FetchUserInCart()
        navigate("/cart")
    }
    return (
        <div className="container mx-auto p-4">
            <div className="min-h-[200px] flex flex-col lg:flex-row gap-4">
                {/***product Image */}
                <div className="h-96 flex flex-col lg:flex-row-reverse gap-4">
                    <div className="h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 relative p-2">
                        <img
                            className="h-full w-full object-scale-down mix-blend-multiply"
                            src={activeImage}
                            alt=""
                            onMouseMove={HandleZoomImage}
                            onMouseLeave={HandleLeaveZoom}
                        />
                        {/* Zoom image */}
                        {Zoomimage && (
                            <div className=" lg:block absolute min-w-[500px] overflow-hidden min-h-[400px] bg-slate-200 p-1 -right-[510px] top-0">
                                <div
                                    className="w-full h-full min-h-[400px] min-w-[400px] mix-blend-multiply scale-[1] "
                                    style={{
                                        background: `url(${activeImage}) `,
                                        backgroundRepeat: "no-repeat",
                                        backgroundPosition: `${zoomImageCoordinate.x * 100}% ${zoomImageCoordinate.y * 100}% `,
                                    }}
                                ></div>
                            </div>
                        )}
                    </div>
                    {/* Loading Image List */}
                    {loading ? (
                        <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
                            {loadinglistImage?.map((_, index) => {
                                return <div className="h-20 w-20 bg-slate-200 rounded animate-pulse" key={"loadingImage" + index}></div>
                            })}
                        </div>
                    ) : (
                        <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
                            {data?.Productimage?.map((imgURL, index) => {
                                return (
                                    <div className="h-20 w-20 bg-slate-200 rounded p-1" key={index}>
                                        <img
                                            src={imgURL}
                                            className="w-full h-full object-scale-down mix-blend-multiply cursor-pointer"
                                            alt=""
                                            onMouseEnter={() => ListProduct(imgURL)}
                                            // onClick={() => ListProduct(imgURL)}
                                        />
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </div>
                {/* product details */}
                <div>
                    {loading ? (
                        <div className="grid gap-1 w-full">
                            {" "}
                            <p className="bg-slate-200 animate-pulse  h-6 lg:h-8 w-full rounded-full inline-block"></p>
                            <h2 className="text-2xl lg:text-4xl font-medium h-6 lg:h-8  bg-slate-200 animate-pulse w-full">{""}</h2>
                            <p className="capitalize text-slate-400 bg-slate-200 min-w-[100px] animate-pulse h-6 lg:h-8  w-full"></p>
                            <div className="text-red-600 bg-slate-200 h-6 lg:h-8  animate-pulse flex items-center gap-1 w-full"></div>
                            <div className="flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1 h-6 lg:h-8  animate-pulse w-full">
                                <p className="text-red-600 bg-slate-200 w-full"></p>
                                <p className="text-slate-400 line-through bg-slate-200 w-full"></p>
                            </div>
                            <div className="flex items-center gap-3 my-2 w-full">
                                <button className="h-6 lg:h-8  bg-slate-200 rounded animate-pulse w-full"></button>
                                <button className="h-6 lg:h-8  bg-slate-200 rounded animate-pulse w-full"></button>
                            </div>
                            <div className="w-full">
                                <p className="text-slate-600 font-medium my-1 h-6 lg:h-8   bg-slate-200 rounded animate-pulse w-full"></p>
                                <p className=" bg-slate-200 rounded animate-pulse h-10 lg:h-12  w-full"></p>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-1">
                            <p className="bg-red-200 text-red-600 px-2 rounded-full inline-block w-fit">{data?.Brandname}</p>
                            <h2 className="text-2xl lg:text-4xl font-medium">{data?.Productname}</h2>
                            <p className="capitalize text-slate-400">{data?.Category}</p>

                            <div className="text-red-600 flex items-center gap-1">
                                <FaStar />
                                <FaStar />
                                <FaStar />
                                <FaStar />
                                <FaStarHalf />
                            </div>

                            <div className="flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1">
                                <p className="text-red-600">{displayVNDCurrency(data.Sellingprice)}</p>
                                <p className="text-slate-400 line-through">{displayVNDCurrency(data.Price)}</p>
                            </div>

                            <div className="flex items-center gap-3 my-2">
                                <button
                                    className="border-2 border-red-600 rounded px-3 py-1 min-w-[120px] text-red-600 font-medium hover:bg-red-600 hover:text-white"
                                    onClick={(e) => HandleBuyProduct(e, data?._id)}
                                >
                                    Buy
                                </button>
                                <button
                                    className="border-2 border-red-600 rounded px-3 py-1 min-w-[120px] font-medium text-white bg-red-600 hover:text-red-600 hover:bg-white"
                                    onClick={(e) => HandleAddtoCart(e, data?._id)}
                                >
                                    Add To Cart
                                </button>
                            </div>

                            <div>
                                <p className="text-slate-600 font-medium my-1">Description : </p>
                                <p>{data?.Description}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {data.Category && <RecommendedProduct Category={data?.Category} Heading={"Sản Phẩm Tương Tự"} />}
        </div>
    )
}

export default ProductDetails
