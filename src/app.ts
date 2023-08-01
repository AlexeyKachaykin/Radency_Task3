import express, { Request, Response } from "express";
import cors from "cors";

import { Note } from "../interfaces/Note";
import * as notesController from "./notes";
import * as utils from "./utils";
import * as bodyParser from "body-parser";
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.get("/notes", (req: Request, res: Response) => {
    const allNotes = notesController.getAllNotes();
    res.json(allNotes);
});
app.get("/notes/stats", (req: Request, res: Response) => {
    const stats = notesController.getStats();
    res.json(stats);
});
app.get("/notes/:id", utils.validateNoteId, (req: Request, res: Response) => {
    const { id } = req.params;
    const note = notesController.getNoteById(id);
    if (note) {
        res.json(note);
    } else {
        res.status(404).json({ error: "Note not found" });
    }
});

app.post("/notes", utils.validateNote, (req: Request, res: Response) => {
    const newNote: Note = req.body;
    const createdNote = notesController.createNote(newNote);
    res.status(201).json(createdNote);
});

app.patch("/notes/:id", utils.validateNoteId, utils.validateNote, (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedNote: Note = req.body;
    const editedNote = notesController.editNote(id, updatedNote);
    if (editedNote) {
        res.json(editedNote);
    } else {
        res.status(404).json({ error: "Note not found" });
    }
});

app.delete("/notes/:id", utils.validateNoteId, (req: Request, res: Response) => {
    const { id } = req.params;
    const deleted = notesController.deleteNote(id);
    if (deleted) {
        res.sendStatus(204);
    } else {
        res.status(404).json({ error: "Note not found" });
    }
});



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
