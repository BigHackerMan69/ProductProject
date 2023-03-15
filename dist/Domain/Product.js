import { Schema, model } from 'mongoose';
const productSchema = new Schema({
    no: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: false }
});
const Product = model('Product', productSchema);
export { Product };
//# sourceMappingURL=Product.js.map