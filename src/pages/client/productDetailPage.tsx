import ProductDetailCard from "@/components/productDetailCard";
import { getProductByIdApi } from "@/services/api";
import { IProduct } from "@/types/global";
import { useEffect, useState } from "react";
import { useParams } from "react-router"
import { PacmanLoader } from "react-spinners";


function ProductDetailPage() {
    const {id} = useParams();
    const [currentProductData, setCurrentProductData] = useState<IProduct | null>(null);
    const [loading, setLoading] = useState(true);
   
    useEffect(() => {
        if(id){
            const fetchProductDetail = async () => {
                try {
                    const res = await getProductByIdApi(id);
                    if(res){
                        setCurrentProductData(res);
                    }
                } catch (error) {
                    console.log(error);
                }
                setLoading(false)
            }
            fetchProductDetail();
            
        }

    },[id])



  return (
   <>
    {!loading ?
        <ProductDetailCard
            currentProductData={currentProductData}
        />    
        :
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <PacmanLoader
                size={40}
                color="#36d6b4"
            />
        </div>
}
   </>
  )
}

export default ProductDetailPage