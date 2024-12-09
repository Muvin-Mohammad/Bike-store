import { IBike } from './bike.interfaces';
import { Bike } from './bike.model';

const createBikeIntoDB = async (bikeData: IBike) => {
  const bike = new Bike(bikeData);
  return await bike.save();
};

const getAllBikesFromDB = async (filter: Partial<IBike> = {}) => {
  return await Bike.find(filter);
};
const getSingleBikeFromDB = async (id: string) => {
  const result = await Bike.findById(id);
  return result;
};

const updateBikeIntoDB = async (id: string, updateData: Partial<IBike>) => {
  return await Bike.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteBikeFromDB = async (id: string) => {
  return await Bike.findByIdAndDelete(id);
};

export const BikeServices = {
  createBikeIntoDB,
  getAllBikesFromDB,
  getSingleBikeFromDB,
  updateBikeIntoDB,
  deleteBikeFromDB,
};
