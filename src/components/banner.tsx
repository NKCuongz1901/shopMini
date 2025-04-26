import imgBanner from "@/assets/img/headphone.png"
import { Button } from "./ui/button"

function Banner() {
    return (
        <div className="px-10 mt-5  ">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-brandRed text-white text-3xl rounded-3xl items-center ">
                <div data-aos="zoom-out" data-aos-duration="500" data-aos-once="false" className="p-6 sm:p-8">
                    <p className="text-sm">30% OFF</p>
                    <h1 className="uppercase text-4xl lg:text-7xl font-bold">FINE SMILE</h1>
                    <p className="text-sm">10 Jan to 28 Jan</p>
                </div>
                <div className="h-full flex items-center" data-aos="zoom-out" data-aos-duration="500" data-aos-once="false">
                    <img src={imgBanner} alt="" className="scale-125 w-[250px] md:w-[340px] mx-auto drop-shadow-[-10px_10px_12px_rgba(0,0,0,.6)] object-cover" />
                </div>
                <div className="p-6 sm:p-8 flex flex-col gap-4" data-aos="zoom-out" data-aos-duration="500" data-aos-once="false">
                    <p className="font-bold text-xl ">Air Solo Bass</p>
                    <p className="text-3xl sm:text-5xl font-bold ">Winter Sale</p>
                    <p className="text-sm tracking-wide leading-5 ">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque reiciendis</p>
                    <Button className="w-[100px] relative py-2 px-8 text-brandRed text-base font-bold  overflow-hidden bg-white rounded-full transition-all duration-400 ease-in-out shadow-md hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-red-500 before:to-red-300 before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0 cursor-pointer">Shop Now</Button>



                </div>
            </div>
        </div>
    )
}

export default Banner