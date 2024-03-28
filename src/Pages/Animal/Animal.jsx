import { useState, useEffect } from "react";
import {
  getCustomers,
  getAnimals,
  deleteAnimal,
  addAnimal,
  updateAnimalFunc,
  getAnimalByName,
  getAnimalByCustomerName,
} from "../../API/animal";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import UpdateIcon from "@mui/icons-material/Update";
import "./Animal.css";
import Snackbar from "@mui/joy/Snackbar";

function Animal() {
  const [customer, setCustomer] = useState([]);
  const [animal, setAnimal] = useState([]);
  const [search, setSearch] = useState("");
  const [reload, setReload] = useState(true);
  const [openAlert, setOpenAlert] = useState({
    open: false,
    message: "",
    color: "danger",
  });
  const [customerName, setCustomerName] = useState("");
  const [newAnimal, setNewAnimal] = useState({
    name: "",
    species: "",
    breed: "",
    gender: "",
    color: "",
    dateOfBirth: "",
    customer: {},
  });
  const [updateAnimal, setUpdateAnimal] = useState({
    name: "",
    species: "",
    breed: "",
    gender: "",
    color: "",
    dateOfBirth: "",
    customer: {},
  });

  useEffect(() => {
    // get all customers
    getCustomers().then((res) => {
      setCustomer(res);
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

  const handleDelete = (event) => {
    // delete animal
    const id = event.currentTarget.id;
    deleteAnimal(id).then(() => {
      setReload(true);
    });
  };

  const handleNewAnimal = (event) => {
    // create new animal
    setNewAnimal({ ...newAnimal, [event.target.name]: event.target.value });
  };

  const handleCreate = () => {
    // add new animal
    addAnimal(newAnimal).then((res) => {
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
    setNewAnimal({
      name: "",
      species: "",
      breed: "",
      gender: "",
      color: "",
      dateOfBirth: "",
      customer: {},
    });
  };

  const handleUpdate = () => {
    // update animal
    updateAnimalFunc(updateAnimal).then((res) => {
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
    setUpdateAnimal({
      name: "",
      species: "",
      breed: "",
      gender: "",
      color: "",
      dateOfBirth: "",
      customer: {},
    });
  };

  const handleUpdateBtn = (animal) => {
    // update animal button
    setUpdateAnimal(animal);
  };

  const handleUpdateChange = (event) => {
    // update animal change
    setUpdateAnimal({
      ...updateAnimal,
      [event.target.name]: event.target.value,
    });
  };
  useEffect(() => {
    if (search !== "") {
      getAnimalByName(search).then((res) => {
        if (res) {
          setAnimal(res);
        } else {
          setAnimal([]);
        }
      });
    } else {
      getAnimals().then((res) => {
        if (res) {
          setAnimal(res);
        } else {
          setAnimal([]);
        }
      });
    }
  }, [search]);

  useEffect(() => {
    // get animal by customer name
    if (customerName !== "") {
      getAnimalByCustomerName(customerName).then((res) => {
        if (res) {
          setAnimal(res);
        } else {
          setAnimal([]);
        }
      });
    } else {
      getAnimals().then((res) => {
        if (res) {
          setAnimal(res);
        } else {
          setAnimal([]);
        }
      });
    }
  }, [customerName]);

  const handleResetTable = () => {
    // reset table
    setReload(true);
    setSearch("");
    setCustomerName("");
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
      <h1 className="animal-title">Animal Management</h1>
      <div className="search-area">
        <div>
          <h4 className="animal-search-title">Search Animal</h4>
          <input
            className="animal-search"
            type="text"
            placeholder="Search by full name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onClick={() => setCustomerName("")}
          />
        </div>
        <button className="animal-reset" onClick={handleResetTable}>
          Reset
        </button>
        <div>
          <h4 className="animal-search-title">
            Search Animal By Customer Name
          </h4>
          <input
            className="animal-search-customer"
            type="text"
            placeholder="Search by full customer name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            onClick={() => setSearch("")}
          />
        </div>
      </div>

      <div className="animal-container">
        <div className="animal-table">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Species</th>
                <th>Breed</th>
                <th>Gender</th>
                <th>Color</th>
                <th>Birthday</th>
                <th>Customer Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {animal?.map((animal) => (
                <tr key={animal.id}>
                  <td>{animal.name}</td>
                  <td>{animal.species}</td>
                  <td>{animal.breed}</td>
                  <td>{animal.gender}</td>
                  <td>{animal.color}</td>
                  <td>{animal.dateOfBirth}</td>
                  <td>{animal.customerName}</td>
                  <td className="animal-actions">
                    <span
                      className="animal-updateicon"
                      onClick={() => handleUpdateBtn(animal)}
                    >
                      <UpdateIcon />
                    </span>
                    <span
                      className="animal-icon"
                      onClick={handleDelete}
                      id={animal.id}
                    >
                      <PersonRemoveIcon />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="animal-forms">
            <div className="animal-newanimal">
              <h2>New Animal</h2>
              <input
                type="text"
                placeholder="Name"
                name="name"
                value={newAnimal.name}
                onChange={handleNewAnimal}
              />
              <input
                type="text"
                placeholder="Species"
                name="species"
                value={newAnimal.species}
                onChange={handleNewAnimal}
              />
              <input
                type="text"
                placeholder="Breed"
                name="breed"
                value={newAnimal.breed}
                onChange={handleNewAnimal}
              />
              <input
                type="text"
                placeholder="Gender"
                name="gender"
                value={newAnimal.gender}
                onChange={handleNewAnimal}
              />
              <input
                type="text"
                placeholder="Color"
                name="color"
                value={newAnimal.color}
                onChange={handleNewAnimal}
              />
              <input
                type="date"
                placeholder="DateOfBirth"
                name="dateOfBirth"
                value={newAnimal.dateOfBirth}
                onChange={handleNewAnimal}
              />
              <select
                name="customer"
                required
                value={newAnimal.customer.id || ""}
                onChange={(e) =>
                  setNewAnimal({
                    ...newAnimal,
                    customer: { id: e.target.value },
                  })
                }
              >
                <option value="" disabled>
                  Bir müşteri seçiniz
                </option>
                {customer?.map((customer) => (
                  <option key={customer.id} value={customer.id}>
                    {customer.name}
                  </option>
                ))}
              </select>

              <button className="animal-btn" onClick={handleCreate}>
                Add
              </button>
            </div>
            <div className="animal-updateanimal">
              <h2>Update Animal</h2>
              <input
                type="text"
                placeholder="Name"
                name="name"
                value={updateAnimal.name}
                onChange={handleUpdateChange}
              />
              <input
                type="text"
                placeholder="Species"
                name="species"
                value={updateAnimal.species}
                onChange={handleUpdateChange}
              />
              <input
                type="text"
                placeholder="Breed"
                name="breed"
                value={updateAnimal.breed}
                onChange={handleUpdateChange}
              />
              <input
                type="text"
                placeholder="Gender"
                name="gender"
                value={updateAnimal.gender}
                onChange={handleUpdateChange}
              />
              <input
                type="text"
                placeholder="Color"
                name="color"
                value={updateAnimal.color}
                onChange={handleUpdateChange}
              />
              <input
                type="date"
                placeholder="DateOfBirth"
                name="dateOfBirth"
                value={updateAnimal.dateOfBirth}
                onChange={handleUpdateChange}
              />
              <select
                name="customer"
                required
                value={
                  updateAnimal.customer && updateAnimal.customer.id
                    ? updateAnimal.customer.id
                    : ""
                }
                onChange={(e) => {
                  setUpdateAnimal({
                    ...updateAnimal,
                    customer: { id: e.target.value },
                  });
                }}
              >
                <option value="" disabled>
                  Bir müşteri seçiniz
                </option>
                {customer?.map((customer) => (
                  <option key={customer.id} value={customer.id}>
                    {customer.name}
                  </option>
                ))}
              </select>

              <button className="animal-btn" onClick={handleUpdate}>
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Animal;
