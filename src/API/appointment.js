import axios from "axios";

const baseUrl = "https://vet-app-main.onrender.com";

export const getDoctors = async () => {
  const res = await axios.get(
    `${baseUrl}/v1/doctor/all`
  );
  return res.data.data;
};

export const getAnimals = async () => {
  const res = await axios.get(
    `${baseUrl}/v1/animal/all`
  );
  return res.data.data;
};

export const getAppointments = async () => {
  const res = await axios.get(
    `${baseUrl}/v1/appointment/all`
  );
  return res.data.data;
};

export const deleteAppointment = async (id) => {
  const { res } = await axios.delete(
    `${baseUrl}/v1/appointment/${id}`
  );
  return res;
};

export const addAppointment = async (appointment) => {
  const res = await axios.post(
    `${baseUrl}/v1/appointment`,
    appointment
  );
  return res.data;
};

export const updateAppointmentFunc = async (appointment) => {
  const res = await axios.put(
    `${baseUrl}/v1/appointment`,
    appointment
  );
  return res.data;
};

export const getAppointmentByDoctorAndDate = async (
  doctorName,
  startDate,
  endDate
) => {
  const res = await axios.get(
    `${baseUrl}/v1/appointment/filtered?doctorName=${doctorName}&startDate=${startDate}&endDate=${endDate}`
  );
  return res.data.data;
};

export const getAppointmentByAnimalAndDate = async (
  animalName,
  startDate,
  endDate
) => {
  const res = await axios.get(
    `${baseUrl}/v1/appointment/filter?animalName=${animalName}&startDate=${startDate}&endDate=${endDate}`
  );
  return res.data.data;
};
