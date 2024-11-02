import React from "react"
import CategoryList from "../components/Category/CategoryList"
import BannerProduct from "../defaultpages/BannerProduct"
import HorizontalCardProduct from "../components/Sub_components/HorizontalCardProduct"
import VerticalCardProduct from "../components/Sub_components/VerticalCardProduct"

const Home = () => {
    return (
        <div>
            <CategoryList />
            <BannerProduct />

            <HorizontalCardProduct Category={"airpods"} Heading={"Airpod"} />
            <HorizontalCardProduct Category={"televisions"} Heading={"TV"} />

            <VerticalCardProduct Category={"camera"} Heading={"Camera"} />
            <VerticalCardProduct Category={"earphones"} Heading={"Earphones"} />
            <VerticalCardProduct Category={"moblies"} Heading={"Moblies"} />
            <VerticalCardProduct Category={"mouse"} Heading={"Mouse"} />
            <VerticalCardProduct Category={"printers"} Heading={"Printers"} />
            <VerticalCardProduct Category={"processor"} Heading={"Processor"} />
            <VerticalCardProduct Category={"refrigerator"} Heading={"Refrigerator"} />
            <VerticalCardProduct Category={"speakers"} Heading={"Speakers"} />
            <VerticalCardProduct Category={"watches"} Heading={"Watches"} />
        </div>
    )
}

export default Home
