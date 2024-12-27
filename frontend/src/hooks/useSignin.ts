import { useState } from 'react'
import { useAuthContext } from '../context/AuthContext'
import toast from 'react-hot-toast';

function useSignin() {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const signin = async ({ email, password }: { email: string, password: string }) => {
        const success = handleInputErrors({ email, password });
        if (!success) return;

        setLoading(true);

        try {
            const res = await fetch(`${import.meta.env.VITE_REACT_APP_BASEURI}/api/auth/sign-in`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
                credentials: 'include'
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data);
            }

            if (data) {
                localStorage.setItem("user", JSON.stringify(data));
                setAuthUser(data);
                toast.success("User signed in")
            }
        } catch (error: any) {
            console.log("Error is from catch");
            toast.error(error.message)
        } finally {
            setLoading(false);
        }
    };

    return { loading, signin };
};

export default useSignin;

function handleInputErrors({ email, password }: { email: string, password: string }) {

    if (!email || !password) {
        toast.error("Please fill all the feilds")
        return false;
    }

    return true
}