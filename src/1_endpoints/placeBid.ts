import express, { Request, Response } from 'express';
import redis from 'redis';

const app = express();
const client = redis.createClient({
    host: 'localhost',
    port: 6379,
});

// Express route for placing a bid on an item
app.post('/api/items/:itemId/bid', (req: Request, res: Response) => {
    const itemId = req.params.itemId;
    const { user, amount } = req.body;

    // Store the bid in Redis
    client.rpush(`item:${itemId}:bids`, JSON.stringify({ user, amount }), (err) => {
        if (err) {
            console.error(`Error storing bid for item ${itemId} in Redis:`, err);
            return res.status(500).json({ error: 'Internal server error.' });
        }
        res.status(201).json({ message: 'Bid placed successfully.' });
    });
});

export default app;
