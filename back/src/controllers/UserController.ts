import {prisma} from '../config/db';
import type {Request, Response} from 'express';
import auth from "../config/auth";

export class UserController {

    // Create a new user
    public static async signup(req: Request, res: Response) {
        const {email, name, password} = req.body;
        try {
            const {hash, salt} = auth.generatePassword(password);
            const newUser = await prisma.user.create({
                data: {
                    email,
                    name,
                    hash,
                    salt,
                },
            });
            res.status(201).json(newUser);
        } catch (error) {
            console.error("FULL DATABASE ERROR:", error);
            res.status(500).json({error: 'Error creating user', details: error});
        }
    }

}