import { useCurrentApp } from "@/components/context/app.context";
import { Toaster } from "@/components/ui/sonner";
import { loginApi } from "@/services/api";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
type Inputs = {
    email: string;
    password: string;
};
function LoginPage() {
    const navigate = useNavigate();
    const { setIsAuthenticate, setUser } = useCurrentApp();
    const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
    const {
        register,
        handleSubmit
    } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = async (values) => {

        const res = await loginApi(values.email, values.password);
        if (res.data) {
            toast.success("Login Successful");
            setIsAuthenticate(true);
            setUser(res.data.user);
            localStorage.setItem("access_token", res.data.tokens.access_token);
            localStorage.setItem("refresh_token", res.data.tokens.refresh_token);
            await sleep(1000);
            navigate("/");

        } else {
            toast.error("Email or password is incorrect")
        }

    };
    return (
        <div className="w-full min-h-screen grid bg-orange-300/20">
            <div className="m-auto">
                <h1 className="w-full font-bold text-4xl mb-5 text-center uppercase">
                    Hey There 👋
                </h1>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="border p-16 bg-white/30 rounded-lg shadow-md"
                >
                    <h1 className="text-center font-semibold text-3xl mb-5">Login Now</h1>
                    {/* <div className="flex gap-5">
                        <GoogleLogin />
                        <GithubLogin />
                    </div> */}
                    <div className="text-center font-bold text-lg mt-5">
                        or login with
                    </div>
                    <div className="flex flex-col gap-2">
                        <label>Email</label>
                        <input
                            type="email"
                            className="text-black border border-black/20 rounded-lg p-1 shadow-sm"
                            {...register("email", { required: true, maxLength: 30 })}
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
                    <div className="flex gap-2 mt-5">
                        <input type="checkbox" />
                        <label>Remember me</label>
                    </div>
                    <input
                        type="submit"
                        className="w-full cursor-pointer bg-green-300/50 rounded-md p-1 hover:shadow-md mt-5 font-bold text-lg"
                    />
                    <div className="mt-5">
                        <span className="cursor-default">
                            Dont have an account with us?
                        </span>
                        <Link
                            className="bg-blue-200 p-1 rounded-lg font-bold"
                            to={"/register"}
                        >
                            Register Now
                        </Link>
                    </div>
                </form>
                <Toaster position="top-center" richColors />
            </div>
        </div>


    )
}

export default LoginPage