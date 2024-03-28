import { useState, useEffect } from "react";
import {
  getDoctors,
  getAppointments,
  deleteAppointment,
  addAppointment,
  updateAppointmentFunc,
  getAnimals,
  getAppointmentByDoctorAndDate,
  getAppointmentByAnimalAndDate,
} from "../../API/appointment";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import UpdateIcon from "@mui/icons-material/Update";
import "./Appointment.css";
import Snackbar from "@mui/joy/Snackbar";

function Appointment() {
  const [doctor, setDoctor] = useState([]);
  const [animal, setAnimal] = useState([]);
  const [animalName, setAnimalName] = useState("");
  const [appointment, setAppointment] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [openAlert, setOpenAlert] = useState({
    open: false,
    message: "",
    color: "danger",
  });
  const [endDate, setEndDate] = useState("");
  const [searchStartDate, setSearchStartDate] = useState("");
  const [searchEndDate, setSearchEndDate] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [reload, setReload] = useState(true);
  const [newAppointment, setNewAppointment] = useState({
    date: "",
    doctor: {},
    animal: {},
  });
  const [updateAppointment, setUpdateAppointment] = useState({
    date: "",
    doctor: {},
    animal: {},
  });

  useEffect(() => {
    // get all doctors
    getDoctors().then((res) => {
      setDoctor(res);
    });
    setReload(false);
  }, [reload]);

  useEffect(() => {
    // get all animals
    getAnimals().then((res) => {
      setAnimal(res);
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
    // delete appointment
    const id = event.currentTarget.id;
    deleteAppointment(id).then(() => {
      setReload(true);
    });
  };

  const handleNewAppointment = (event) => {
    // create new appointment
    setNewAppointment({
      ...newAppointment,
      [event.target.name]: event.target.value,
    });
  };

  const handleCreate = () => {
    // create new appointment
    addAppointment(newAppointment).then((res) => {
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
    setNewAppointment({
      date: "",
      doctor: {},
      animal: {},
    });
  };

  const handleUpdate = () => {
    // update appointment
    updateAppointmentFunc(updateAppointment).then((res) => {
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
    setUpdateAppointment({
      date: "",
      doctor: {},
      animal: {},
    });
  };

  const handleUpdateBtn = (appointment) => {
    // update appointment
    setUpdateAppointment(appointment);
  };

  const handleUpdateChange = (event) => {
    // update appointment
    setUpdateAppointment({
      ...updateAppointment,
      [event.target.name]: event.target.value,
    });
  };

  const handleSearchByDoctorAndDate = () => {
    // search appointment by doctor and date
    if (doctorName !== "" && startDate !== "" && endDate !== "") {
      getAppointmentByDoctorAndDate(doctorName, startDate, endDate).then(
        (res) => {
          if (res) {
            setAppointment(res);
          } else {
            setAppointment([]);
          }
        }
      );
    }
    setDoctorName("");
    setStartDate("");
    setEndDate("");
  };

  const handleSearchByAnimalAndDate = () => {
    // search appointment by animal and date
    if (animalName !== "" && searchStartDate !== "" && searchEndDate !== "") {
      getAppointmentByAnimalAndDate(
        animalName,
        searchStartDate,
        searchEndDate
      ).then((res) => {
        if (res) {
          setAppointment(res);
        } else {
          setAppointment([]);
        }
      });
    }
    setAnimalName("");
    setSearchStartDate("");
    setSearchEndDate("");
  };

  const handleResetTable = () => {
    // reset table
    setReload(true);
    setDoctorName("");
    setStartDate("");
    setEndDate("");
    setAnimalName("");
    setSearchStartDate("");
    setSearchEndDate("");
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
      <h1 className="appointment-title">Appointment Management</h1>
      <div className="search-area-appointment">
        <div>
          <h4 className="appointment-search-title-date">
            Search Appointment By Doctor And Date
          </h4>
          <input
            className="appointment-search-date"
            type="text"
            placeholder="Search by full doctor name"
            value={doctorName}
            onChange={(e) => setDoctorName(e.target.value)}
          />
          <input
            className="appointment-search-date"
            type="date"
            placeholder="Search by date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <input
            className="appointment-search-date"
            type="date"
            placeholder="Search by date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          <div className="buttons">
            <button
              className="search-btn"
              onClick={handleSearchByDoctorAndDate}
            >
              Search
            </button>
            <button
              className="reset-btn-appointment"
              onClick={handleResetTable}
            >
              Reset
            </button>
          </div>
        </div>
        <div>
          <h4 className="appointment-search-title-date">
            Search Appointment By Animal And Date
          </h4>
          <input
            className="appointment-search-date"
            type="text"
            placeholder="Search by full animal name"
            value={animalName}
            onChange={(e) => setAnimalName(e.target.value)}
          />
          <input
            className="appointment-search-date"
            type="date"
            value={searchStartDate}
            onChange={(e) => setSearchStartDate(e.target.value)}
          />
          <input
            className="appointment-search-date"
            type="date"
            value={searchEndDate}
            onChange={(e) => setSearchEndDate(e.target.value)}
          />
          <div className="buttons">
            <button
              className="search-btn"
              onClick={handleSearchByAnimalAndDate}
            >
              Search
            </button>
            <button
              className="reset-btn-appointment"
              onClick={handleResetTable}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
      <div className="appointment-container">
        <div className="appointment-table">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Doctor</th>
                <th>Animal</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointment?.map((appointment) => (
                <tr key={appointment.id}>
                  <td>{appointment.date}</td>
                  <td>{appointment.doctorName}</td>
                  <td>{appointment.animalName}</td>
                  <td className="appointment-actions">
                    <span
                      className="appointment-updateicon"
                      onClick={() => handleUpdateBtn(appointment)}
                    >
                      <UpdateIcon />
                    </span>
                    <span
                      className="appointment-icon"
                      onClick={handleDelete}
                      id={appointment.id}
                    >
                      <PersonRemoveIcon />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="appointment-forms">
            <div className="appointment-newappointment">
              <h2>New Appointment</h2>

              <input
                type="dateTime-local"
                placeholder="Date"
                name="date"
                value={newAppointment.date}
                onChange={handleNewAppointment}
              />
              <select
                name="doctor"
                required
                value={newAppointment.doctor.id || ""}
                onChange={(e) =>
                  setNewAppointment({
                    ...newAppointment,
                    doctor: { id: e.target.value },
                  })
                }
              >
                <option value="" disabled>
                  Bir doktor seçiniz
                </option>
                {doctor?.map((doctor) => (
                  <option key={doctor.id} value={doctor.id}>
                    {doctor.name}
                  </option>
                ))}
              </select>
              <select
                name="animal"
                required
                value={newAppointment.animal.id || ""}
                onChange={(e) =>
                  setNewAppointment({
                    ...newAppointment,
                    animal: { id: e.target.value },
                  })
                }
              >
                <option value="" disabled>
                  Bir hayvan seçiniz
                </option>
                {animal?.map((animal) => (
                  <option key={animal.id} value={animal.id}>
                    {animal.name}
                  </option>
                ))}
              </select>

              <button className="animal-btn" onClick={handleCreate}>
                Add
              </button>
            </div>
            <div className="appointment-updateappointment">
              <h2>Update Appointment</h2>

              <input
                type="dateTime-local"
                placeholder="Date"
                name="date"
                value={updateAppointment.date}
                onChange={handleUpdateChange}
              />
              <select
                name="doctor"
                required
                value={
                  updateAppointment.doctor && updateAppointment.doctor.id
                    ? updateAppointment.doctor.id
                    : ""
                }
                onChange={(e) => {
                  setUpdateAppointment({
                    ...updateAppointment,
                    doctor: { id: e.target.value },
                  });
                }}
              >
                <option value="" disabled>
                  Bir doktor seçiniz
                </option>
                {doctor?.map((doctor) => (
                  <option key={doctor.id} value={doctor.id}>
                    {doctor.name}
                  </option>
                ))}
              </select>
              <select
                name="animal"
                required
                value={
                  updateAppointment.animal && updateAppointment.animal.id
                    ? updateAppointment.animal.id
                    : ""
                }
                onChange={(e) => {
                  setUpdateAppointment({
                    ...updateAppointment,
                    animal: { id: e.target.value },
                  });
                }}
              >
                <option value="" disabled>
                  Bir hayvan seçiniz
                </option>
                {animal?.map((animal) => (
                  <option key={animal.id} value={animal.id}>
                    {animal.name}
                  </option>
                ))}
              </select>

              <button className="appointment-btn" onClick={handleUpdate}>
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Appointment;
