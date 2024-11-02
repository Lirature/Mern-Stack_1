import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import SummaryAPI from "../../common"

const CategoryList = () => {
    const [loading, setloading] = useState(false)
    const categoryLoading = new Array(10).fill(null)

    const [categoryProduct, setcategoryProduct] = useState([])

    async function productCategory() {
        setloading(true)
        const fetchdata = await fetch(SummaryAPI.categoryProduct.url)
        const responsedata = await fetchdata.json()
        setloading(false)
        setcategoryProduct(responsedata.data)
    }
    useEffect(() => {
        productCategory()
    }, [])

    return (
        <div className="container mx-auto p-4">
            <div className="flex items-center gap-4 justify-between overflow-scroll scrollbar-none">
                {loading
                    ? categoryLoading.map((_,index) => {
                          return (
                              <div
                                  className="h-16 w-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-slate-200 animate-pulse"
                                  key={"categoryLoading" + index}
                              ></div>
                          )
                      })
                    : categoryProduct.map((product,index) => {
                          return (
                              <Link
                                  to={"/product-category?Category=" + product?.Category}
                                  className="cursor-pointer"
                                  key={product?.Category}
                              >
                                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden p-4 bg-slate-200 flex items-center justify-center">
                                      <img
                                          src={product?.Productimage[0]}
                                          alt={product?.Category}
                                          className="h-full object-scale-down mix-blend-multiply hover:scale-125 transition-all"
                                      />
                                  </div>
                                  <p className="text-center  text-sm md:text-base capitalize">{product?.Category}</p>
                              </Link>
                          )
                      })}
            </div>
        </div>
    )
}

export default CategoryList
