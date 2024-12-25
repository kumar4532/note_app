import express from 'express'
import protectRoute from '../middlewares/protectedRoutes';
import { createNote, deleteNote, getAllNotes, getNote } from '../controllers/note.controller';

const router = express.Router();

router.use(protectRoute);

router.post("/", createNote)
router.delete("/:id", deleteNote)
router.get("/:id", getNote)
router.get("/", getAllNotes)

export default router;