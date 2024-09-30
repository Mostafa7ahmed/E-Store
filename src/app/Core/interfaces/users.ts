import { Products } from "./products";

export interface Users {
  _id?: string;
  name?: string;
  email?: string;
  password?: string;
  phone?: string;
  role?: UserRoles;
  active?: boolean;
  image?: string;
  wishlist?: Products[];
  address?: UserAddress[];
}

type UserRoles = 'manager' | 'admin' | 'user'

export interface UserAddress {
  _id?: string;
  street?: string;
  city?: string;
  state?: string;
  postalCode?: string;
}