import { $authHost, $host } from "./index";
export const getOneRating = async (id) => {
  const { data } = await $host.get("api/rating/", { deviceId: id });
  return data;
};
