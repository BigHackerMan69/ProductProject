import express, { Request, Response } from 'express';
import redis from 'redis';

const app = express();
const client = redis.createClient({
    host: 'localhost',
    port: 6379,
});

// Express route for adding a new item
app.post('/api/items/add', (req: Request, res: Response) => {
    const newItem = req.body;

    // Store the new item in Redis
    client.get('availableItems', (err, reply) => {
        if (err) {
            console.error('Error retrieving available items from Redis:', err);
            return res.status(500).json({ error: 'Internal server error.' });
        }

        let items = JSON.parse(reply) || []; // Parse JSON string into an array of objects or initialize as empty array
        items.push(newItem);

        // Update available items in Redis
        client.set('availableItems', JSON.stringify(items), (err) => {
            if (err) {
                console.error('Error updating available items in Redis:', err);
                return res.status(500).json({ error: 'Internal server error.' });
            }
            res.status(201).json(newItem); // Return newly added item
        });
    });
});

export default app;
