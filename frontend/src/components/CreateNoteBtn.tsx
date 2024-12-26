import { useState } from "react"
import NoteDialog from "./NoteDialog"
import { Button } from "./ui/button"

const CreateNoteBtn = () => {
    const [isOpen, setIsOpen] = useState(false)

    const handleNote = () => {
        setIsOpen(true)
    }

    return (
        <div className="flex justify-end">
            <Button
                className="bg-blue-600 hover:bg-blue-700 w-full md:w-[15%]"
                onClick={handleNote}
            >
                Create New Note
            </Button>
            <NoteDialog open={isOpen} onOpenChange={setIsOpen} />
        </div>
    )
}

export default CreateNoteBtn