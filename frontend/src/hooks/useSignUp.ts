import { useState } from 'react'
import { useAuthContext } from '../context/AuthContext'
import toast from 'react-hot-toast';

function useSignup() {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const signup = async ({ name, email, password }: { name: string, email: string, password: string }) => {
        const success = handleInputErrors({ name, email, password });
        if (!success) return;

        setLoading(true);

        try {
            const res = await fetch("/api/auth/sign-up", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data);
                toast.success("User signed up")
            }

            if (data) {
                localStorage.setItem("user", JSON.stringify(data));
                setAuthUser(data);
            }

        } catch (error: any) {
            console.log("Error is from catch");
            toast.error(error.message)
        } finally {
            setLoading(false);
        }
    };

    return { loading, signup };
};

export default useSignup;

function handleInputErrors({ name, email, password }: { name: string, email: string, password: string }) {

    if (!name || !email || !password) {
        toast.error("Please enter all the fields")
        return false;
    }

    return true
}