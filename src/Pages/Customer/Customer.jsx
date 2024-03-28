import { useState, useEffect } from "react";
import {
  getCustomers,
  deleteCustomer,
  addCustomer,
  updateCustomerFunc,
  getCustomerByName,
} from "../../API/customer";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import UpdateIcon from "@mui/icons-material/Update";
import "./Customer.css";
import Snackbar from "@mui/joy/Snackbar";

function Customer() {
  const [customer, setCustomer] = useState([]);
  const [reload, setReload] = useState(true);
  const [openAlert, setOpenAlert] = useState({
    open: false,
    message: "",
    color: "danger",
  });

  const [search, setSearch] = useState("");
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    phone: "",
    mail: "",
    address: "",
    city: "",
  });
  const [updateCustomer, setUpdateCustomer] = useState({
    name: "",
    phone: "",
    mail: "",
    address: "",
    city: "",
  });

  useEffect(() => {
    // get all customers
    getCustomers().then((res) => {
      setCustomer(res);
    });
    setReload(false);
  }, [reload]);

  const handleDelete = (event) => {
    // delete customer
    const id = event.currentTarget.id;
    deleteCustomer(id).then(() => {
      setReload(true);
    });
  };

  const handleNewCustomer = (event) => {
    // add new customer
    setNewCustomer({ ...newCustomer, [event.target.name]: event.target.value });
  };

  const handleCreate = () => {
    // add new customer
    addCustomer(newCustomer).then((res) => {
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
    setNewCustomer({
      name: "",
      phone: "",
      mail: "",
      address: "",
      city: "",
    });
  };

  const handleUpdate = () => {
    // update customer
    updateCustomerFunc(updateCustomer).then((res) => {
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
    setUpdateCustomer({
      name: "",
      phone: "",
      mail: "",
      address: "",
      city: "",
    });
  };

  const handleUpdateBtn = (customer) => {
    // update customer
    setUpdateCustomer(customer);
  };

  const handleUpdateChange = (event) => {
    // update customer
    setUpdateCustomer({
      ...updateCustomer,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    // search customer by name
    if (search !== "") {
      getCustomerByName(search).then((res) => {
        if (res) {
          setCustomer(res);
        } else {
          setCustomer([]);
        }
      });
    } else {
      getCustomers().then((res) => {
        if (res) {
          setCustomer(res);
        } else {
          setCustomer([]);
        }
      });
    }
  }, [search]);

  const handleResetTable = () => {
    setReload(true);
    setSearch("");
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
      <h1 className="customer-title">Customer Management</h1>

      <div className="search-area-customer">
        <div>
          <h4 className="customer-search-title">Search Customer</h4>
          <input
            className="customer-search"
            type="text"
            placeholder="Search by full name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button className="customer-reset" onClick={handleResetTable}>
          Reset
        </button>
      </div>

      <div className="customer-container">
        <div className="customer-table">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Mail</th>
                <th>Address</th>
                <th>City</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {customer?.map((customer) => (
                <tr key={customer.id}>
                  <td>{customer.name}</td>
                  <td>{customer.phone}</td>
                  <td>{customer.mail}</td>
                  <td>{customer.address}</td>
                  <td>{customer.city}</td>
                  <td className="customer-actions">
                    <span
                      className="customer-updateicon"
                      onClick={() => handleUpdateBtn(customer)}
                    >
                      <UpdateIcon />
                    </span>
                    <span
                      className="customer-icon"
                      onClick={handleDelete}
                      id={customer.id}
                    >
                      <PersonRemoveIcon />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="customer-forms">
            <div className="customer-newcustomer">
              <h2>New Customer</h2>
              <input
                type="text"
                placeholder="Name"
                name="name"
                value={newCustomer.name}
                onChange={handleNewCustomer}
              />
              <input
                type="text"
                placeholder="Phone"
                name="phone"
                value={newCustomer.phone}
                onChange={handleNewCustomer}
              />
              <input
                type="text"
                placeholder="Mail"
                name="mail"
                value={newCustomer.mail}
                onChange={handleNewCustomer}
              />
              <input
                type="text"
                placeholder="Address"
                name="address"
                value={newCustomer.address}
                onChange={handleNewCustomer}
              />
              <input
                type="text"
                placeholder="City"
                name="city"
                value={newCustomer.city}
                onChange={handleNewCustomer}
              />
              <button className="customer-btn" onClick={handleCreate}>
                Add
              </button>
            </div>
            <div className="customer-updatecustomer">
              <h2>Update Customer</h2>
              <input
                type="text"
                placeholder="Name"
                name="name"
                value={updateCustomer.name}
                onChange={handleUpdateChange}
              />
              <input
                type="text"
                placeholder="Phone"
                name="phone"
                value={updateCustomer.phone}
                onChange={handleUpdateChange}
              />
              <input
                type="text"
                placeholder="Mail"
                name="mail"
                value={updateCustomer.mail}
                onChange={handleUpdateChange}
              />
              <input
                type="text"
                placeholder="Address"
                name="address"
                value={updateCustomer.address}
                onChange={handleUpdateChange}
              />
              <input
                type="text"
                placeholder="City"
                name="city"
                value={updateCustomer.city}
                onChange={handleUpdateChange}
              />
              <button className="customer-btn" onClick={handleUpdate}>
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Customer;
