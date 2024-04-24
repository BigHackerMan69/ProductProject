import * as dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import { RedisClient } from '../2_sessions/DB.js';
import multer from 'multer';
import fs from 'fs';

dotenv.config({ path: 'config/middleware.env' });

const routes = express();

routes.use(cors());
routes.use(express.static('public'));

routes.use(bodyParser.urlencoded({ extended: false }));
routes.use(bodyParser.json())

import { Bid } from '../3_models/Bid.js';
import { Item } from '../3_models/Item.js';

const createDirectory = (dir: string) => {
   try {
     if (!fs.existsSync(dir)) {
       fs.mkdirSync(dir, { recursive: true });
     }
   } catch (err) {
     console.error(`Error creating directory '${dir}':`, err);
     throw err; // Re-throw to handle it in the caller function
   }
 };

 // Configure multer for file storage
const storage = multer.diskStorage({
   destination: (req, file, cb) => {
     const dir = './uploads';
     try {
       createDirectory(dir);
       cb(null, dir);
     } catch (err) {
      console.error(`Error with '${dir}':`, err);
     }
   },
   filename: (req, file, cb) => {
     const itemID = req.params.itemID;
     cb(null, `${itemID}.png`);
   }
 });
 
 const upload = multer({ storage: storage });

// #1	
// Som admin skal man kunne tilføje et nyt item.

 routes.post('/items', async (req, res) => {
  let item: Item = req.body;
  
  try {
    // Store the item in a Redis list under the key items'
    await RedisClient.LPUSH(`items`, JSON.stringify(item));

    res.status(201).send('Item placed successfully');
  } catch (error) {
    console.error('Error placing item:', error);
    res.status(500).send('Error placing item');
  }
});

// #2
// Som admin skal man kunne tilføje et billede til et allerede oprettet item.
// Bemærk denne funktion skal måske være samlet med Item-oprettelsen
routes.post('/upload/:itemID', upload.single('picture'), (req, res) => {
   if (!req.params.itemID) {
     return res.status(400).send('itemID is required');
   }
 
   res.send(`File uploaded successfully as ${req.params.itemID}.png`);
 });

// #3
 // Som admin skal man kunne se hvilken bruger der har budt på hvert enkelt item, mens auktionen forløb.
 routes.get('/bids/:itemId', async (req, res) => {
  const { itemId } = req.params;
  try { 
    const bids = await RedisClient.LRANGE(`bids:${itemId}`, 0, -1);
    // Convert the stringified bids back to JSON objects
    const bidObjects = bids.map(bid => JSON.parse(bid));

    res.status(200).json(bidObjects);
  } catch (error) {
    console.error('Error fetching bids:', error);
    res.status(500).send('Error fetching bids');
  }
});

// #4
// Som user skal man kunne se alle udbudte items
//TODO Husk at billederne også skal med :-)

// #5
// Som user skal man kunne tilmelde sig auktionen med sin email som brugernavn
// TODO


// #6	
// Som user skal man kunne byde på et item.
routes.post('/bid', async (req, res) => {
   let bid: Bid = req.body;
   bid.timestamp = new Date(); // Set the current timestamp
 
   // TODO:
   // Hvis auktionen er udløbet skal dette item sættes til inaktivt
   // Og buddet skal ikke gemmes.
   // Ellers skal den aktuelle pris på dette item øges med værdien af buddet
   try {
     // Storing the bid in a Redis list under the key 'bids:[itemId]'
     await RedisClient.LPUSH(`bids:${bid.itemId}`, JSON.stringify(bid));
 
     res.status(201).send('Bid placed successfully');
   } catch (error) {
     console.error('Error placing bid:', error);
     res.status(500).send('Error placing bid');
   }
 });


// The default (all other not valid routes)
routes.get('*', (req,res) =>{
     return res.status(404).send('no such route');
});


export {routes}

