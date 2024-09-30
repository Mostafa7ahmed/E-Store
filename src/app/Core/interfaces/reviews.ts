import { Products } from "./products";
import { Users } from "./users";

export interface Reviews {
  _id?: string;
  comment?: string;
  rate?: number;
  product?: Products;
  user?: Users;
  createdAt?: Date;
}
