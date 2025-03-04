

function LoginPage() {
    return (
        <div>
            <form className="flex flex-col items-center w-[90%] sm:max-w-96 mx-auto mt-15 gap-4 text-gray-800">
                <div className="inline-flex items-center gap-2  mb-2  mt-10">
                    <p className=" prata-regular text-3xl">SIGN UP</p>
                    <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
                </div>
                <input className="w-full px-3 py-2 border border-gray-700" type="text" placeholder="name" required />
                <input className="w-full px-3 py-2 border border-gray-700" type="text" placeholder="Email" required />
                <input className="w-full px-3 py-2 border border-gray-700" type="text" placeholder="Password" required />
            </form>
        </div>
    )
}

export default LoginPage