import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { booksRoutes } from './app/modules/books/book.route';
import { orderRoute } from './app/modules/order/order.route';

const app: Application = express();

app.use(express.json());
app.use(cors());
app.use("/api/products", booksRoutes);
app.use("/api/orders", orderRoute)

app.get('/', (req: Request, res: Response) => {
  res.send("Hello world");
});

export default app;
