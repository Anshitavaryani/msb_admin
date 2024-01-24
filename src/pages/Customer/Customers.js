import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { GetUsers, DeleteUser } from "../../services/Api/Api";
import { toast } from "react-toastify";
import { InputText } from "primereact/inputtext";
import "./Customers.css";
import axios from "axios";
import { BASE_URL } from "../../services/Host";
import { Select } from "@mui/material";

const Customers = () => {
  const [pageSize, setPageSize] = useState(50);
  const [dataGridHeight, setDataGridHeight] = useState("550px");
  const [userData, setUserData] = useState([]);
  const [anchorEl, setAnchorEl] = React.useState();
  const [userId, setUserId] = useState();
  const [userIdToNavigate, setUserIdToNavigate] = useState();
  const [globalFilter, setGlobalFilter] = useState(null);
  const [menteeDataBackup, setMenteeDataBackup] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleClick = (event, value) => {
    setUserIdToNavigate(value);
    setAnchorEl(event.currentTarget);
  };

  //get all user
  const getData = async () => {
    try {
      setLoading(true);
      let result = await GetUsers(localStorage.getItem("adminToken"));
      setUserData(result.data.data);
      setMenteeDataBackup(result.data.data);
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 401) {
        setErrorMessage("You do not have access to this page as a sub-admin.");
      } else {
        setErrorMessage("Error loading data. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  //Code to get dynamic height
  useEffect(() => {
    // Update dataGridHeight based on the pageSize value
    if (pageSize === 50) {
      setDataGridHeight("550px");
    } else if (pageSize === 75) {
      setDataGridHeight("700px");
    } else if (pageSize === 100) {
      setDataGridHeight("850px");
    } else {
      // Set a default height if pageSize is not 10 or 15
      setDataGridHeight("550px");
    }
  }, [pageSize]);

  const removeUser = async (e, user_id) => {
    const confirmed = window.confirm("Do you really want to delete this User?");
    if (!confirmed) return;

    try {
      const result = await DeleteUser(
        user_id,
        localStorage.getItem("adminToken")
      );
      toast.success("User deleted successfully!", {
        position: "top-right",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      window.location.reload(true);
      setTimeout(() => {
        navigate("/customers");
      }, 3000);
    } catch (error) {
      if (error.response.status == 401) {
        toast.error("Token expired", {
          position: "top-right",
          autoClose: 500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      localStorage.removeItem("adminToken");
      setTimeout(() => {
        navigate("/Login");
      }, 3000);
    }
  };

  const navigateToAddUser = () => {
    navigate("/addCustomer");
  };

  const navigateToViewUser = (event, id) => {
    navigate(`/viewCustomer/${id}`);
  };

  const onSearch = (e) => {
    const backupData = [...menteeDataBackup];
    const finalData = [];
    for (let item in backupData) {
      if (
        // backupData[item].email_id?.includes(search) ||
        backupData[item].name?.toLowerCase()?.includes(e?.toLowerCase()) ||
        backupData[item].id
          .toString()
          ?.toLowerCase()
          ?.includes(e?.toLowerCase())
      ) {
        finalData.push(backupData[item]);
      }
      console.log("items=====>", backupData[item]);
    }
    setUserData(finalData);
    console.log("finalData=====>", finalData);
  };

  const updateStatus = async (user_id, user_status) => {
    try {
      const response = await axios.post(
        `${BASE_URL}admin/updateUserStatus`,
        {
          user_id: user_id,
          user_status: user_status,
        },
        {
          headers: {
            "x-access-token": `${localStorage.getItem("adminToken")}`,
          },
        }
      );
      // Handle success
      console.log(response.data);
      console.log("User status updated successfully");
      window.location.reload(true);
    } catch (error) {
      // Handle error
      console.error("Error updating status:", error);
    }
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 100,
      headerClassName: "custom-header",
      cellClassName: "custom-cell",
    },
    {
      field: "name",
      headerName: "Name",
      width: 150,
      flex: 1,
      headerClassName: "custom-header",
      cellClassName: "custom-cell",
    },
    {
      field: "email",
      headerName: "Email",
      width: 450,
      headerClassName: "custom-header",
      cellClassName: "custom-cell",
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      headerClassName: "custom-header",
      cellClassName: "custom-cell",
      width: 150,
      flex: 1,
      renderCell: (cellValues) => {
        const handleStatusChange = async (event) => {
          const newStatus = event.target.value;
          updateStatus(cellValues.row.id, newStatus);
          console.log(cellValues);
          console.log("statuss=====>", newStatus); // Use newStatus instead of cellValues.status
        };

        return (
          <Select
            native
            value={cellValues.row.user_status}
            onChange={handleStatusChange}
          >
            <option value="ACTIVATE">ACTIVATE</option>
            <option value="DEACTIVATE">DEACTIVATE</option>
          </Select>
        );
      },
    },
    {
      field: "action",
      headerName: "Actions",
      headerClassName: "custom-header",
      cellClassName: "custom-cell",
      width: "250",
      flex: 1,
      sortable: false,

      renderCell: (cellValues) => {
        return (
          <div>
            <Button
              icon="pi pi-file"
              rounded
              outlined
              className="mr-2"
              style={{ margin: "0px " }}
              onClick={(event) => navigateToViewUser(event, cellValues.id)}
            />
            <Button
              icon="pi pi-trash"
              rounded
              outlined
              severity="danger"
              style={{ margin: "0px 10px" }}
              onClick={(e) => removeUser(e, cellValues.id)}
            />
          </div>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      {loading && <p style={{ fontSize: "16px" }}>Loading...</p>}
      {errorMessage && (
        <p style={{ color: "red", fontWeight: "bold", fontSize: "20px" }}>
          {errorMessage}
        </p>
      )}

      {!loading && !errorMessage && (
        <>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <h3> Manage Customers</h3>
            <Box>
              <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText
                  type="search"
                  onChange={(e) => onSearch(e.target.value)}
                  placeholder="Search..."
                />
              </span>
              <Button
                label=" Add New User"
                icon="pi pi-plus"
                severity="success"
                onClick={navigateToAddUser}
                style={{ margin: "0px 10px" }}
              />
            </Box>
          </Box>
          <div
            style={{
              height: dataGridHeight,
              width: "100%",
              marginTop: "20px",
            }}
          >
            <DataGrid
              rows={userData}
              columns={columns}
              pageSize={pageSize}
              rowHeight={80}
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              rowsPerPageOptions={[50, 75, 100]}
              experimentalFeatures={{ newEditingApi: true }}
              onSelectionModelChange={(id) => {
                const selectedIDs = new Set([id]);
                const selectedRowData = userData.filter((row) =>
                  selectedIDs.has(row.id.toString())
                );
                setUserId(selectedIDs);
              }}
            />
          </div>
        </>
      )}
    </Box>
  );
};

export default Customers;
