import { Categories } from "./categories";
import { Reviews } from "./reviews";
import { Subcategories } from "./subcategories";

export interface Products {
  _id?: string;
  name?: string;
  description?: string;
  price?: number;
  priceAfterDiscount?: number;
  ratingAverage?: number;
  ratingCount?: number;
  sold?: number;
  quantity?: number;
  cover?: string;
  images?: string[];
  category?: Categories;
  subcategory?: Subcategories;
  reviews?: Reviews[];
}
