import { Request, Response } from "express";
import * as notesRepository from "../repositories/notesRepository";
import { Note } from "../../interfaces/Note";

export const getAllNotes = (req: Request, res: Response) => {
    const allNotes = notesRepository.getAllNotes();
    res.json(allNotes);
};

export const getNoteById = (req: Request, res: Response) => {
    const { id } = req.params;
    const note = notesRepository.getNoteById(id);
    if (note) {
        res.json(note);
    } else {
        res.status(404).json({ error: "Note not found" });
    }
};

export const createNote = (req: Request, res: Response) => {
    const newNote: Note = req.body;
    const createdNote = notesRepository.createNote(newNote);
    res.status(201).json(createdNote);
};

export const editNote = (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedNote: Note = req.body;
    const editedNote = notesRepository.editNote(id, updatedNote);
    if (editedNote) {
        res.json(editedNote);
    } else {
        res.status(404).json({ error: "Note not found" });
    }
};

export const deleteNote = (req: Request, res: Response) => {
    const { id } = req.params;
    const deleted = notesRepository.deleteNote(id);
    if (deleted) {
        res.sendStatus(204);
    } else {
        res.status(404).json({ error: "Note not found" });
    }
};

export const getStats = (req: Request, res: Response) => {
    const stats = notesRepository.getStats();
    res.json(stats);
};
