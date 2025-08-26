import { Request, Response } from "express";
import { pool } from "../pool";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

export const register = async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) 
            return res.status(400).json({
        message: "Please provide all user details",
            });
        const user = await pool.query("SELECT * FROM users WHERE email = $1;", [email,]);
        if (user.rows.length > 0) {
            return res.status(400).json({
                message: "User with this email already exists",
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = bcrypt.hash(password, salt);

        const query: string = `INSERT INTO users (username, email, password, user_id) VALUES ($1, $2, $3, $4);`
        await pool.query(query, [username, email, password, uuid()])
        return res.status(200).json({
            message: "User registered succesfully",
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};

export const login = async (req: Request, res: Response) => {
    try {   
        const { email, password } = req.body;
        if (!email || !password) { 
            return res.status(400).json({
                message: "Please provide all user details",
            });
        }
        const user = await pool.query("SELECT * FROM users WHERE email=$1;", [email,]);
        if (user.rows.length === 0) {
            return res.status(400).json({
                message: `There is no user with the email: ${email}`,
            });
        }
        const validPassword: boolean = await bcrypt.compare(password, user.rows[0].password);
        if (!validPassword) {
            return res.status(400).json({
                message: "Invalid password please try again",
            });
        }
        return res.status(200).json({
            message: "User logged in succesfully",
            id: user.rows[0].user_id,
            username: user.rows[0].username,
            email: user.rows[0].email,
        });
    } catch (err) {
        return res.status(200).json({
            message: "Internal Server Error",
        });
    }
};