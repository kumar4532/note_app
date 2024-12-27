import { useState } from 'react'
import toast from 'react-hot-toast';

function useSignup() {
    const [signLoading, setSignLoading] = useState(false);

    const signup = async ({ name, email, password }: { name: string, email: string, password: string }) => {
        const success = handleInputErrors({ name, email, password });
        if (!success) return;

        setSignLoading(true);

        try {
            const res = await fetch("/api/auth/sign-up", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
                credentials: 'include'
            });

            const data = await res.json();
            console.log(data);
            
            
            if (!res.ok) {
                throw new Error(data);
            }
            
            return data
        } catch (error: any) {
            console.log("Error is from catch");
            toast.error(error.message)
        } finally {
            setSignLoading(false);
        }
    };

    return { signLoading, signup };
};

export default useSignup;

function handleInputErrors({ name, email, password }: { name: string, email: string, password: string }) {

    if (!name || !email || !password) {
        toast.error("Please enter all the fields")
        return false;
    }

    return true
}