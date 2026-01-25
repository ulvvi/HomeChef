import {Prisma} from '../config/db';
import type {Request, Response} from 'express';
import auth from "../config/auth";
import { Mailer } from '../config/mailer';
import multer from 'multer';
import { photoUpload } from '../config/uploader';

export class UserController {

    // Create a new user
    public static async signup(req: Request, res: Response) {
        const {email, name, password} = req.body;
        try {
            const {hash, salt} = auth.generatePassword(password);
            const newUser = await Prisma.user.create({
                data: {
                    email,
                    name,
                    hash,
                    salt,
                },
            });

            // Send welcome email
            const subject = "Welcome to HomeChef!";
            const messageText = `Hello ${name},\n\nThank you for signing up for HomeChef! We're excited to have you on board.\n\nBest regards,\nThe HomeChef Team`;
            Mailer.sendEmail(email, subject, messageText);

            res.status(201).json(newUser);
        } catch (error) {
            console.error("FULL DATABASE ERROR:", error);
            res.status(500).json({error: 'Error creating user', details: error});
        }
    }

    public static async postImage(req: Request, res: Response) {
        // Multer has already finished at this point
        const file = req.file;

        if (!file) {
            return res.status(400).json({ error: 'No file uploaded or invalid file type' });
        }
        // Now you can safely use the file data
        return res.status(200).json({
            message: 'File uploaded successfully',
            filename: file.filename,
            path: file.path
        });
    }
}   