import { $authHost, $host } from "./index";
export const getAvgRating = async (deviceId) => {
  const { data } = await $host.get("api/rating/", { params: { deviceId } });
  return data;
};

export const addRating = async (device) => {
  const { data } = await $authHost.post("api/rating/", device);
  return data;
};

export const getOneRating = async (deviceId) => {
  const { data } = await $authHost.get("api/rating/check", {
    params: { deviceId },
  });
  return data;
};
