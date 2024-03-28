import axios from "axios";
const baseUrl = "https://vet-app-main.onrender.com";

export const getVaccines = async () => {
  const res = await axios.get(
    `${baseUrl}/v1/vaccine/all`
  );
  return res.data.data;
};

export const getReports = async () => {
  const res = await axios.get(
    `${baseUrl}/v1/report/all`
  );
  return res.data.data;
};

export const getAppointments = async () => {
  const res = await axios.get(
    `${baseUrl}/v1/appointment/all`
  );
  return res.data.data;
};

export const deleteReport = async (id) => {
  const { res } = await axios.delete(
    `${baseUrl}/v1/report/${id}`
  );
  return res;
};

export const addReport = async (report) => {
  const res = await axios.post(
    `${baseUrl}/v1/report`,
    report
  );
  return res.data;
};

export const updateReportFunc = async (report) => {
  const res = await axios.put(
    `${baseUrl}/v1/report`,
    report
  );
  return res.data;
};
