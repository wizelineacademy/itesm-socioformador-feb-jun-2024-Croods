// pages/api/login.js
import pool from '../../src/db/postgres';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { email, password } = req.body;
        try {
            const result = await pool.query("SELECT * FROM public.user WHERE email = $1 AND password = $2", [email, password]);
            if (result.rows.length > 0) {
                // Adjust according to your authentication logic
                res.status(200).json({ message: "Login successful", user: result.rows[0] });
            } else {
                res.status(401).json({ error: "Invalid credentials" });
            }
        } catch (error) {
            console.error("Login error:", error);
            res.status(500).json({ error: "Login failed" });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
