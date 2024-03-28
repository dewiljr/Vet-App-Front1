import { useState, useEffect } from "react";
import {
  getAppointments,
  deleteReport,
  addReport,
  updateReportFunc,
  getReports,
} from "../../API/report";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import UpdateIcon from "@mui/icons-material/Update";
import "./Report.css";
import Snackbar from "@mui/joy/Snackbar";

function Report() {
  const [report, setReport] = useState([]);
  const [appointment, setAppointment] = useState([]);
  const [reload, setReload] = useState(true);
  const [openAlert, setOpenAlert] = useState({
    open: false,
    message: "",
    color: "danger",
  });
  const [newReport, setNewReport] = useState({
    title: "",
    diagnosis: "",
    price: 0.0,
    appointment: {},
  });
  const [updateReport, setUpdateReport] = useState({
    title: "",
    diagnosis: "",
    price: 0.0,
    appointment: {},
  });

  useEffect(() => {
    // get all reports
    getReports().then((res) => {
      setReport(res);
    });
    setReload(false);
  }, [reload]);

  useEffect(() => {
    // get all appointments
    getAppointments().then((res) => {
      setAppointment(res);
    });
    setReload(false);
  }, [reload]);

  const handleDelete = (event) => {
    // delete report
    const id = event.currentTarget.id;
    deleteReport(id).then(() => {
      setReload(true);
    });
  };

  const handleNewReport = (event) => {
    // create new report
    setNewReport({
      ...newReport,
      [event.target.name]: event.target.value,
    });
  };

  const handleCreate = () => {
    // create new report
    addReport(newReport).then((res) => {
      if (res.status === false) {
        setOpenAlert({ open: true, message: res.message, color: "danger" });
        setTimeout(() => {
          setOpenAlert({ open: false, message: "" });
        }, 3000);
        return;
      } else {
        setOpenAlert({
          open: true,
          message: "İşlem Başarılı",
          color: "success",
        });
        setTimeout(() => {
          setOpenAlert({ open: false, message: "" });
        }, 3000);
      }
      setReload(true);
    });
    setNewReport({
      title: "",
      diagnosis: "",
      price: 0.0,
      appointment: {},
    });
  };

  const handleUpdate = () => {
    // update report
    updateReportFunc(updateReport).then((res) => {
      if (res.status === false) {
        setOpenAlert({ open: true, message: res.message, color: "danger" });
        setTimeout(() => {
          setOpenAlert({ open: false, message: "" });
        }, 3000);
        return;
      } else {
        setOpenAlert({
          open: true,
          message: "İşlem Başarılı",
          color: "success",
        });
        setTimeout(() => {
          setOpenAlert({ open: false, message: "" });
        }, 3000);
      }
      setReload(true);
    });
    setUpdateReport({
      title: "",
      diagnosis: "",
      price: 0.0,
      appointment: {},
    });
  };

  const handleUpdateBtn = (report) => {
    // update report
    setUpdateReport(report);
  };

  const handleUpdateChange = (event) => {
    // update report
    setUpdateReport({
      ...updateReport,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <>
      <Snackbar
        open={openAlert.open}
        autoHideDuration={3000}
        color={openAlert.color}
        variant="outlined"
      >
        ! {openAlert.message}
      </Snackbar>
      <h1 className="report-title">Report Management</h1>
      <div className="report-container">
        <div className="report-table">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Diagnosis</th>
                <th>Price</th>
                <th>Appointment Date</th>

                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {report?.map((report) => (
                <tr key={report.id}>
                  <td>{report.title}</td>
                  <td>{report.diagnosis}</td>
                  <td>{report.price}</td>
                  <td>{report.appointment.date}</td>

                  <td className="appointment-actions">
                    <span
                      className="appointment-updateicon"
                      onClick={() => handleUpdateBtn(report)}
                    >
                      <UpdateIcon />
                    </span>
                    <span
                      className="appointment-icon"
                      onClick={handleDelete}
                      id={report.id}
                    >
                      <PersonRemoveIcon />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="report-forms">
            <div className="report-newreport">
              <h2>New Report</h2>
              <input
                type="text"
                placeholder="Title"
                name="title"
                value={newReport.title}
                onChange={handleNewReport}
              />
              <input
                type="text"
                placeholder="Diagnosis"
                name="diagnosis"
                value={newReport.diagnosis}
                onChange={handleNewReport}
              />
              <input
                type="number"
                placeholder="Price"
                name="price"
                value={newReport.price}
                onChange={handleNewReport}
              />
              <select
                name="appointment"
                required
                value={newReport.appointment.id || ""}
                onChange={(e) =>
                  setNewReport({
                    ...newReport,
                    appointment: { id: e.target.value },
                  })
                }
              >
                <option value="" disabled>
                  Select an Appointment
                </option>
                {appointment?.map((appointment) => (
                  <option key={appointment.id} value={appointment.id}>
                    {appointment.date} - {appointment.doctorName} -{" "}
                    {appointment.animalName}
                  </option>
                ))}
              </select>

              <button className="report-btn" onClick={handleCreate}>
                Add
              </button>
            </div>
            <div className="report-updatereport">
              <h2>Update Report</h2>
              <input
                type="text"
                placeholder="Title"
                name="title"
                value={updateReport.title}
                onChange={handleUpdateChange}
              />
              <input
                type="text"
                placeholder="Diagnosis"
                name="diagnosis"
                value={updateReport.diagnosis}
                onChange={handleUpdateChange}
              />
              <input
                type="number"
                placeholder="Price"
                name="price"
                value={updateReport.price}
                onChange={handleUpdateChange}
              />
              <select
                name="appointment"
                required
                value={
                  updateReport.appointment && updateReport.appointment.id
                    ? updateReport.appointment.id
                    : ""
                }
                onChange={(e) => {
                  setUpdateReport({
                    ...updateReport,
                    appointment: { id: e.target.value },
                  });
                }}
              >
                <option value="" disabled>
                  Select an Appointment
                </option>
                {appointment?.map((appointment) => (
                  <option key={appointment.id} value={appointment.id}>
                    {appointment.date} - {appointment.doctorName} -{" "}
                    {appointment.animalName}
                  </option>
                ))}
              </select>

              <button className="report-btn" onClick={handleUpdate}>
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Report;
