import { Response } from "express";
import Bus, { IBus } from "../models/bus";
import { handleBadRequest } from "../../utils/ErrorHandle";

// לקבל את כל האוטובוסים
const getAllBuses = async () => {
  try {
    const buses = await Bus.find().populate("driverID").populate("routeID");
    return buses;
  } catch (error: any) {
    return handleBadRequest("MongoDB", error);
  }
};

// לקבל אוטובוס לפי ID
const getBusById = async (busId: string) => {
  try {
    const bus = await Bus.findById(busId)
      .populate("driverID")
      .populate("routeID");
    if (!bus) {
      throw new Error("Bus not found");
    }
    return bus;
  } catch (error: any) {
    return handleBadRequest("MongoDB", error);
  }
};

// להוסיף אוטובוס חדש
const addBus = async (busData: IBus) => {
  try {
    if (!busData.licensePlate || !busData.busModel) {
      throw new Error("Missing required fields");
    }

    const newBus = new Bus(busData);
    await newBus.save();
    return newBus;
  } catch (error: any) {
    return handleBadRequest("MongoDB", error);
  }
};

// לעדכן אוטובוס
const updateBus = async (busId: string, updateData: Partial<IBus>) => {
  try {
    const existingBus = await Bus.findById(busId);
    if (!existingBus) {
      throw new Error("Bus not found");
    }

    const updatedBus = await Bus.findByIdAndUpdate(busId, updateData, {
      new: true,
      runValidators: true,
    });

    return updatedBus;
  } catch (error: any) {
    return handleBadRequest("MongoDB", error);
  }
};

// למחוק אוטובוס
const deleteBus = async (busId: string) => {
  try {
    const deletedBus = await Bus.findByIdAndDelete(busId);
    if (!deletedBus) {
      throw new Error("Bus not found");
    }
    return { message: "Bus deleted successfully" };
  } catch (error: any) {
    return handleBadRequest("MongoDB", error);
  }
};

export { getAllBuses, getBusById, addBus, updateBus, deleteBus };
