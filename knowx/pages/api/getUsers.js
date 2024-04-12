//src/api/getUsers.js
import pool from "../../src/db/postgres";

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const client = await pool.connect();
            const result = await client.query("SELECT * FROM public.user");
            const data = result.rows;
            client.release();

            res.status(200).json(data);
        } catch (error) {
            console.error("Error fetching data:", error);
            res.status(500).json({ error: "Failed to fetch data" });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
