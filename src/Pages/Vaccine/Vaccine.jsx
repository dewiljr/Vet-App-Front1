import { useState, useEffect } from "react";
import {
  getAnimals,
  getReports,
  deleteVaccine,
  addVaccine,
  updateVaccineFunc,
  getVaccines,
  getVaccineByName,
  getVaccineByAnimal,
  getVaccineByDate,
} from "../../API/vaccine";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import UpdateIcon from "@mui/icons-material/Update";
import "./Vaccine.css";
import Snackbar from "@mui/joy/Snackbar";

function Vaccine() {
  const [report, setReport] = useState([]);
  const [animal, setAnimal] = useState([]);
  const [vaccine, setVaccine] = useState([]);
  const [openAlert, setOpenAlert] = useState({
    open: false,
    message: "",
    color: "danger",
  });
  const [animalName, setAnimalName] = useState("");
  const [protectionStartDate, setProtectionStartDate] = useState("");
  const [protectionEndDate, setProtectionEndDate] = useState("");
  const [search, setSearch] = useState("");
  const [reload, setReload] = useState(true);
  const [newVaccine, setNewVaccine] = useState({
    name: "",
    code: "",
    protectionStartDate: "",
    protectionEndDate: "",
    animal: {},
    report: {},
  });
  const [updateVaccine, setUpdateVaccine] = useState({
    name: "",
    code: "",
    protectionStartDate: "",
    protectionEndDate: "",
    animal: {},
    report: {},
  });

  useEffect(() => {
    // get all vaccines
    getVaccines().then((res) => {
      setVaccine(res);
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
    // get all reports
    getReports().then((res) => {
      setReport(res);
    });
    setReload(false);
  }, [reload]);

  const handleDelete = (event) => {
    // delete vaccine
    const id = event.currentTarget.id;
    deleteVaccine(id).then(() => {
      setReload(true);
    });
  };

  const handleNewVaccine = (event) => {
    // create new vaccine
    setNewVaccine({
      ...newVaccine,
      [event.target.name]: event.target.value,
    });
  };

  const handleCreate = () => {
    // create new vaccine
    addVaccine(newVaccine).then((res) => {
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
    console.log(newVaccine);
    setNewVaccine({
      name: "",
      code: "",
      protectionStartDate: "",
      protectionEndDate: "",
      animal: {},
      report: {},
    });
  };

  const handleUpdate = () => {
    // update vaccine
    updateVaccineFunc(updateVaccine).then((res) => {
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
    setUpdateVaccine({
      name: "",
      code: "",
      protectionStartDate: "",
      protectionEndDate: "",
      animal: {},
      report: {},
    });
  };

  const handleUpdateBtn = (vaccine) => {
    // update vaccine
    setUpdateVaccine(vaccine);
  };

  const handleUpdateChange = (event) => {
    // update vaccine
    setUpdateVaccine({
      ...updateVaccine,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    // get vaccine by name
    if (search !== "") {
      getVaccineByName(search).then((res) => {
        if (res) {
          setVaccine(res);
        } else {
          setVaccine([]);
        }
      });
    } else {
      getVaccines().then((res) => {
        if (res) {
          setVaccine(res);
        } else {
          setVaccine([]);
        }
      });
    }
  }, [search]);

  useEffect(() => {
    // get vaccine by animal
    if (animalName !== "") {
      getVaccineByAnimal(animalName).then((res) => {
        if (res) {
          setVaccine(res);
        } else {
          setVaccine([]);
        }
      });
    } else {
      getVaccines().then((res) => {
        if (res) {
          setVaccine(res);
        } else {
          setVaccine([]);
        }
      });
    }
  }, [animalName]);

  const handleSearchByDate = () => {
    // get vaccine by date
    if (protectionStartDate !== "" && protectionEndDate !== "") {
      getVaccineByDate(protectionStartDate, protectionEndDate).then((res) => {
        if (res) {
          setVaccine(res);
        } else {
          setVaccine([]);
        }
      });
    }
    setProtectionStartDate("");
    setProtectionEndDate("");
  };
  const handleResetTable = () => {
    // reset table
    setReload(true);
    setSearch("");
    setAnimalName("");
    setProtectionStartDate("");
    setProtectionEndDate("");
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
      <h1 className="vaccine-title">Vaccine Management</h1>
      <div className="search-area-vaccine">
        <div>
          <h4 className="vaccine-search-title">Search Vaccine</h4>
          <input
            className="vaccine-search"
            type="text"
            placeholder="Search by full name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onClick={() => setAnimalName("")}
          />
        </div>
        <div>
          <h4 className="vaccine-search-title">
            Search Vaccine By Animal Name
          </h4>
          <input
            className="vaccine-search-animal"
            type="text"
            placeholder="Search by full animal name"
            value={animalName}
            onChange={(e) => setAnimalName(e.target.value)}
            onClick={() => setSearch("")}
          />
        </div>
        <div>
          <h4 className="vaccine-search-title-date">Search Vaccine By Date</h4>
          <input
            className="vaccine-search-date"
            type="date"
            placeholder="Search by date"
            value={protectionStartDate}
            onChange={(e) => setProtectionStartDate(e.target.value)}
          />

          <input
            className="vaccine-search-date"
            type="date"
            placeholder="Search by date"
            value={protectionEndDate}
            onChange={(e) => setProtectionEndDate(e.target.value)}
          />
        </div>
        <div>
          <button className="search-btn" onClick={handleSearchByDate}>
            Search
          </button>
          <button className="reset-btn" onClick={handleResetTable}>
            Reset
          </button>
        </div>
      </div>
      <div className="vaccine-container">
        <div className="vaccine-table">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Code</th>
                <th>Protection Start Date</th>
                <th>Protection End Date</th>
                <th>Animal Name</th>
                <th>Report Title</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {vaccine?.map((vaccine) => (
                <tr key={vaccine.id}>
                  <td>{vaccine.name}</td>
                  <td>{vaccine.code}</td>
                  <td>{vaccine.protectionStartDate}</td>
                  <td>{vaccine.protectionEndDate}</td>
                  <td>{vaccine.animalName}</td>
                  <td>{vaccine.reportTitle}</td>
                  <td className="vaccine-actions">
                    <span
                      className="vaccine-updateicon"
                      onClick={() => handleUpdateBtn(vaccine)}
                    >
                      <UpdateIcon />
                    </span>
                    <span
                      className="vaccine-icon"
                      onClick={handleDelete}
                      id={vaccine.id}
                    >
                      <PersonRemoveIcon />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="vaccine-forms">
            <div className="vaccine-newvaccine">
              <h2>Add New Vaccine</h2>
              <input
                type="text"
                placeholder="Name"
                name="name"
                value={newVaccine.name}
                onChange={handleNewVaccine}
              />
              <input
                type="text"
                placeholder="Code"
                name="code"
                value={newVaccine.code}
                onChange={handleNewVaccine}
              />
              <input
                type="date"
                placeholder="Protection Start Date"
                name="protectionStartDate"
                value={newVaccine.protectionStartDate}
                onChange={handleNewVaccine}
              />
              <input
                type="date"
                placeholder="Protection End Date"
                name="protectionEndDate"
                value={newVaccine.protectionEndDate}
                onChange={handleNewVaccine}
              />
              <select
                name="animal"
                required
                value={
                  newVaccine.animal && newVaccine.animal.id
                    ? newVaccine.animal.id
                    : ""
                }
                onChange={(e) => {
                  setNewVaccine({
                    ...newVaccine,
                    animal: { id: e.target.value },
                  });
                }}
              >
                <option value="">Bir hayvan seçiniz</option>
                {animal?.map((animal) => (
                  <option key={animal.id} value={animal.id}>
                    {animal.name}
                  </option>
                ))}
              </select>
              <select
                name="report"
                required
                value={
                  newVaccine.report && newVaccine.report.id
                    ? newVaccine.report.id
                    : ""
                }
                onChange={(e) => {
                  setNewVaccine({
                    ...newVaccine,
                    report: { id: e.target.value },
                  });
                }}
              >
                <option value="">Bir rapor seçiniz</option>
                {report?.map((report) => (
                  <option key={report.id} value={report.id}>
                    {report.title}
                  </option>
                ))}
              </select>
              <button onClick={handleCreate}>Add Vaccine</button>
            </div>
            <div className="vaccine-updatevaccine">
              <h2>Update Vaccine</h2>

              <input
                type="text"
                placeholder="Name"
                name="name"
                value={updateVaccine.name}
                onChange={handleUpdateChange}
              />
              <input
                type="text"
                placeholder="Code"
                name="code"
                value={updateVaccine.code}
                onChange={handleUpdateChange}
              />
              <input
                type="date"
                placeholder="Protection Start Date"
                name="protectionStartDate"
                value={updateVaccine.protectionStartDate}
                onChange={handleUpdateChange}
              />
              <input
                type="date"
                placeholder="Protection End Date"
                name="protectionEndDate"
                value={updateVaccine.protectionEndDate}
                onChange={handleUpdateChange}
              />
              <select
                name="animal"
                required
                value={
                  updateVaccine.animal && updateVaccine.animal.id
                    ? updateVaccine.animal.id
                    : ""
                }
                onChange={(e) => {
                  setUpdateVaccine({
                    ...updateVaccine,
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
              <select
                name="report"
                required
                value={
                  updateVaccine.report && updateVaccine.report.id
                    ? updateVaccine.report.id
                    : ""
                }
                onChange={(e) => {
                  setUpdateVaccine({
                    ...updateVaccine,
                    report: { id: e.target.value },
                  });
                }}
              >
                <option value="" disabled>
                  Bir rapor seçiniz
                </option>
                {report?.map((report) => (
                  <option key={report.id} value={report.id}>
                    {report.title}
                  </option>
                ))}
              </select>

              <button className="vaccine-btn" onClick={handleUpdate}>
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Vaccine;
