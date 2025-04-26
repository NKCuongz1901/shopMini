import Advantages from "@/components/advantages"
import Banner from "@/components/banner"
import BestSeller from "@/components/bestSeller"
import Category from "@/components/category"
import Hero from "@/components/hero"

function Homepage() {
    return (
        <>
            <Hero />
            <Category />
            <Advantages />
            <Banner />
            <BestSeller />
        </>
    )
}

export default Homepage