import { Book } from '../books/book.model';
import { TOrder } from './order.interface';
import { Order } from './order.model';

const createOrderIntoDB = async (order: TOrder) => {
  const book = await Book.findById(order.product);

  if (!book) {
    throw new Error('Product not found');
  }

  if (book.quantity < order.quantity) {
    throw new Error('Insufficient stock');
  }

  const result = new Order(order);

  await result.save();

  book.quantity = book.quantity - order.quantity;

  if (book.quantity === 0) {
    book.inStock = false;
  }
  await book.save();

  return result;
};

const getAllOrders = async () => {
  const result = await Order.find();
  return result;
};

const updateOrder = async (id: string, data: Partial<TOrder>) => {
  const result = await Order.findByIdAndUpdate(id, data, {new: true});

  return result;
};

const deleteOrder = async (id: string) => {
  const result = await Order.findByIdAndDelete(id);
  return result;
}

const calculateRevenue = async () => {
  const result = await Order.aggregate([
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: '$totalPrice' },
      },
    },
  ]);

  return result;
};

export const orderService = {
  createOrderIntoDB,
  calculateRevenue,
  getAllOrders,
  updateOrder,
  deleteOrder,
};
