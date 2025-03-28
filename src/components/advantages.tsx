import { FaShippingFast } from "react-icons/fa";
import { CiCircleCheck } from "react-icons/ci";
import { RiSecurePaymentLine } from "react-icons/ri";
import { FaHeadphones } from "react-icons/fa";

const advantageData = [
    {
        title: "Free Shipping",
        description: "Free shipping on all order",
        icon: <FaShippingFast className="text-brandRed text-5xl" />
    },
    {
        title: "Save Money",
        description: "30 Days Money Back",
        icon: <CiCircleCheck className="text-brandRed text-5xl" />
    },
    {
        title: "Secure Payment",
        description: "All Payment Secure",
        icon: <RiSecurePaymentLine className="text-brandRed text-5xl" />
    },
    {
        title: "Online Support 24/7",
        description: "Free shipping on all order",
        icon: <FaHeadphones className="text-brandRed text-5xl" />
    },

]



function Advantages() {
    return (
        <div className="px-10 py-10">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
                {advantageData.map((data, index) => {
                    return (
                        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center" key={index}>
                            {data.icon}
                            <div>
                                <p className="lg:text-xl font-bold">{data.title}</p>
                                <p className="text-gray-400 text-sm">{data.description}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Advantages