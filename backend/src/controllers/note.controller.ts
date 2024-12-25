import { Request, Response } from "express"
import Note from "../models/note.model"

const createNote = async (req: Request, res: Response): Promise<void> => {
    try {
        const { title, content } = req.body
        const userId = req.user._id

        const newNote = await Note.create({
            user: userId,
            title: title || '',
            content: content || ''
        })

        res.status(200).json(newNote)
    } catch (error) {
        console.log("Error while creating a note", error);
        res.json(500).json({ error: "Internal Server Error" });
    }
}

const deleteNote = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!id) {
            res.status(404).json("Please provide an note id")
            return
        }

        await Note.findByIdAndDelete(id);

        res.status(200).json("Note deleted successfully");
    } catch (error) {
        console.log("Error while deleting a note", error);
        res.json(500).json({ error: "Internal Server Error" });
    }
}

const getNote = async (req: Request, res: Response) => {
    try {
        const { id } = req.params

        if (!id) {
            res.status(404).json("Please provide an note id")
            return
        }

        const foundNote = await Note.findById(id).populate({
            path: 'user',
            select: '-password -email -createdAt'
        });

        res.status(200).json(foundNote)
    } catch (error) {
        console.log("Error while finding a note", error);
        res.json(500).json({ error: "Internal Server Error" });
    }
}

const getAllNotes = async (req: Request, res: Response) => {
    try {
        const userId = req.user._id

        const userNotes = await Note.find({
            user: userId
        })

        if (!userNotes) {
            res.status(404).json("This user does not have any notes")
            return
        }

        res.status(200).json(userNotes)
    } catch (error) {
        console.log("Error while getting all notes", error);
        res.json(500).json("Internal Server Error");
    }
}

export {
    createNote,
    deleteNote,
    getNote,
    getAllNotes
}