import { Request, Response } from 'express';
import { orderService } from './order.service';

const createOrder = async (req: Request, res: Response) => {
  try {
    const order = req.body;
    const result = await orderService.createOrderIntoDB(order);
    res.status(200).send({
      message: 'Order created successfully',
      status: true,
      data: result,
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      if (err.message === 'Product not found') {
        res.status(400).send({
          message: 'Validation failed',
          success: false,
          error: err.message,
          stack: err.stack,
        });
      }
      if (err.message === 'Insufficient stock') {
        res.status(400).send({
          message: 'Validation failed',
          success: false,
          error: err.message,
          stack: err.stack,
        });
      } else {
        res.status(400).send({
          message: 'Validation failed',
          success: false,
          error: err,
          stack: err.stack,
        });
      }
    }
  }
};

const getOrders = async (req: Request, res: Response) => {
  try {
    const result = await orderService.getAllOrders();
    res.status(200).send({
      message: "Orders retrieved successfully",
      success: true,
      data: result,
    })
  }catch(err: unknown){
    if (err instanceof Error) {
      res.status(400).send({
        message: 'Something went wrong',
        success: false,
        error: err,
        stack: err.stack,
      });
    }
  }
};

const updateOrder = async (req: Request, res: Response) => {
  try{
    const id = req.params.id;
    const body = req.body;
    const result = await orderService.updateOrder(id, body);
    res.status(200).send({
      message: "Order updated successfully",
      success: true,
      data: result,
    });
  }catch(err: unknown){
    if(err instanceof Error) {
      res.status(400).send({
        message: "Something went wrong",
        success: false,
        error: err,
        stack: err.stack,
      });
    }
  }
}

const deleteOrder = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await orderService.deleteOrder(id);
    res.status(200).send({
      message: "Order deleted successfully",
      success: true,
      data: {},
    })
  }catch(err: unknown){
    if (err instanceof Error) {
      res.status(400).send({
        message: "Something went wrong",
        success: false,
        error: err,
        stack: err.stack,
      });
    }
  }
}

const calculateRevenue = async (req: Request, res: Response) => {
  try {
    const totalRevenue = await orderService.calculateRevenue();

    res.status(200).send({
      message: 'Revenue calculated successfully',
      status: true,
      data: { totalRevenue: totalRevenue[0].totalRevenue },
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.send({
        message: 'Validation failed',
        success: false,
        error: err,
        stack: err.stack,
      });
    }
  }
};

export const orderController = {
  createOrder,
  calculateRevenue,
  getOrders,
  updateOrder,
  deleteOrder,
};
