import { useAuthContext } from "@/context/AuthContext"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

const Hero = () => {
    const { authUser } = useAuthContext();

    return (
        <Card className="border rounded-2xl lg:p-4 p-2">
            <CardHeader>
                <CardTitle>
                    Welcome, {authUser?.name} !
                </CardTitle>
            </CardHeader>
            <CardContent>
                <CardDescription>
                   <span>Email: </span> {authUser?.email}
                </CardDescription>
            </CardContent>
        </Card>
    )
}

export default Hero