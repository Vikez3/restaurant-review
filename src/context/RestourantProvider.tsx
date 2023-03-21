import React, { useState } from "react";
import { RestaurantType } from "../interfaces/types";
import { RestaurantContext } from "./RestourantContext";

type Props = {
  children: React.ReactNode;
  data: RestaurantType[];
};

export default function RestaurantProvider({ children, data }: Props) {
  const [resData, setResData] = useState<RestaurantType[]>(data);

  const updateRes = () => {
    fetch("https://restourants.herokuapp.com/restaurants")
      .then((res) => res.json())
      .then((data) => setResData(data))
      .then(() => resData?.map((res) => ({ ...res, isFavourite: false })));
  };

  const updateData = (res: RestaurantType[]) => {
    setResData(res);
  };

  const porviderValue = {
    data: resData,
    updateData: updateData,
    updateRes: updateRes,
  };

  return (
    <RestaurantContext.Provider value={porviderValue}>
      {children}
    </RestaurantContext.Provider>
  );
}
