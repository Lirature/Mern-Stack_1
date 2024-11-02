import React, { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import productCategory from "../../helpers/productCategory"
import SummaryAPI from "../../common"
import SearchResultPage from "../Products/SearchResultPage"

const CategoryProduct = () => {
    const [data, setData] = useState([])
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const location = useLocation()
    const urlSearch = new URLSearchParams(location.search)
    const urlCategoryListinArray = urlSearch.getAll("Category")

    const urlCategoryListObject = {}
    urlCategoryListinArray.forEach((el) => {
        urlCategoryListObject[el] = true
    })

    const [selectCategory, setSelectCategory] = useState(urlCategoryListObject)
    const [filterCategoryList, setFilterCategoryList] = useState([])

    const [sortBy, setSortBy] = useState("")

    const fetchData = async () => {
        
        const response = await fetch(SummaryAPI.FilterProducts.url, {
            method: SummaryAPI.FilterProducts.method,
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                Category: filterCategoryList,
            }),
        })
        
        const dataResponse = await response.json()
        setData(dataResponse?.data || [])
    }

    const handleSelectCategory = (e) => {
        const {  value, checked } = e.target

        setSelectCategory((preve) => {
            return {
                ...preve,
                [value]: checked,
            }
        })
    }

    useEffect(() => {
        fetchData()
    }, [filterCategoryList])

    useEffect(() => {
        const arrayOfCategory = Object.keys(selectCategory)
            .map((categoryKeyName) => {
                if (selectCategory[categoryKeyName]) {
                    return categoryKeyName
                }
                return null
            })
            .filter((el) => el)

        setFilterCategoryList(arrayOfCategory)

        //format for url change when change on the checkbox
        const urlFormat = arrayOfCategory.map((el, index) => {
            if (arrayOfCategory.length - 1 === index) {
                return `Category=${el}`
            }
            return `Category=${el}&&`
        })

        navigate("/product-category?" + urlFormat.join(""))
    }, [selectCategory])

    const handleOnChangeSortBy = (e) => {
        const { value } = e.target

        setSortBy(value)

        if (value === "asc") {
            setData((preve) => preve.sort((a, b) => a.Sellingprice - b.Sellingprice))
        }

        if (value === "dsc") {
            setData((preve) => preve.sort((a, b) => b.Sellingprice - a.Sellingprice))
        }
    }

    useEffect(() => {}, [sortBy])

    return (
        <div className="container mx-auto p-4">
            {/***desktop version */}
            <div className="hidden lg:grid grid-cols-[200px,1fr]">
                {/***left side */}
                <div className="bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-scroll ">
                    {/**sort by */}
                    <div className="">
                        <h3 className="text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300">Sort by</h3>
                        <form className="text-sm flex flex-col gap-2 py-2">
                            <div className="flex items-center gap-3">
                                <input
                                    type="radio"
                                    name="sortBy"
                                    checked={sortBy === "asc"}
                                    onChange={handleOnChangeSortBy}
                                    value={"asc"}
                                />
                                <label>Giá - Từ Thấp Đến Cao</label>
                            </div>

                            <div className="flex items-center gap-3">
                                <input
                                    type="radio"
                                    name="sortBy"
                                    checked={sortBy === "dsc"}
                                    onChange={handleOnChangeSortBy}
                                    value={"dsc"}
                                />
                                <label>Giá - Từ Cao Đến Thấp</label>
                            </div>
                        </form>
                    </div>
                    <div className="">
                        <h3 className="text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300">
                            Category
                        </h3>

                        <form className="text-sm flex flex-col gap-2 py-2 ">
                            {productCategory.map((CategoryName, index) => {
                                return (
                                    <div className="flex items-center gap-3" key={index}>
                                        <input
                                            type="checkbox"
                                            name={"Category"}
                                            checked={selectCategory[CategoryName?.value]}
                                            value={CategoryName?.value}
                                            id={CategoryName?.value}
                                            onChange={handleSelectCategory}
                                        />
                                        <label htmlFor={CategoryName?.value}>{CategoryName?.label}</label>
                                    </div>
                                )
                            })}
                        </form>
                    </div>
                </div>
                {/***right side */}
                <div className="px-4">
                    <p className="font-medium text-slate-800 text-lg my-2">Kết Quả Lọc : {data.length}</p>
                    <div className="min-h-[calc(100vh-120px)] overflow-y-scroll scrollbar-none max-h-[calc(100vh-120px)]">
                        {data.length !== 0 &&  <SearchResultPage data={data} loading={loading} />}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CategoryProduct
