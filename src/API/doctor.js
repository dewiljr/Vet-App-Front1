import axios from "axios";

const baseUrl = "https://vet-app-main.onrender.com";

export const getDoctors = async () => {
  const res = await axios.get(
    `${baseUrl}/v1/doctor/all`
  );
  return res.data.data;
};

export const deleteDoctor = async (id) => {
  const { res } = await axios.delete(
    `${baseUrl}/v1/doctor/${id}`
  );
  return res;
};

export const addDoctor = async (doctor) => {
  const res = await axios.post(
    `${baseUrl}/v1/doctor`,
    doctor
  );
  return res.data;
};

export const updateDoctorFunc = async (doctor) => {
  const res = await axios.put(
    `${baseUrl}/v1/doctor`,
    doctor
  );
  return res.data;
};

export const getAvailableDate = async () => {
  const res = await axios.get(
    `${baseUrl}/v1/available-date/all`
  );
  return res.data.data;
};

export const deleteAvailableDate = async (id) => {
  const { res } = await axios.delete(
    `${baseUrl}/v1/available-date/${id}`
  );
  return res;
};

export const addAvailableDate = async (availableDate) => {
  const res = await axios.post(
    `${baseUrl}/v1/available-date`,
    availableDate
  );
  return res.data;
};

export const updateAvailableDateFunc = async (availableDate) => {
  const res = await axios.put(
    `${baseUrl}/v1/available-date`,
    availableDate
  );
  return res.data;
};

export const getDoctorByName = async (name) => {
  const res = await axios.get(
    `${baseUrl}/v1/doctor/${name}`
  );
  return res.data.data;
};
