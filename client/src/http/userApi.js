import { $authHost, $host } from "./index";
import jwt_decode from "jwt-decode";

export const registration = async (email, password) => {
  const { data } = await $host.post("api/user/registration", {
    email,
    password,
  });
  localStorage.setItem("token", data.token);
  return jwt_decode(data.token);
};
export const changeRole = async (email, role) => {
  const { data } = await $authHost.post("api/user/change", {
    email,
    role,
  });

  return data;
};
export const login = async (email, password) => {
  const { data } = await $host.post("api/user/login", {
    email,
    password,
  });
  localStorage.setItem("token", data.token);
  return jwt_decode(data.token);
};

export const check = async () => {
  const { data } = await $authHost.get("api/user/auth");
  localStorage.setItem("token", data.token);
  return jwt_decode(data.token);
};

export const getByCriteria = async (criteria) => {
  const { data } = await $authHost.get("api/user/" + criteria);
  return data;
};

export const getUser = async (email) => {
  const { data } = await $authHost.get("api/user/", { params: { email } });
  return data;
};
