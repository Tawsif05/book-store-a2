import { Schema, model } from 'mongoose';
import { TOrder } from './order.interface';



const orderSchema = new Schema<TOrder>(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      match: [/^\S+@\S+\.\S+$/, 'Invalid email format'],
      trim: true,
    },
    product: {
      type: String,
      required: [true, 'Product is required'],
      minlength: [3, 'Product name must be at least 3 characters long'],
      trim: true,
      unique: true,
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      min: [1, 'Quantity must be at least 1'],
    },
    totalPrice: {
      type: Number,
      required: [true, 'Total price is required'],
      min: [0, 'Total price must be a positive number'],
    },
  },
  {
    timestamps: true,
  }
);

export const Order = model<TOrder>('Order', orderSchema);
