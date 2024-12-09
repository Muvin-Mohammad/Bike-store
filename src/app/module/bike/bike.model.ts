import { Schema, model } from 'mongoose';
import { IBike } from './bike.interfaces';

const bikeSchema = new Schema<IBike>(
  {
    name: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    category: {
      type: String,
      enum: ['Mountain', 'Road', 'Hybrid', 'Electric'],
      required: true,
    },
    description: { type: String, required: true },
    quantity: { type: Number, required: true },
    inStock: { type: Boolean, required: true },
  },
  { timestamps: true }, // Automatically adds createdAt and updatedAt fields
);

export const Bike = model<IBike>('Bike', bikeSchema);
