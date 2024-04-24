import express, { Request, Response } from 'express';
import redis from 'redis';

const app = express();
const client = redis.createClient({
    host: 'localhost',
    port: 6379,
});

// Express route for retrieving bidding information for an item
app.get('/api/items/:itemId/bids', (req: Request, res: Response) => {
    const itemId = req.params.itemId;

    // Retrieve bidding information for the specified item from Redis
    client.lrange(`item:${itemId}:bids`, 0, -1, (err, reply) => {
        if (err) {
            console.error(`Error retrieving bidding information for item ${itemId} from Redis:`, err);
            return res.status(500).json({ error: 'Internal server error.' });
        }

        // Parse JSON strings into an array of objects
        const bids = reply.map((bid: string) => JSON.parse(bid));

        // Return bidding information
        res.status(200).json(bids);
    });
});

export default app;