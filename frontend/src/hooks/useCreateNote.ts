import { useState } from 'react'
import toast from 'react-hot-toast';

function useCreateNote() {
    const [loading, setLoading] = useState(false);

    const create = async ({ id, title, content }: { id: string | undefined, title: string, content: string }) => {
        setLoading(true);

        try {
            const res = await fetch(`${import.meta.env.VITE_REACT_APP_BASEURI}/api/note/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, title, content }),
                credentials: 'include'
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data);
            }
        } catch (error: any) {
            console.log("Error is from catch");
            toast.error(error.message)
        } finally {
            setLoading(false);
        }
    };

    return { loading, create };
};

export default useCreateNote;