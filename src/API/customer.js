import axios from "axios";

const baseUrl = "https://vet-app-main.onrender.com";

export const getCustomers = async () => {
  const res = await axios.get(
    `${baseUrl}/v1/customer/all`
  );
  return res.data.data;
};

export const deleteCustomer = async (id) => {
  const { res } = await axios.delete(
    `${baseUrl}/v1/customer/${id}`
  );
  return res;
};

export const addCustomer = async (customer) => {
  const res = await axios.post(
    `${baseUrl}/v1/customer`,
    customer
  );
  return res.data;
};

export const updateCustomerFunc = async (customer) => {
  const res = await axios.put(
    `${baseUrl}/v1/customer`,
    customer
  );
  return res.data;
};

export const getCustomerByName = async (name) => {
  const res = await axios.get(
    `${baseUrl}/v1/customer/${name}`
  );
  return res.data.data;
};
