import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { InputText } from "primereact/inputtext";
import { useNavigate, useParams } from "react-router-dom";
import {
  GetCommentsByBlogId,
  DeleteCommentByBlogId,
} from "../../services/Api/Api";
import { toast } from "react-toastify";
import { Button } from "primereact/button";

const CommentList = () => {
  const { blog_id } = useParams();
  const navigate = useNavigate();
  const [pageSize, setPageSize] = useState(50);
  const [dataGridHeight, setDataGridHeight] = useState("550px");
  const [roleData, setRoleData] = useState([]);
  const [menteeDataBackup, setMenteeDataBackup] = useState([]);
  const [anchorEl, setAnchorEl] = React.useState();
  const [userId, setUserId] = useState();
  const [userIdToNavigate, setUserIdToNavigate] = useState();

  const handleClick = (event, value) => {
    setUserIdToNavigate(value);
    setAnchorEl(event.currentTarget);
  };

  //get all specialist
  // ...

  //get all specialist
  const getData = async () => {
    try {
      // Pass the blog_id to the API function
      let result = await GetCommentsByBlogId(
        blog_id,
        localStorage.getItem("adminToken")
      );
      setRoleData(result.data.data.rows);
      setMenteeDataBackup(result.data.data.rows);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getData();
  }, [blog_id]);

  const onSearch = (e) => {
    const backupData = [...menteeDataBackup];
    const finalData = [];
    for (let item in backupData) {
      if (
        backupData[item].comment?.toLowerCase()?.includes(e?.toLowerCase()) ||
        backupData[item].commented_by?.name?.toLowerCase()?.includes(e?.toLowerCase()) ||
        backupData[item].id
          .toString()
          ?.toLowerCase()
          ?.includes(e?.toLowerCase())
      ) {
        finalData.push(backupData[item]);
      }

    }
    // setMenteeDataBackup(finalData);
    setRoleData(finalData)

  };

  //delete category
  const removeComment = async (e, comment_id) => {
    const confirmed = window.confirm(
      "Do you really want to delete this Comment?"
    );
    if (!confirmed) return;

    try {
      const result = await DeleteCommentByBlogId(
        comment_id,
        localStorage.getItem("adminToken")
      );

      toast.success("Comment deleted successfully!", {
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
        navigate(`/commentList/${blog_id}`);
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

  const columns = [
    { field: "id", headerName: "ID", width: 150 },
    {
      field: "User Name",
      headerName: "User Name",
      width: 350,
      headerClassName: "custom-header",
      cellClassName: "custom-cell",
      flex: 1,
      valueGetter: (params) => params.row.commented_by?.name || "",
    },
    {
      field: "comment",
      headerName: "Comment",
      width: 250,
      headerClassName: "custom-header",
      cellClassName: "custom-cell",
      flex: 1,
      // valueGetter: (params) => params.row.comment || "",
    },

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
              icon="pi pi-trash"
              rounded
              outlined
              severity="danger"
              onClick={(e) => removeComment(e, cellValues.id)}
            />
          </div>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <h3>Comment's List</h3>
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

export default CommentList;
