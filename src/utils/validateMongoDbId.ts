import mongoose from 'mongoose';
import { Response } from 'express';

export const validateMongoDbId = (id: string,  res: Response) => {
  const isValid = new mongoose.Types.ObjectId(id);
  if (!isValid) {
    return res.status(404);
  }
}
