import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { toast } from "react-hot-toast";
import { gapi } from "gapi-script";
import { useAuthContext } from "@/context/AuthContext";

const GoogleAuthBtn = () => {
    const { setAuthUser } = useAuthContext();
    const [googleLoading, setGoogleLoading] = useState<boolean>(false);

    useEffect(() => {
        const start = () => {
            gapi.client.init({
                clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
                scope: "profile email",
            });
        };

        gapi.load("client:auth2", start);
    }, []);

    const handleGoogleLogin = async () => {
        try {
            setGoogleLoading(true);
            const auth = gapi.auth2.getAuthInstance();
            const user = await auth.signIn();

            const idToken = user.getAuthResponse().id_token;

            const res = await fetch("/api/auth/google", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ credential: idToken }),
                credentials: "include",
            });

            const data = await res.json();
            console.log(data);


            if (!res.ok) {
                throw new Error(data.message || "Google authentication failed");
            }

            if (data) {
                localStorage.setItem("user", JSON.stringify(data));
                setAuthUser(data);
                toast.success("User signed in")
            }
        } catch (error) {
            const errorMessage =
                error instanceof Error ? error.message : "Google authentication failed";
            toast.error(errorMessage);
        } finally {
            setGoogleLoading(false);
        }
    };

    return (
        <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2 p-2 border rounded-lg hover:bg-gray-50"
            onClick={handleGoogleLogin}
            disabled={googleLoading}
        >
            <img src="../google.svg" alt="Google" className="w-6 h-6" />
            <span>Continue with Google</span>
        </Button>
    );
};

export default GoogleAuthBtn;
