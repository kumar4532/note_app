import GoogleAuthBtn from "@/components/GoogleAuthBtn"
import { Button } from "@/components/ui/button"
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
import useSignup from "@/hooks/useSignUp"
import { useState } from "react"
import { Link } from "react-router-dom"

const SignUp = () => {
    const { loading, signup } = useSignup();

    const [userInfo, setUserInfo] = useState({
        name: '',
        email: '',
        password: ''
    })

    const handleSubmit = async () => {
        await signup(userInfo)
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
                    </CardContent>
                    <CardFooter className="flex justify-center items-center">
                        <Button
                            className="w-full bg-blue-600"
                            type="submit"
                            onClick={handleSubmit}
                            disabled={loading}
                        >{loading ? <span className="animate-spin"></span> : 'Sign Up'}</Button>
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