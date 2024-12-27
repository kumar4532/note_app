import { useState } from 'react'
import { useAuthContext } from '../context/AuthContext'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function useSignOut() {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();
    const navigate = useNavigate();

    const signout = async () => {
        setLoading(true);

        try {
            const res = await fetch(`${import.meta.env.VITE_REACT_APP_BASEURI}/api/auth/sign-out`, {
                method: "POST",
                credentials: 'include'
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data);
            }

            if (data) {
                localStorage.removeItem("user");
                setAuthUser(null);
                toast.success("User signed out")
                navigate("/sign-in")
            }
        } catch (error: any) {
            console.log("Error is from catch");
            toast.error(error.message)
        } finally {
            setLoading(false);
        }
    };

    return { loading, signout };
};

export default useSignOut;