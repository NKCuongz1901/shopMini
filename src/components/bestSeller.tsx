import { Button } from "./ui/button"
import { CiHeart } from "react-icons/ci"
import { Rate } from "antd"
import { useEffect, useState } from "react"
import { getProductsApi } from "@/services/api"


function BestSeller() {
    const [productData, setProductData] = useState([]);
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await getProductsApi();
                setProductData(res.slice(0, 5));
            } catch (error) {
                console.log("Cant fetch all product");
            }

        }
        fetchProduct();
    }, [])

    return (
        <div className="px-10 py-5">
            <h3 className="text-2xl font-medium text-left w-full">Best Seller</h3>
            <div className="grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 flex-col items-center gap-6 pb-14 w-full mt-6">
                {productData.map((item, index) => {
                    return (
                        <div className="flex flex-col items-start cursor-pointer max-w-[200px]" key={index}>
                            <div className="cursor-pointer group relative bg-gray-500/10 rounded-lg w-full h-52 flex items-center justify-center">
                                <img src={item.image} alt="" className="group-hover:scale-105 transition object-cover w-4/5 h-4/5 md:w-40 md:h-40 " width={500} height={500} />
                                <Button className="absolute rounded-full bg-white top-2 right-2 ">
                                    <CiHeart />
                                </Button>
                            </div>
                            <p className="font-medium pt-2 truncate text-xl">{item.productName}</p>
                            <p className="text-xs text-gray-500/70 truncate max-w-[150px]">{item.description}</p>

                            <div className="text-yellow-200 text-[10px] scale-75 text-left mt-0.5">
                                <Rate value={5} disabled />
                            </div>
                            <div className="flex items-start justify-between w-full mt-2 ">
                                <p className="text-base font-medium"> {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}</p>
                                <Button className=" max-sm:hidden px-4 py-1 text-gray-500 border border-gray-500/20 rounded-full text-xs hover:bg-slate-50 transition">Buy now</Button>
                            </div>
                        </div>
                    );
                })

                }



            </div>
        </div>
    )
}

export default BestSeller