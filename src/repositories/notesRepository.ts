import { Note } from "../../interfaces/Note";

let notes: Note[] = [
    {
        id: '1',
        name: 'Note 1',
        category: 'Task',
        content: 'This is the content of Note 1.',
        created: 'August 1, 2023',
        archived: false,
    },
    {
        id: '2',
        name: 'Note 2',
        category: 'Random Thought',
        content: 'This is the content of Note 2.',
        created: 'August 1, 2023',
        archived: false,
    },
    {
        id: '3',
        name: 'Note 3',
        category: 'Random Thought',
        content: 'This is the content of Note 3.',
        created: 'August 1, 2023',
        archived: true,
    },
    {
        id: '4',
        name: 'Note 4',
        category: 'Idea',
        content: 'This is the content of Note 4.',
        created: 'August 1, 2023',
        archived: false,
    },
    {
        id: '5',
        name: 'Note 5',
        category: 'Task',
        content: 'This is the content of Note 5.',
        created: 'August 1, 2023',
        archived: false,
    },
    {
        id: '6',
        name: 'Note 2',
        created: 'August 1, 2023',
        category: 'Random Thought',
        content: 'This is a random thought for 07/29/2023 and another date 08/05/2023.',
        archived: false,
    }, {
        id: '7',
        name: 'Note 7',
        category: 'Task',
        content: 'This is the content of Note 7.',
        created: 'August 1, 2023',
        archived: false,
    }

];

export const getAllNotes = (): Note[] => notes;

export const getNoteById = (id: string): Note | undefined =>
    notes.find((note) => note.id === id);

export const createNote = (note: Note): Note => {
    notes.push(note);
    return note;
};

export const editNote = (id: string, updatedNote: Note): Note | undefined => {
    const index = notes.findIndex((note) => note.id === id);
    if (index !== -1) {
        notes[index] = { ...updatedNote, id };
        return notes[index];
    }
    return undefined;
};

export const deleteNote = (id: string): boolean => {
    const initialLength = notes.length;
    notes = notes.filter((note) => note.id !== id);
    return notes.length !== initialLength;
};

export const getStats = () => {
    const totalNotes = notes.length;
    const archivedNotes = notes.filter((note) => note.archived).length;
    const activeNotes = totalNotes - archivedNotes;

    return {
        totalNotes,
        archivedNotes,
        activeNotes,
    };
};
