import Hero from "@/components/hero"
import { Link } from "react-router"
import img1 from "@/assets/img/p_img1.png"
const products = [
    {
        img: img1,
        name: "T-shirt",
        price: 450000
    },
    {
        img: img1,
        name: "T-shirt",
        price: 450000
    },
    {
        img: img1,
        name: "T-shirt",
        price: 450000
    },
    {
        img: img1,
        name: "T-shirt",
        price: 450000
    },
    {
        img: img1,
        name: "T-shirt",
        price: 450000
    }, {
        img: img1,
        name: "T-shirt",
        price: 450000
    }, {
        img: img1,
        name: "T-shirt",
        price: 450000
    }, {
        img: img1,
        name: "T-shirt",
        price: 450000
    },

]
function Homepage() {
    return (
        <>
            <Hero />
            <div className="px-10 my-10">
                <div className="flex items-center justify-center ">
                    <div className="flex items-center gap-2">
                        <p className="font-medium text-2xl md:text-3xl ">LATEST COLLECTION</p>
                        <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
                    </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-6 gap-4 my-10">
                    {/* <Link to={'/'}>
                        <div className="overflow-hidden">
                            <img src={img1} alt="" className="hover:scale-100 transition ease-in-out" />
                        </div>
                        <p className="pt-3 pb-1 test-sm"></p>
                        <p className="test-sm font-medium"></p>
                    </Link> */}
                    {products.map((product, index) => {
                        return (
                            <Link to={'/'} key={index} className="text-gray-500 cursor-pointer">
                                <div className="overflow-hidden">
                                    <img src={product.img} alt="" className="hover:scale-110 transition ease-in-out" />
                                </div>
                                <p className="pt-3 pb-1 text-sm">{product.name}</p>
                                <p className="text-sm">{product.price}VND</p>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default Homepage