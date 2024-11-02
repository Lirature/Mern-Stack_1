import React from "react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import "../helpers/CustomSlick.css"

import image1 from "../assets/banner/img1_2.jpg"
import image2 from "../assets/banner/img2_2.webp"
import image3 from "../assets/banner/img3_3.webp"
import image4 from "../assets/banner/img4_4.webp"
import image5 from "../assets/banner/img5_5.webp"

import imageMobile1 from "../assets/banner/img1_mobiles.jpg"
import imageMobile2 from "../assets/banner/img2_mobiles.jpg"
import imageMobile3 from "../assets/banner/img3_mobiles.jpg"
import imageMobile4 from "../assets/banner/img4_1.jpg"
import imageMobile5 from "../assets/banner/img5.jpg"

const BannerProduct = () => {
    const desktopImage = [image1, image2, image3, image4, image5]
    const mobliesImage = [imageMobile1, imageMobile2, imageMobile3, imageMobile4, imageMobile5]

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
    }

    return (
        <div className="container mx-auto px-4 rounded ">
            <div className="container mx-auto rounded ">
                <div className="h-56 md:h-72 w-full bg-slate-200 relative ">
                    {/* DeskTop And Tablet */}
                    <div className="hidden md:flex h-full w-full ">
                        <Slider {...settings} className=" hidden md:flex h-full w-full ">
                            {desktopImage.map((imageURL, index) => {
                                return (
                                    <div className="w-full h-full min-w-full min-h-full transition-all" key={index}>
                                        <img src={imageURL} alt="" className=" hidden w-full h-56 md:h-72 " />
                                    </div>
                                )
                            })}
                        </Slider>
                    </div>
                    {/* Mobiles */}
                    <div className="md:hidden flex h-full w-full">
                        <Slider {...{ ...settings, arrows: false }} className=" flex md:hidden h-full w-full ">
                            {mobliesImage.map((imageURL, index) => {
                                return (
                                    <div className="w-full h-full min-w-full min-h-full transition-all" key={index}>
                                        <img src={imageURL} alt="" className=" hidden w-full h-56 md:h-72 " />
                                    </div>
                                )
                            })}
                        </Slider>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BannerProduct
