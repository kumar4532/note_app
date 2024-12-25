import { useState } from 'react'
import { useAuthContext } from '../context/AuthContext'

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

            console.log(data);


            if (data) {
                localStorage.setItem("user", JSON.stringify(data));
                setAuthUser(data);
            }

        } catch (error) {
            console.log("Error is from catch");
        } finally {
            setLoading(false);
        }
    };

    return { loading, signup };
};

export default useSignup;

function handleInputErrors({ name, email, password }: { name: string, email: string, password: string }) {

    if (!name || !email || !password) {
        console.log("Please fill all the feilds")
        return false;
    }

    return true
}