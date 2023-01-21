import { createContext, useContext, useState } from "react";
import { pricePerItem } from "../constants";

const OrderDetails = createContext();

export const useOrderDetails = () => {
  const contextValue = useContext(OrderDetails);

  if (!contextValue) {
    throw new Error ("useOrderDetails must be called within an OrderDetailsProvider");
  }

  return contextValue;
}

export const OrderDetailsProvider = (props) => {
  const [ optionCounts, setOptionCounts ] = useState({ scoops: {}, toppings: {} });

  const updateItemCount = (itemName, newItemCount, optionType) => {
    const newOptionCounts = { ...optionCounts };

    newOptionCounts[optionType][itemName] = newItemCount

    setOptionsCounts(newOptionCounts);
  }

  const resetOrder = () => {
    setOptionCounts({ scoops: {}, toppings: {} });
  }

  const calculateTotal = (optionType) => {
    const countsArray = Object.values(optionCounts[optionType]);

    const totalCount = countsArray.reduce((total, value) => total + value, 0);

    return totalCount * pricePerItem[optionType];
  }

  const total = {
    scoops: calculateTotal("scoops"),
    toppings: calculateTotal("toppings")
  }

  const value = { optionCounts, total, updateItemCount, resetOrder };
  return <OrderDetails.Provider value={value} {...props} />;
}
