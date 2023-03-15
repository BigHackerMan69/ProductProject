import * as dotenv from 'dotenv';
dotenv.config({ path: 'config/middleware.env' });
import express from 'express';
import bodyParser from 'body-parser';
const routes = express();
import cors from 'cors';
routes.use(cors());
routes.use(express.static('public'));
routes.use(bodyParser.urlencoded({ extended: false }));
routes.use(bodyParser.json());
import { MongoDB } from '../Broker/MongoDB.js';
import { Product } from '../Domain/Product.js';
// connecting to MongoDB
MongoDB.connect();
// get single value 
routes.get('/products/:uid', async (req, res) => {
    try {
        // NOTICE the second parameter
        const product = await Product.findOne({ no: req.params.uid }, { _id: 0, __v: 0 });
        return res.status(200).json(product);
    }
    catch (e) {
        console.error('routes, could not find product ' + e);
    }
});
// post a new product
routes.post('/products', async (req, res) => {
    let product = new Product({ 'no': '', 'name': '', 'price': 0 });
    try {
        product['no'] = req.body.no;
        product['name'] = req.body.name;
        product['price'] = req.body.price;
        await product.save(); // the single insert in the DB 
        console.debug('product inserted');
    }
    catch (e) {
        console.error('routes, could not insert product, ' + e);
    }
    return res.status(201).json(product);
});
// The default (all other not valid routes)
routes.get('*', (req, res) => {
    return res.status(404).send('no such route');
});
export { routes };
//# sourceMappingURL=routes.js.map