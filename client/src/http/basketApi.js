import { $authHost, $host } from "./index";

export const addToBasket = async (device) => {
  const { data } = await $authHost.post("api/basket/", device);
  return data;
};

export const fetchBasket = async () => {
  const { data } = await $authHost.get("api/basket");
  return data;
};

export const deleteOneBasket = async (id) => {
  const { data } = await $authHost.delete("api/basket/" + id);
  return data;
};
export const deleteAll = async () => {
  const { data } = await $authHost.delete("api/basket");
  return data;
};

export const increment = async (deviceId) => {
  const { data } = await $authHost.put("api/basket/increment", { deviceId });
  return data;
};

export const decrement = async (deviceId) => {
  const { data } = await $authHost.put("api/basket/decrement", { deviceId });
  return data;
};
