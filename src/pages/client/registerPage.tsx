import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from "react-router";
type Inputs = {
    name: string;
    email: string;
    password: string;
};
function RegisterPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        console.log("data", data);
    };
    return (
        <div className="w-full min-h-screen grid bg-orange-300/20">
            <div className="m-auto w-[400px]">
                <h1 className="w-full font-bold text-4xl mb-5 text-center uppercase">
                    Hey There 👋
                </h1>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="border p-16 bg-white/30 rounded-lg shadow-md"
                >
                    <h1 className="text-center font-semibold text-3xl mb-5">Sign Up</h1>
                    {/* <div className="flex gap-5">
                        <GoogleLogin />
                        <GithubLogin />
                    </div> */}
                    <div className="flex flex-col gap-2">
                        <label>Full Name</label>
                        <input
                            type="text"
                            className="text-black border border-black/20 rounded-lg p-1 shadow-sm"
                            {...register("name")}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label>Email</label>
                        <input
                            type="email"
                            className="text-black border border-black/20 rounded-lg p-1 shadow-sm"
                            {...register("email")}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label>Password</label>
                        <input
                            type="password"
                            className="text-black border border-black/20 rounded-lg p-1 shadow-sm"
                            {...register("password")}
                        />
                    </div>
                    <input
                        type="submit"
                        className="w-full cursor-pointer bg-green-300/50 rounded-md p-1 hover:shadow-md mt-5 font-bold text-lg"
                    />
                    <div className="mt-5">
                        <span className="cursor-default">
                            If you still have account
                        </span>
                        <Link
                            className="bg-blue-200 p-1 rounded-lg font-bold"
                            to={"/login"}
                        >
                            Login Now
                        </Link>
                    </div>
                </form>
            </div>
        </div>


    )
}

export default RegisterPage