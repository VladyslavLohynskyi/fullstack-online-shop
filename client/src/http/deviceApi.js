import { $authHost, $host } from "./index";

export const createType = async (type) => {
  const { data } = await $authHost.post("api/type", type);

  return data;
};

export const fetchTypes = async () => {
  const { data } = await $host.get("api/type");
  return data;
};
export const deleteOneType = async (id) => {
  const { data } = await $authHost.delete("api/type/" + id);
  return data;
};
export const updateType = async (type) => {
  const { data } = await $authHost.put("api/type", type);
  return data;
};

export const createBrand = async (brand) => {
  const { data } = await $authHost.post("api/brand", brand);
  return data;
};

export const updateBrand = async (brand) => {
  const { data } = await $authHost.put("api/brand", brand);
  return data;
};

export const fetchBrands = async () => {
  const { data } = await $host.get("api/brand");
  return data;
};
export const deleteOneBrand = async (id) => {
  const { data } = await $authHost.delete("api/brand/" + id);
  return data;
};
export const createDevice = async (device) => {
  const { data } = await $authHost.post("api/device", device);
  return data;
};

export const fetchDevices = async (
  typeId,
  brandId,
  value,
  filter,
  page,
  limit = 5
) => {
  const { data } = await $host.get("api/device", {
    params: { typeId, brandId, value, filter, page, limit },
  });
  return data;
};

export const fetchOneDevice = async (id) => {
  const { data } = await $host.get("api/device/" + id);
  return data;
};

export const deleteOneDevice = async (id) => {
  const { data } = await $authHost.delete("api/device/" + id);
  return data;
};

export const updateDevice = async (device) => {
  const { data } = await $authHost.put("api/device/", device);
  return data;
};
