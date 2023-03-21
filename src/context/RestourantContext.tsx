import { createContext } from "react";
import { RestaurantType } from "../interfaces/types";

export type ContextType = {
  data: RestaurantType[];
  updateData: (res: RestaurantType[]) => void;
  updateRes: () => void;
};

export const RestaurantContext = createContext({} as ContextType);
