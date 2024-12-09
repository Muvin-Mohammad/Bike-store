import { Request, Response } from 'express';

import { BikeServices } from './bike.service';
import { bikeValidationSchema, handleZodError } from './bike.zod.validation';

const createBike = async (req: Request, res: Response) => {
  try {
    const zodParsedData = bikeValidationSchema.parse(req.body);

    const result = await BikeServices.createBikeIntoDB(zodParsedData);

    res.status(200).json({
      message: 'Bike  created succesfully',
      success: true,
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      message: 'Validation failed',
      success: false,
      error: handleZodError(err),
    });
  }
};

const getAllBikes = async (req: Request, res: Response) => {
  try {
    const { searchTerm } = req.query;
    const filter: any = {};

    if (searchTerm) {
      filter.$or = [
        { name: { $regex: searchTerm, $options: 'i' } },
        { brand: { $regex: searchTerm, $options: 'i' } },
        { category: { $regex: searchTerm, $options: 'i' } },
      ];
    }
    const result = await BikeServices.getAllBikesFromDB(filter);

    res.status(200).json({
      message: 'Bikes retrieved succesfully',
      status: true,
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      status: false,
      message: err.message || 'something went wrong',
      error: err,
    });
  }
};

const getSingleBike = async (req: Request, res: Response) => {
  try {
    const { bikeId } = req.params;

    const result = await BikeServices.getSingleBikeFromDB(bikeId);
    if (!result) {
      res.status(404).json({
        message: 'Bike not found',
        status: false,
      });
    }
    res.status(200).json({
      message: 'Bkies retrieved succesfully',
      status: true,
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      message: err.message || 'something went wrong',
      status: false,
      error: err,
    });
  }
};

const updateBike = async (req: Request, res: Response) => {
  try {
    const { bikeId } = req.params;
    const updateData = req.body;
    const result = await BikeServices.updateBikeIntoDB(bikeId, updateData);
    if (!result) {
      res.status(404).json({
        message: 'updated bike id not found',
        status: false,
      });
    }
    res.status(200).json({
      message: 'Bike updated successfully',
      status: true,
      data: result,
    });
  } catch (err: any) {
    res.status(400).json({
      status: false,
      message: err.message || 'something went wrong',
      error: err,
    });
  }
};
const deleteBike = async (req: Request, res: Response) => {
  try {
    const { bikeId } = req.params;

    const result = await BikeServices.deleteBikeFromDB(bikeId);
    if (!result) {
      res.status(404).json({
        message: 'deleted bike id not found',
        status: false,
      });
    }
    res.status(200).json({
      message: 'Bike  deleted succesfully',
      status: true,
      data: {},
    });
  } catch (err: any) {
    res.status(500).json({
      message: err.message || 'something went wrong',
      status: false,
      error: err,
    });
  }
};
export const BikeControllers = {
  createBike,
  getAllBikes,
  getSingleBike,
  updateBike,
  deleteBike,
};
