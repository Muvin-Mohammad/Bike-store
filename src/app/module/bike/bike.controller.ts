import { Request, Response } from 'express';
import { ZodError } from 'zod';
import { BikeServices } from './bike.service';
import { bikeValidationSchema, handleZodError } from './bike.zod.validation';

const createBike = async (req: Request, res: Response) => {
  try {
    const zodParsedData = bikeValidationSchema.parse(req.body);
    const result = await BikeServices.createBikeIntoDB(zodParsedData);

    res.status(200).json({
      message: 'Bike created successfully',
      success: true,
      data: result,
    });
  } catch (err) {
    if (err instanceof ZodError) {
      res.status(400).json({
        message: 'Validation failed',
        success: false,
        error: handleZodError(err),
      });
    } else {
      res.status(500).json({
        message: 'Something went wrong',
        success: false,
        error: err,
      });
    }
  }
};

const getAllBikes = async (req: Request, res: Response) => {
  try {
    const { searchTerm } = req.query;
    const filter: Record<string, unknown> = {};

    if (searchTerm) {
      filter.$or = [
        { name: { $regex: searchTerm, $options: 'i' } },
        { brand: { $regex: searchTerm, $options: 'i' } },
        { category: { $regex: searchTerm, $options: 'i' } },
      ];
    }
    const result = await BikeServices.getAllBikesFromDB(filter);

    res.status(200).json({
      message: 'Bikes retrieved successfully',
      status: true,
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err instanceof Error ? err.message : 'Something went wrong',
      error: err,
    });
  }
};

const getSingleBike = async (req: Request, res: Response) => {
  try {
    const { bikeId } = req.params;
    const result = await BikeServices.getSingleBikeFromDB(bikeId);

    if (!result) {
      return res.status(404).json({
        message: 'Bike not found',
        status: false,
      });
    }

    res.status(200).json({
      message: 'Bike retrieved successfully',
      status: true,
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      message: err instanceof Error ? err.message : 'Something went wrong',
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
      return res.status(404).json({
        message: 'Updated bike ID not found',
        status: false,
      });
    }

    res.status(200).json({
      message: 'Bike updated successfully',
      status: true,
      data: result,
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: err instanceof Error ? err.message : 'Something went wrong',
      error: err,
    });
  }
};

const deleteBike = async (req: Request, res: Response) => {
  try {
    const { bikeId } = req.params;
    const result = await BikeServices.deleteBikeFromDB(bikeId);

    if (!result) {
      return res.status(404).json({
        message: 'Deleted bike ID not found',
        status: false,
      });
    }

    res.status(200).json({
      message: 'Bike deleted successfully',
      status: true,
      data: {},
    });
  } catch (err) {
    res.status(500).json({
      message: err instanceof Error ? err.message : 'Something went wrong',
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
