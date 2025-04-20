import { Toaster } from "@/components/ui/sonner";
import { registerApi } from "@/services/api";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
type Inputs = {
    name: string;
    email: string;
    password: string;
};
function RegisterPage() {
    const navigate = useNavigate();
    const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = async (values) => {
        const res = await registerApi(values.email, values.name, values.password);
        if (res.success === true) {
            localStorage.setItem("register_email", values.email);
            toast.success("Register Successful");
            await sleep(1500);
            navigate('/verify');
        } else {
            toast.error("Email is already existing");
        }
    };
    return (
        <div className="w-full min-h-screen grid bg-gradient-to-r from-gray-300 to-gray-100">
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
                            {...register("name", { required: "Full name is required" })}
                        />
                        {errors.name && (
                            <span className="text-red-500 text-sm">
                                {errors.name.message}
                            </span>
                        )}
                    </div>
                    <div className="flex flex-col gap-2">
                        <label>Email</label>
                        <input
                            type="email"
                            className="text-black border border-black/20 rounded-lg p-1 shadow-sm"
                            {...register("email", { required: "Email is required", maxLength: 30 })}
                        />
                        {errors.email && (
                            <span className="text-red-500 text-sm">
                                {errors.email.message}
                            </span>
                        )}
                    </div>
                    <div className="flex flex-col gap-2">
                        <label>Password</label>
                        <input
                            type="password"
                            className="text-black border border-black/20 rounded-lg p-1 shadow-sm"
                            {...register("password", { required: "Password is required" })}
                        />
                        {errors.password && (
                            <span className="text-red-500 text-sm">
                                {errors.password.message}
                            </span>
                        )}
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
                <Toaster position="top-center" richColors />
            </div>
        </div>


    )
}

export default RegisterPage