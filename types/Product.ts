import type { ObjectId } from "mongoose";

export interface Product {
  _id?: string | ObjectId;
  name: string;
  price: number;
  dimensions: {
    width: number;
    height: number;
    length: number;
  };
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
}
