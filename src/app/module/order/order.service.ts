import { Bike } from '../bike/bike.model';
import { IOrder } from './order.interface';
import { Order } from './order.model';

const createOrderIntoDB = async (orderData: IOrder) => {
  const bike = await Bike.findById(orderData.product);

  if (!bike) {
    throw new Error('Bike not found');
  }

  if (bike.quantity < orderData.quantity) {
    throw new Error('Insufficient stock available');
  }

  bike.quantity -= orderData.quantity;
  bike.inStock = bike.quantity > 0;
  await bike.save();

  const order = new Order(orderData);
  return await order.save();
};

const calculateRevenue = async () => {
  const revenueData = await Order.aggregate([
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: { $multiply: ['$totalPrice', 1] } },
      },
    },
  ]);

  return revenueData.length > 0 ? revenueData[0].totalRevenue : 0;
};

export const OrderServices = {
  createOrderIntoDB,
  calculateRevenue,
};
