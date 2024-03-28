import axios from "axios";


const baseUrl = `https://vet-app-main.onrender.com`;

export const getCustomers = async () => {
  const res = await axios.get(
    `${baseUrl}/v1/customer/all`
  );
  return res.data.data;
};

export const getAnimals = async () => {
  const res = await axios.get(
    `${baseUrl}/v1/animal/all`
  );
  return res.data.data;
};

export const deleteAnimal = async (id) => {
  const { res } = await axios.delete(
    `${baseUrl}/v1/animal/${id}`
  ); 
  return res;
};

export const addAnimal = async (animal) => {
  const res = await axios.post(
    `${baseUrl}/v1/animal`,
    animal
  );
  return res.data;
};

export const updateAnimalFunc = async (animal) => {
  const res = await axios.put(
    `${baseUrl}/v1/animal`,
    animal
  );
  return res.data;
};

export const getAnimalByName = async (name) => {
  const res = await axios.get(
    `${baseUrl}/v1/animal/${name}`
  );
  return res.data.data;
};

export const getAnimalByCustomerName = async (name) => {
  const res = await axios.get(
    `${baseUrl}/v1/animal/customer/${name}`
  );
  return res.data.data;
};
