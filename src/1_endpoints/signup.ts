import express, { Request, Response } from 'express';
import redis from 'redis';

const app = express();
const client = redis.createClient({
    host: 'localhost',
    port: 6379,
});

// Express route for user signup
app.post('/api/signup', (req: Request, res: Response) => {
    const { email } = req.body;

    // Store user's email in Redis
    client.sadd('auctionUsers', email, (err) => {
        if (err) {
            console.error('Error storing user in Redis:', err);
            return res.status(500).json({ error: 'Internal server error.' });
        }
        res.status(201).json({ message: 'User signed up successfully.' });
    });
});

export default app;