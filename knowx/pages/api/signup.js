// pages/api/signup.js
import pool from '../../src/db/postgres';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { email, password } = req.body;
        try {
            // Here, insert the user into the database. Adjust SQL as needed.
            const result = await pool.query("INSERT INTO public.user(email, password) VALUES($1, $2) RETURNING *", [email, password]);
            res.status(201).json(result.rows[0]);
        } catch (error) {
            console.error("Signup error:", error);
            res.status(500).json({ error: "Signup failed" });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
