import { Schema, model } from 'mongoose';

interface IProduct{
    no:string;
    name: string;
    price:number;
    description?:string;
}

const productSchema = new Schema<IProduct>({
  no: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description:{type:String, required: false}
});

const Product = model<IProduct>('Product', productSchema);

export {Product,IProduct}