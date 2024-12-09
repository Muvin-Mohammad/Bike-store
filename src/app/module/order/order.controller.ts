import { Request, Response } from 'express';
import { OrderServices } from './order.service';
import { orderValidationSchema } from './order.zod.validation';
import { Types } from 'mongoose';

const createOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const parsedData = orderValidationSchema.parse(req.body);

    const orderData = {
      ...parsedData,
      product: new Types.ObjectId(parsedData.product),
    };

    const result = await OrderServices.createOrderIntoDB(orderData);

    res.status(201).json({
      message: 'Order created successfully',
      status: true,
      data: result,
    });
  } catch (err) {
    res.status(400).json({
      message: (err as Error).message || 'Validation failed',
      status: false,
      error: err,
    });
  }
};

const getRevenue = async (_req: Request, res: Response): Promise<void> => {
  try {
    const totalRevenue = await OrderServices.calculateRevenue();

    res.status(200).json({
      message: 'Revenue calculated successfully',
      status: true,
      data: { totalRevenue },
    });
  } catch (err) {
    res.status(500).json({
      message: (err as Error).message || 'Failed to calculate revenue',
      status: false,
      error: err,
    });
  }
};

export const OrderControllers = {
  createOrder,
  getRevenue,
};
