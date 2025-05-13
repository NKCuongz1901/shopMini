import categoryImg1 from "@/assets/img/earphone.png"
import categoryImg2 from "@/assets/img/watch.png"
import categoryImg3 from "@/assets/img/macbook.png"
import categoryImg4 from "@/assets/img/gaming.png"
import categoryImg5 from "@/assets/img/vr.png"
import categoryImg6 from "@/assets/img/speaker.png"
import { Button } from "./ui/button"
import { Link } from "react-router"
function Category() {
    return (
        <div className="px-10 py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* category card 1 */}
                <div className="hover:scale-110 transition duration-300 h-[320px] py-10 pl-5 bg-gradient-to-r from-black/90 to-black/70 text-white flex items-end relative rounded-3xl ">
                    <div className="mb-4">
                        <p className="mb-[2px] text-gray-400">Enjoy</p>
                        <p className="text-2xl font-semibold mb-[2px]">With</p>
                        <p className="text-4xl xl:text-5xl font-bold opacity-20 mb-2">EarPhone</p>
                        <Button className="bg-brandRed text-white cursor-pointer hover:scale-105 duration-300 py-2 px-8 rounded-full relative z-10">Browse</Button>
                    </div>
                    <img src={categoryImg1} alt="" className="w-[320px] absolute bottom-0" />
                </div>
                {/* category card 2 */}
                <div className="hover:scale-110 transition duration-300 h-[320px] py-10 pl-5 bg-gradient-to-r from-brandYellow to-brandYellow/70 text-white flex items-end relative rounded-3xl ">
                    <div className="mb-4">
                        <p className="mb-[2px] text-white">Enjoy</p>
                        <p className="text-2xl font-semibold mb-[2px]">With</p>
                        <p className="text-4xl xl:text-5xl font-bold opacity-40 mb-2">Smart Watch</p>
                        <Button className="bg-brandRed text-white cursor-pointer hover:scale-105 duration-300 py-2 px-8 rounded-full relative z-10">Browse</Button>
                    </div>
                    <img src={categoryImg2} alt="" className="w-[320px] absolute -right-4 lg:top-[-40px]" />
                </div>
                {/* Catgory card 3 */}
                <div className="hover:scale-110 transition duration-300 sm:col-span-2 h-[320px] py-10 pl-5 bg-gradient-to-r from-brandRed to-brandRed/60 flex items-end relative rounded-3xl ">
                    <div className="mb-4">
                        <p className="mb-[2px] text-white">Enjoy</p>
                        <p className="text-2xl text-white font-semibold mb-[2px]">With</p>
                        <p className="text-4xl  text-white xl:text-5xl font-bold opacity-40 mb-2">Laptop</p>
                        <Button className="bg-brandWhite text-brandRed cursor-pointer hover:scale-105 duration-300 py-2 px-8 rounded-full relative z-10">Browse</Button>
                    </div>
                    <img src={categoryImg3} alt="" className="w-[320px] absolute bottom-0 -right-3" />
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-10">
                <div className="hover:scale-110 transition duration-300 col-span-2 h-[320px] py-10 pl-5 bg-gradient-to-br from-gray-400/90 to-gray-100 rounded-3xl flex items-end relative">
                    <div className="mb-4">
                        <p className="mb-[2px] text-white">Enjoy</p>
                        <p className="text-2xl text-white font-semibold mb-[2px]">With</p>
                        <p className="text-4xl xl:text-5xl font-bold opacity-40 mb-3">Playstation 5</p>
                        <Button className="bg-brandRed text-white cursor-pointer hover:scale-105 duration-300 py-2 px-8 rounded-full relative z-10">
                            <Link to="/product">Browse</Link>
                        </Button>
                    </div>
                    <img src={categoryImg4} alt="" className="w=[320px] absolute -right-0 bottom-0" />
                </div>
                <div className="hover:scale-110 transition duration-300 h-[320px] py-10 pl-5 rounded-3xl bg-gradient-to-r from-brandGreen to-brandGreen/60 flex items-start relative text-white">
                    <div className="mb-4">
                        <p className="mb-[2px] text-white">Enjoy</p>
                        <p className="text-2xl text-white font-semibold mb-[2px]">With</p>
                        <p className="text-4xl xl:text-5xl font-bold opacity-40 mb-3">Virtual AR</p>
                        <Button className="bg-brandWhite text-brandRed cursor-pointer hover:scale-105 duration-300 py-2 px-8 rounded-full relative z-10">Browse</Button>
                    </div>
                    <img src={categoryImg5} alt="" className="w=[320px] absolute bottom-0 -right-7" />
                </div>
                <div className="hover:scale-110 transition duration-300 h-[320px] py-10 pl-5 rounded-3xl bg-gradient-to-r from-brandBlue to-brandBlue/60 flex items-start relative text-white">
                    <div className="mb-4">
                        <p className="mb-[2px] text-white">Enjoy</p>
                        <p className="text-2xl text-white font-semibold mb-[2px]">With</p>
                        <p className="text-4xl xl:text-5xl font-bold opacity-40 mb-3">Gadget</p>
                        <Button className="bg-brandWhite text-brandRed cursor-pointer hover:scale-105 duration-300 py-2 px-8 rounded-full relative z-10">Browse</Button>
                    </div>
                    <img src={categoryImg6} alt="" className="w-[220px] h-[220px] absolute bottom-0 right-0" />
                </div>
            </div>
        </div>
    )
}

export default Category