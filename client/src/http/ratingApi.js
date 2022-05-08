import { $authHost, $host } from "./index";
export const getOneRating = async (deviceId) => {
  const { data } = await $host.get("api/rating/", { params: { deviceId } });
  return data;
};

export const addRating = async (device) => {
  const { data } = await $authHost.post("api/rating/", device);
  return data;
};
