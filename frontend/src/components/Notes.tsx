import { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { Trash2 } from 'lucide-react';

interface note {
    _id: string,
    title: string,
    content: string
}

const Notes = () => {
    const [notes, setNotes] = useState<note[]>([]);

    useEffect(() => {
        try {
            const getNotes = async () => {
                const res = await fetch(`${import.meta.env.VITE_REACT_APP_BASEURI}/api/note/`, {
                    credentials: 'include'
                })
                const data = await res.json();

                if (!res.ok) {
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
    }, [notes])

    const handleDelete = async (noteId: string) => {
        
        try {
            const res = await fetch(`${import.meta.env.VITE_REACT_APP_BASEURI}/api/note/${noteId}`, {
                method: 'DELETE',
                credentials: 'include'
            })

            if (!res.ok) throw new Error("Failed to delete note")

            setNotes(notes.filter(note => note._id !== noteId))
            toast.success("Note deleted successfully")
        } catch (error: any) {
            console.log("Error while deleting note", error);
            toast.error(error.message)
        }
    }

    return (
        <div className='w-full'>
            <h1 className='text-lg font-semibold'>Notes :</h1>
            <div className='flex lg:flex-row flex-col lg:gap-4 gap-1'>
                {
                    notes.length > 0 ? (
                        notes.map((note: note) => (
                            <div
                                key={note.title}
                                className='p-2 mt-8 border rounded-lg flex flex-row justify-between items-center space-x-4'
                            >   <div>
                                    {note.title}
                                </div>
                                <div
                                    onClick={() => handleDelete(note._id)}
                                    className='rounded-full text-red-700 hover:text-red-500'
                                >
                                    <Trash2 />
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className='mt-16 text-center'>Create new notes to see them</p>
                    )
                }
            </div>
        </div>
    )
}

export default Notes