import { useState } from 'react'
import { useAuthContext } from '../context/AuthContext'
import toast from 'react-hot-toast';

function useVerifyOtp() {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const verifyOtp = async (otp: string, { id }: { id: string }) => {

        setLoading(true);

        try {
            const res = await fetch("/api/auth/verifyOTP", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, otp }),
                credentials: 'include'
            });

            const data = await res.json();
            console.log(data);


            if (!res.ok) {
                throw new Error(data);
            }

            if (data) {
                localStorage.setItem("user", JSON.stringify(data));
                setAuthUser(data);
                toast.success("User signed up")
            }
        } catch (error: any) {
            console.log("Error is from catch");
            toast.error(error.message)
        } finally {
            setLoading(false);
        }
    };

    return { loading, verifyOtp };
};

export default useVerifyOtp;