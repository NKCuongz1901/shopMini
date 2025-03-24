import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import heroImg1 from "@/assets/img/headphone.png";
import heroImg2 from "@/assets/img/macbook.png"
import heroImg3 from "@/assets/img/vr.png"
import { Button } from "./ui/button";



const heroData = [
    {
        id: 1,
        img: heroImg1,
        subtitle: "Beats Solo",
        title: "Wireless",
        title2: "HeadPhone",
        description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Expedita nobis, recusandae, quibusdam modi corrupti incidunt accusamus dolores aliquid maxime, laborum ad corporis! Minus amet eos hic deleniti rerum tempora consequuntur."
    },
    {
        id: 2,
        img: heroImg2,
        subtitle: "Beats Solo",
        title: "Branded",
        title2: "Laptops",
        description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Expedita nobis, recusandae, quibusdam modi corrupti incidunt accusamus dolores aliquid maxime, laborum ad corporis! Minus amet eos hic deleniti rerum tempora consequuntur."
    },
    {
        id: 3,
        img: heroImg3,
        subtitle: "Beats Solo",
        title: "Wireless",
        title2: "Virtual",
        description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Expedita nobis, recusandae, quibusdam modi corrupti incidunt accusamus dolores aliquid maxime, laborum ad corporis! Minus amet eos hic deleniti rerum tempora consequuntur."
    },

]


function Hero() {
    var settings = {
        arrows: false,
        dots: false,
        infinite: true,
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        cssEase: "ease-in-out"
    };
    return (
        <div className="px-10">
            <div className=" min-h-[550px] sm:min-h-[600px] overflow-hidden rounded-3xl bg-gradient-to-r from-gray-300/80 to-gray-100 ">
                <div className="px-10 pb-8 sm:pb-0">
                    <Slider {...settings}>
                        {heroData.map((data, index) => {
                            return (
                                <div key={index} className="">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 items-center justify-between">
                                        {/* text content section */}
                                        <div className="flex flex-col justify-center gap-4 text-center sm:text-left pt-12 sm:pt-0 order-2 sm:order-1 sm:pl-3 relative z-10 ">
                                            <h1 className="text-2xl sm:text-6xl lg:text-2xl font-bold ">{data.subtitle}</h1>
                                            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold ">{data.title}</h1>
                                            <h1 className="text-5xl uppercase text-white sm:text-[80px] md:text-[100px] xl:text-[150px] font-bold ">{data.title2}</h1>
                                            <div>
                                                <Button className="bg-brandRed text-white cursor-pointer hover:scale-105 duration-300 py-2 px-8 rounded-full relative z-10">Buy now</Button>
                                            </div>
                                        </div>
                                        {/* img content section */}
                                        <div className=" order-1 sm:order-2 ">
                                            <div className="relative z-10 my-0 sm:my-10">
                                                <img src={data.img} alt=""
                                                    className="h-[300px] w-[300px] sm:h-[450px] sm:w-[450px] sm:scale-105 lg:scale-110 object-contain mx-auto drop-shadow-[-8px_4px_6px_rgba(0,0,0,.4)] z-40 relative" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })

                        }
                    </Slider>
                </div>

            </div>
        </div>

    )
}

export default Hero