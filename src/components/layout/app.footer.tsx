import logo from "@/assets/img/logo.png"

function AppFooter() {
    return (
        <div className="w-full mx-auto p-20">
            <div className="flex flex-col  sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
                <div>
                    <img src={logo} alt="" className="mb-5 w-32" />
                    <p className="w-full md:w-2/3 text-gray-600">
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi vitae temporibus explicabo quaerat eveniet error sint, alias earum, sit ut quis? Id consequuntur repellat necessitatibus dolores magnam molestias aspernatur? Asperiores!
                    </p>
                </div>
                <div>
                    <p className="text-xl font-medium mb-5">COMPANY</p>
                    <ul className="flex flex-col gap-1 text-gray-600">
                        <li>home</li>
                        <li>about us</li>
                        <li>delivery</li>
                        <li>Privacy policy</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default AppFooter