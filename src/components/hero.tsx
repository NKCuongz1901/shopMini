import heroImg from "@/assets/img/hero_img.png"

function Hero() {
    return (
        <div className="px-10">
            <div className="flex flex-col sm:flex-row border border-gray-400 ">
                {/* Hero left */}
                <div className=" flex w-full sm:w-1/2 items-center justify-center py-10 sm:py-0">
                    <div className="text-[#414141]">
                        <div className="flex items-center gap-2">
                            <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
                            <p className="font-medium text-sm md:text-base">OUR BESTSELLERS</p>
                        </div>
                        <h1 className="text-3xl sm:py-3 lg:text-5xl leading-relaxed">Lasted Arrivals</h1>
                        <div className="flex items-center gap-2">
                            <p className="font-semibold text-sm md:text-base">Shop now</p>
                            <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
                        </div>
                    </div>
                </div>
                {/* Hero right */}
                <div className="w-full sm:w-1/2">
                    <img src={heroImg} alt="" className="w-full " />
                </div>
            </div>
        </div>

    )
}

export default Hero