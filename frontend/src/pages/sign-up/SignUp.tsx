import GoogleAuthBtn from "@/components/GoogleAuthBtn"
import { Button } from "@/components/ui/button"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import useSignup from "@/hooks/useSignup"
import { useState } from "react"
import { Link } from "react-router-dom"
import useVerifyOtp from "@/hooks/useVerifyOtp"

interface otpData {
    userId: string | undefined,
    otp: string,
    createAt: Date,
    expiresAt: Date
}

const SignUp = () => {
    const { signLoading, signup } = useSignup();
    const { loading, verifyOtp } = useVerifyOtp();
    const [otp, setOtp] = useState<string>("");
    const [otpData, setOtpData] = useState<otpData>();

    const [userInfo, setUserInfo] = useState({
        name: '',
        email: '',
        password: ''
    })

    const handleSubmit = async () => {
        setOtpData(await signup(userInfo));
    }

    console.log(otpData);
    

    const handleVerifyOTP = async () => {
        if (otpData?.userId) {
            await verifyOtp(otp, { id: otpData.userId });
        } else {
            console.error("OTP data or userId is missing.");
        }
    }

    return (
        <div className="flex flex-row py-2 justify-between lg:w-5/6 w-full h-screen overflow-hidden">
            <div className="lg:w-2/6 w-full m-auto h-full">
                <div className="flex flex-row gap-2 my-5">
                    <img
                        src='/icon.svg'
                        alt='icon'
                    />
                    <span className="text-xl font-semibold">HD</span>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Sign Up</CardTitle>
                        <CardDescription>Please sign up to create your account</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="space-y-1">
                            <Label>Name</Label>
                            <Input
                                value={userInfo.name}
                                onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                            />
                        </div>
                        <div className="space-y-1">
                            <Label>Email</Label>
                            <Input
                                value={userInfo.email}
                                onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                            />
                        </div>
                        <div className="space-y-1">
                            <Label>Password</Label>
                            <Input
                                value={userInfo.password}
                                onChange={(e) => setUserInfo({ ...userInfo, password: e.target.value })}
                            />
                        </div>
                        {
                            otpData && (
                                <div className="space-y-1">
                                    <Label>OTP</Label>
                                    <InputOTP
                                        value={otp}
                                        onChange={(value) => setOtp(value)}
                                        maxLength={4}
                                    >
                                        <InputOTPGroup>
                                            <InputOTPSlot index={0} />
                                            <InputOTPSlot index={1} />
                                            <InputOTPSlot index={2} />
                                            <InputOTPSlot index={3} />
                                        </InputOTPGroup>
                                    </InputOTP>
                                </div>
                            )
                        }
                    </CardContent>
                    <CardFooter className="flex justify-center items-center">
                        {
                            otpData ? (
                                <Button
                                    className={`w-full bg-blue-600 flex items-center justify-center ${loading ? 'cursor-not-allowed opacity-75' : ''}`}
                                    type="submit"
                                    onClick={handleVerifyOTP}
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <div className="h-5 w-5 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                                    ) : (
                                        'Verify OTP'
                                    )}
                                </Button>
                            ) : (
                                <Button
                                    className={`w-full bg-blue-600 flex items-center justify-center ${loading ? 'cursor-not-allowed opacity-75' : ''
                                        }`}
                                    type="submit"
                                    onClick={handleSubmit}
                                    disabled={signLoading}
                                >
                                    {signLoading ? (
                                        <div className="h-5 w-5 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                                    ) : (
                                        'Sign In'
                                    )}
                                </Button>
                            )
                        }
                    </CardFooter>
                </Card>

                <div className="relative flex items-center w-[95%] mx-auto mb-4">
                    <div className="flex-grow border-t border-gray-600 border-2"></div>
                    <span className="flex-shrink mx-4 text-gray-600 font-medium">OR</span>
                    <div className="flex-grow border-t border-gray-600 border-2"></div>
                </div>

                <div>
                    <GoogleAuthBtn />
                </div>

                <div className="flex flex-row justify-center gap-2 mt-6">
                    <span className="text-slate-400">Already have an account?</span>
                    <Link to='/sign-in' className="underline text-blue-700 hover:text-blue-500">Sign In</Link>
                </div>
            </div>

            <div className="hidden lg:block">
                <img
                    src='/container.png'
                    alt='container'
                    className="w-full h-full"
                />
            </div>
        </div>
    )
}

export default SignUp