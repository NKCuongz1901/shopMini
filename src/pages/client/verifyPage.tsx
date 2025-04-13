import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Toaster } from "@/components/ui/sonner";
import { verifyApi } from "@/services/api";
import { MailIcon } from "lucide-react"
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";


type Inputs = {
    code: string;
}

function VerifyPage() {
    const navigate = useNavigate();
    const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = async (values) => {
        const email = localStorage.getItem("register_email") as string;
        console.log(email)
        const res = await verifyApi(email, values.code);
        if (res.success === true) {
            localStorage.removeItem("register_email");
            toast.success(`${res.message}`);
            await sleep(1000);
            navigate("/login");
        } else {
            toast.error("Your code is invalid or incorrect");
        }

    };




    return (
        <div className="w-full min-h-screen grid bg-orange-300/20">
            <div className="m-auto w-full max-w-md px-4">
                <Card className="w-full">
                    <CardHeader className="space-y-1">
                        <div className="flex justify-center mb-2">
                            <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center">
                                <MailIcon className="h-6 w-6 text-orange-500" />
                            </div>
                        </div>
                        <CardTitle className="text-2xl text-center">Verify Your Account</CardTitle>
                        <CardDescription className="text-center">
                            We've sent a verification code to your email
                            <br />
                            <span className="font-medium"></span>
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <div className="flex flex-col gap-2">
                                <input
                                    type="text"
                                    className="text-black border border-black/20 rounded-lg p-1 shadow-sm"
                                    {...register("code", { required: "Code is required" })}
                                />
                                {errors.code && (
                                    <span className="text-red-500 text-sm">
                                        {errors.code.message}
                                    </span>
                                )}
                            </div>
                            <input
                                type="submit"
                                className="w-full cursor-pointer bg-green-300/50 rounded-md p-1 hover:shadow-md mt-5 font-bold text-lg"
                            />
                        </form>
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-4">
                        <div className="text-center text-sm">Didn't receive the code?</div>
                        <Button className="w-full cursor-pointer bg-green-300/50 rounded-md p-1 hover:shadow-md mt-2 font-bold text-lg">
                            Resend code
                        </Button>
                    </CardFooter>
                </Card>
                <Toaster position="top-center" richColors />
            </div>
        </div>
    )
}

export default VerifyPage