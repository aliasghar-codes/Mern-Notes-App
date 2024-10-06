import express from "express"
import { addNote, updateNote, deleteNote, getAllNotes, pinNote, findNotes } from "../controllers/note.controller.js"
import { authenticateToken } from "../middlewares/auth.middleware.js"

const router = express.Router();

router.post('/add', authenticateToken, addNote);
router.put('/update/:noteId', authenticateToken, updateNote);
router.put('/pin/:noteId', authenticateToken, pinNote);
router.delete('/delete/:noteId', authenticateToken, deleteNote);
router.get('/get-all', authenticateToken, getAllNotes);
router.get('/find', authenticateToken, findNotes);

export default router;