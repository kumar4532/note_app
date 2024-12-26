import { Button } from "./ui/button"

const CreateNoteBtn = () => {
    const handleNote = () => {

    }

    return (
        <div className="flex justify-end">
            <Button
                className="bg-blue-600 hover:bg-blue-700 w-full md:w-[15%]"
                onClick={handleNote}
            >
                Create New Note
            </Button>
        </div>
    )
}

export default CreateNoteBtn