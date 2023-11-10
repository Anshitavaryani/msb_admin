import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { GetUsers, DeleteUser } from "../../services/Api/Api";
import { toast } from "react-toastify";
import { InputText } from "primereact/inputtext";
import "./Customers.css";

const Customers = () => {
  const [pageSize, setPageSize] = useState(50);
  const [dataGridHeight, setDataGridHeight] = useState("550px");
  const [userData, setUserData] = useState([]);
  const [anchorEl, setAnchorEl] = React.useState();
  const [userId, setUserId] = useState();
  const [userIdToNavigate, setUserIdToNavigate] = useState();
  const [globalFilter, setGlobalFilter] = useState(null);
  const [menteeDataBackup, setMenteeDataBackup] = useState([]);
  const navigate = useNavigate();

  const handleClick = (event, value) => {
    setUserIdToNavigate(value);
    setAnchorEl(event.currentTarget);
  };

  //get all user
  const getData = async () => {
    try {
      let result = await GetUsers(localStorage.getItem("adminToken"));
      setUserData(result.data.data);
      setMenteeDataBackup(result.data.data);
      console.log("user", result.data.data);
    } catch (e) {
      console.log(e);
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
    const confirmed = window.confirm(
      "Do you really want to delete this mentee?"
    );
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
      width: 250,
      flex: 1,
      headerClassName: "custom-header",
      cellClassName: "custom-cell",
    },
    {
      field: "image",
      headerName: "Image",
      width: 250,
      flex: 1,
      headerClassName: "custom-header",
      cellClassName: "custom-cell",
      sortable: false,
      renderCell: (cellValues) => {
        const attachments = cellValues.row.attachements;
        if (attachments && attachments.length > 0) {
          const attachment = attachments[0];
          const imageUrl = `https://node.mystorybank.info:4000${attachment.file_uri}/${attachment.file_name}`;
          return (
            <div>
              <img
                src={imageUrl}
                alt="User profile"
                className="category-icon-preview_in_list"
                style={{ width: "100px", height: "60px" }}
              />
            </div>
          );
        } else {
          // Handle the case where there are no attachments for the user
          return <div>No Image Available</div>;
        }
      },
    },
    {
      field: "email",
      headerName: "Email",
      width: 350,
      headerClassName: "custom-header",
      cellClassName: "custom-cell",
      flex: 1,
    },
    {
      field: "action",
      headerName: "Actions",
      headerClassName: "custom-header",
      cellClassName: "custom-cell",
      width: "350",
      flex: 1,
      sortable: false,

      renderCell: (cellValues) => {
        return (
          <div>
            <Button
              icon="pi pi-trash"
              rounded
              outlined
              severity="danger"
              onClick={(e) => removeUser(e, cellValues.id)}
            />
          </div>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        {/* <Header title="USER MANAGEMENT" subtitle="Create Category" /> */}
        <h3> Manage Customers</h3>
        <Box>
          <span className="p-input-icon-left">
            <i className="pi pi-search" />
            <InputText
              type="search"
              // onInput={(e) => setGlobalFilter(e.target.value)}
              onChange={(e) => {
                onSearch(e.target.value);
              }}
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
          // marginLeft: "10%",
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
    </Box>
  );
};

export default Customers;
