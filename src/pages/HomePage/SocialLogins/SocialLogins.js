import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import {
  GetAllSocialLogin,
  DeleteSocialLogin,
} from "../../../services/Api/Api";
import { toast } from "react-toastify";
import { DataGrid } from "@mui/x-data-grid";

const SocialLogins = () => {
  const navigate = useNavigate();
  const [contentData, setContentData] = useState("");
  const [pageSize, setPageSize] = useState(50);
  const [dataGridHeight, setDataGridHeight] = useState("550px");


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
  }, [pageSize])
  //get content data
  const getData = async () => {
    try {
      let result = await GetAllSocialLogin(localStorage.getItem("adminToken"));
      setContentData(result.data.data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const removeContent = async (e, content_id) => {
    const confirmed = window.confirm(
      "Do you really want to delete this Content?"
    );
    if (!confirmed) return;

    try {
      const result = await DeleteSocialLogin(
        content_id,
        localStorage.getItem("adminToken")
      );

      toast.success("Content deleted successfully!", {
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
        navigate("/socialLogins");
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

  const navigateToAddSocialLogin = () => {
    navigate("/addSocialLogin");
  };

  const navigateToEditContent = (event, id) => {
    navigate(`/editSocialLogin/${id}`);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 150 },
    {
      field: "social_media_name",
      headerName: "Media Name",
      width: 350,
      headerClassName: "custom-header",
      cellClassName: "custom-cell",
      flex: 1,
    },

    {
      field: "redirection_url",
      headerName: "Link",
      width: 350,
      headerClassName: "custom-header",
      cellClassName: "custom-cell",
      // flex: 1,
    },

    // {
    //   field: "image",
    //   headerName: "Icon",
    //   width: 150,
    //   flex: 1,
    //   headerClassName: "custom-header",
    //   cellClassName: "custom-cell",
    //   sortable: false,
    //   renderCell: (cellValues) => {
    //     const attachment = cellValues.row;
    //     const imageUrl = `https://node.mystorybank.info:4000${attachment.file_uri}/${attachment.file_name}`;

    //     if (imageUrl) {
    //       return (
    //         <div>
    //           <img
    //             src={imageUrl}
    //             alt="Category Icon"
    //             className="category-icon-preview_in_list"
    //             style={{ width: "100px", height: "60px" }}
    //           />
    //         </div>
    //       );
    //     } else {
    //       // Handle the case where there are no attachments for the user
    //       return <div>No Image Available</div>;
    //     }
    //   },
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
              icon="pi pi-pencil"
              rounded
              outlined
              className="mr-2"
              style={{ margin: "0px 10px" }}
              onClick={(event) => navigateToEditContent(event, cellValues.id)}
            />
            <Button
              icon="pi pi-trash"
              rounded
              outlined
              severity="danger"
              onClick={(e) => removeContent(e, cellValues.id)}
            />
          </div>
        );
      },
    },
  ];
  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <h3>Social Media List</h3>
        {/* <Box>
          <Button
            label=" Add New Social Media"
            icon="pi pi-plus"
            severity="success"
            onClick={navigateToAddSocialLogin}
            style={{ margin: "0px 10px" }}
          />
        </Box> */}
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
          rows={contentData}
          columns={columns}
          pageSize={pageSize}
          rowHeight={80}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[50, 75, 100]}
          experimentalFeatures={{ newEditingApi: true }}
          onSelectionModelChange={(id) => {
            const selectedIDs = new Set([id]);
            const selectedRowData = contentData.filter((row) =>
              selectedIDs.has(row.id.toString())
            );
            setContentData(selectedIDs);
          }}
        />
      </div>
    </Box>
  );
};

export default SocialLogins;
