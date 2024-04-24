import express, { Request, Response } from 'express';
import redis from 'redis';

const app = express();
const client = redis.createClient({
    host: 'localhost',
    port: 6379,
});

// Express route for retrieving all available items
app.get('/api/items', (req: Request, res: Response) => {
    // Retrieve available items from Redis
    client.get('availableItems', (err, reply) => {
        if (err) {
            console.error('Error retrieving available items from Redis:', err);
            return res.status(500).json({ error: 'Internal server error.' });
        }

        // Parse JSON string into an array of objects
        const items = JSON.parse(reply);

        // Return all available items
        res.status(200).json(items);
    });
});

export default app;