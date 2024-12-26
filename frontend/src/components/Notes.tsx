import { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

const Notes = () => {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        try {
            const getNotes = async () => {
                const res = await fetch("/api/note/")
                const data = await res.json();

                if(!res.ok) {
                    throw new Error;
                }

                if (data) {
                    setNotes(data);
                }
            }

            getNotes();
        } catch (error: any) {
            console.log("Error while fetching notes", error)
            toast.error(error)
        }
    }, [])

    console.log(notes);
    

    return (
        <div>
            <h1 className='text-lg font-semibold'>Notes :</h1>
            <div>
                {
                    notes.length > 0 ? (
                        <div className='p-2 mt-2'>
                            
                        </div>
                    ) : (
                        <p className='mt-16 text-center'>Create new notes to see them</p>
                    )
                }
            </div>
        </div>
    )
}

export default Notes