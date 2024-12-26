import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import useCreateNote from "@/hooks/useCreateNote"
import { useAuthContext } from "@/context/AuthContext"

const NoteDialog = ({ open, onOpenChange }: { open: boolean, onOpenChange: any }) => {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const { authUser } = useAuthContext();
    const { loading, create } = useCreateNote();

    const id = authUser?._id

    const data = {
        id,
        title,
        content
    }

    const handleSubmit = async(e: any) => {
        e.preventDefault()
        onOpenChange(false)
        await create(data)
        setTitle("");
        setContent("")
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create New Note</DialogTitle>
                    <DialogDescription>
                        Add a new note to your collection.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label htmlFor="title">Title</Label>
                        <Input
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Note title"
                        />
                    </div>
                    <div>
                        <Label htmlFor="content">Content</Label>
                        <Textarea
                            id="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Write your note here..."
                            rows={5}
                        />
                    </div>
                    <div className="flex justify-end gap-2">
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                            Cancel
                        </Button>
                        <Button type="submit">{loading ? 'Loading...' : 'Save Note'}</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default NoteDialog