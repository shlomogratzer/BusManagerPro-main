import { Response } from "express";
import Line, { ILine } from "../models/line";
import { handleBadRequest } from "../../utils/ErrorHandle";

// לקבל את כל הנתיבים
const getAllLines = async () => {
  try {
    const lines = await Line.find();
    return lines;
  } catch (error: any) {
    return handleBadRequest("MongoDB", error);
  }
};

// לקבל נתיב לפי ID
const getLineById = async (lineId: string) => {
  try {
    const line = await Line.findById(lineId);
    if (!line) {
      throw new Error("Line not found");
    }
    return line;
  } catch (error: any) {
    return handleBadRequest("MongoDB", error);
  }
};

// להוסיף נתיב חדש
const addLine = async (lineData: ILine) => {
  try {
    if (!lineData) {
      throw new Error("Missing required fields");
    }

    const newLine = new Line(lineData);
    await newLine.save();
    return newLine;
  } catch (error: any) {
    return handleBadRequest("MongoDB", error);
  }
};

// לעדכן נתיב
const updateLine = async (lineId: string, updateData: Partial<ILine>) => {
  try {
    const existingLine = await Line.findById(lineId);
    if (!existingLine) {
      throw new Error("Line not found");
    }

    const updatedLine = await Line.findByIdAndUpdate(lineId, updateData, {
      new: true,
      runValidators: true,
    });

    return updatedLine;
  } catch (error: any) {
    return handleBadRequest("MongoDB", error);
  }
};

// למחוק נתיב
const deleteLine = async (lineId: string) => {
  try {
    const deletedLine = await Line.findByIdAndDelete(lineId);
    if (!deletedLine) {
      throw new Error("Line not found");
    }
    return { message: "Line deleted successfully" };
  } catch (error: any) {
    return handleBadRequest("MongoDB", error);
  }
};

export { getAllLines, getLineById, addLine, updateLine, deleteLine };
