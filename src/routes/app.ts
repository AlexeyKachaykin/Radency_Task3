import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import * as notesService from "../repositories/notesRepository";
import * as utils from "./utils";
import { Note } from "../../interfaces/Note";
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.get("/notes", (req: Request, res: Response) => {
    try {
        const allNotes = notesService.getAllNotes();
        res.json(allNotes);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.get("/notes/:id", utils.validateNoteId, (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const note = notesService.getNoteById(id);
        if (note) {
            res.json(note);
        } else {
            res.status(404).json({ error: "Note not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.post("/notes", utils.validateNote, (req: Request, res: Response) => {
    try {
        const newNote: Note = req.body;
        const createdNote = notesService.createNote(newNote);
        res.status(201).json(createdNote);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.patch("/notes/:id", utils.validateNoteId, utils.validateNote, (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updatedNote: Note = req.body;
        const editedNote = notesService.editNote(id, updatedNote);
        if (editedNote) {
            res.json(editedNote);
        } else {
            res.status(404).json({ error: "Note not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.delete("/notes/:id", utils.validateNoteId, (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deleted = notesService.deleteNote(id);
        if (deleted) {
            res.sendStatus(204);
        } else {
            res.status(404).json({ error: "Note not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.get("/notes/stats", (req: Request, res: Response) => {
    try {
        const stats = notesService.getStats();
        res.json(stats);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
