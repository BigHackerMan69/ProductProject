import express, { Request, Response } from 'express';
import redis from 'redis';

const app = express();
const client = redis.createClient({
    host: 'localhost',
    port: 6379,
});

// Express route for adding an image to an item
app.post('/api/items/:itemId/add-image', (req: Request, res: Response) => {
    const itemId = req.params.itemId;
    const imageInfo = req.body;

    // Store image metadata in Redis
    client.hmset(`item:${itemId}:image`, imageInfo, (err) => {
        if (err) {
            console.error(`Error storing image metadata for item ${itemId} in Redis:`, err);
            return res.status(500).json({ error: 'Internal server error.' });
        }
        res.status(201).json({ message: 'Image metadata stored successfully.' });
    });
});

export default app;