import { Request, Response, NextFunction } from "express";
import * as yup from "yup";


export const validateNote = (req: Request, res: Response, next: NextFunction) => {
    const schema = yup.object().shape({
        name: yup.string().required(),
        created: yup.date().required(),
        category: yup.string().required(),
        content: yup.string().required(),
        archived: yup.boolean().default(false),
    });

    try {
        req.body = schema.validateSync(req.body);
        next();
    } catch (error) {
        const validationError: yup.ValidationError = error as yup.ValidationError;
        res.status(400).json({ error: validationError.message });
    }
};

export const validateNoteId = (req: Request, res: Response, next: NextFunction) => {
    const idSchema = yup.object().shape({
        id: yup.string().required(),
    });

    try {
        req.params = idSchema.validateSync(req.params);
        next();
    } catch (error) {
        const validationError: yup.ValidationError = error as yup.ValidationError;
        res.status(400).json({ error: validationError.message });
    }
};