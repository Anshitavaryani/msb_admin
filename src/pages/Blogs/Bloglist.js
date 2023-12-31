import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { InputText } from "primereact/inputtext";
import { useNavigate } from "react-router-dom";
import { GetAllBlogs, DeleteBlog } from "../../services/Api/Api";
import { toast } from "react-toastify";
import { Button } from "primereact/button";

const Categorylist = () => {
  const navigate = useNavigate();
  const [pageSize, setPageSize] = useState(50);
  const [dataGridHeight, setDataGridHeight] = useState("550px");
  const [roleData, setRoleData] = useState([]);
  const [anchorEl, setAnchorEl] = React.useState();
  const [userId, setUserId] = useState();
  const [userIdToNavigate, setUserIdToNavigate] = useState();
  const [menteeDataBackup, setMenteeDataBackup] = useState([]);

  const handleClick = (event, value) => {
    setUserIdToNavigate(value);
    setAnchorEl(event.currentTarget);
  };

  //get all specialist
  const getData = async () => {
    try {
      let result = await GetAllBlogs(localStorage.getItem("adminToken"));
      setRoleData(result.data.data);
      setMenteeDataBackup(result.data.data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const onSearch = (e) => {
    const backupData = [...menteeDataBackup];
    const finalData = [];
    for (let item in backupData) {
      if (
        // backupData[item].email_id?.includes(search) ||
        backupData[item].heading?.toLowerCase()?.includes(e?.toLowerCase()) ||
        backupData[item].id
          .toString()
          ?.toLowerCase()
          ?.includes(e?.toLowerCase())
      ) {
        finalData.push(backupData[item]);
      }
  
    }
    setRoleData(finalData);

  };

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

  //delete category
  const removeRole = async (e, blog_id) => {
    const confirmed = window.confirm(
      "Do you really want to delete this Story?"
    );
    if (!confirmed) return;

    try {
      const result = await DeleteBlog(
        blog_id,
        localStorage.getItem("adminToken")
      );

      toast.success("Story deleted successfully!", {
        position: "top-right",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTimeout(() => {
        navigate("/stories");
      }, 3000);
    } catch (error) {
      if (error.response.status === 401) {
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

  const navigateToAddBlog = () => {
    navigate("/addStory");
  };
  const navigateToEditBlog = (event, id) => {
    navigate(`/editStory/${id}`);
  };

  const navigateToViewBlog = (event, id) => {
    navigate(`/viewStory/${id}`);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 150 },
    {
      field: "heading",
      headerName: "Heading",
      width: 350,
      headerClassName: "custom-header",
      cellClassName: "custom-cell",
      // flex: 1,
    },
    {
      field: "type",
      headerName: "Type",
      width: 250,
      headerClassName: "custom-header",
      cellClassName: "custom-cell",
      flex: 1,
    },
    {
      field: "views_count",
      headerName: "Views Count",
      width: 250,
      headerClassName: "custom-header",
      cellClassName: "custom-cell",
      flex: 1,
    },
  
    // {
    //   field: "category",
    //   headerName: "Category",
    //   width: 350,
    //   headerClassName: "custom-header",
    //   cellClassName: "custom-cell",
    //   flex: 1,
    //   valueGetter: (params) =>
    //     params.row.Categories.map((category) => category.title).join(", "),
    // },

    {
      field: "action",
      headerName: "Actions",
      headerClassName: "custom-header",
      cellClassName: "custom-cell",
      width: "350",
      flex: 1,
      renderCell: (cellValues) => {
        return (
          <div>
            <Button
              icon="pi pi-file"
              rounded
              outlined
              className="mr-2"
              style={{ margin: "0px " }}
              onClick={(event) => navigateToViewBlog(event, cellValues.id)}
            />
            <Button
              icon="pi pi-pencil"
              rounded
              outlined
              className="mr-2"
              style={{ margin: "0px 10px" }}
              onClick={(event) => navigateToEditBlog(event, cellValues.id)}
            />
            <Button
              icon="pi pi-trash"
              rounded
              outlined
              severity="danger"
              onClick={(e) => removeRole(e, cellValues.id)}
            />
          </div>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <h3>Stories List</h3>
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
            label=" Add New Story"
            icon="pi pi-plus"
            severity="success"
            onClick={navigateToAddBlog}
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
          rows={roleData}
          columns={columns}
          pageSize={pageSize}
          rowHeight={80}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[50, 75, 100]}
          experimentalFeatures={{ newEditingApi: true }}
          onSelectionModelChange={(id) => {
            const selectedIDs = new Set([id]);
            const selectedRowData = roleData.filter((row) =>
              selectedIDs.has(row.id.toString())
            );
            setUserId(selectedIDs);
          }}
        />
      </div>
    </Box>
  );
};

export default Categorylist;
