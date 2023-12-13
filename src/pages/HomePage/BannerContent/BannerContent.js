import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import {
  GetAllBannerContent,
  DeleteBannerContent,
} from "../../../services/Api/Api";
import { toast } from "react-toastify";
import { BASE_URL_IMAGE } from "../../../services/Host";

const BannerContent = () => {
  const navigate = useNavigate();
  const [contentData, setContentData] = useState([]);

  //get content data
  const getData = async () => {
    try {
      let result = await GetAllBannerContent(
        localStorage.getItem("adminToken")
      );
      setContentData(result.data.data);
      console.log("contentdata=>", result.data.data);
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
      const result = await DeleteBannerContent(
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
        navigate("/bannerContent");
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

  const navigateToAddContent = () => {
    navigate("/addBannerContent");
  };

  const navigateToEditContent = (event, id) => {
    navigate(`/editBannerContent/${id}`);
  };

  return (
    <Box m="20px">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        marginBottom="30px"
      >
        <h3>Banner Content</h3>
        <Box>
          <Button
            label=" Add More Banner Content"
            icon="pi pi-plus"
            severity="success"
            onClick={navigateToAddContent}
            style={{ margin: "0px 10px" }}
          />
        </Box>
      </Box>
      {contentData.map((content) => (
        <div
          key={content.id}
          className="card"
          style={{ marginBottom: "10px", height: "300px" }}
        >
          <div >
            <div className="file_content">
              {content.file_name &&
                (content.file_name.endsWith(".jpg") ||
                  content.file_name.endsWith(".jpeg") ||
                  content.file_name.endsWith(".png")) && (
                  <img
                    src={`${BASE_URL_IMAGE}${content.file_name}`}
                    alt="Banner"
                    style={{ maxWidth: "100%", height: "auto" }}
                  />
                )}
            </div>
            {/* Overlay text */}
            <div
              style={{
                position: "absolute",
                top: "80%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                textAlign: "center",
                color: "white",
                textAign: "left",
                fontSize: "19px",
                margin:"90px 0px",
                width:"90%",
                marginLeft:"10px",
                marginRight:"10px"
              }}
            >
              <p
                dangerouslySetInnerHTML={{
                  __html: content.banner_content,
                }}
                // className="card-text"
              ></p>
            </div>
          </div>
          <div className="bannner_content_buttons" style={{marginTop:"20px"}}>
            <Button
              label="Edit Content"
              icon="pi pi-pencil"
              onClick={() => {
                navigate("/editBannerContent", {
                  state: { data: content },
                });
              }}
              style={{
                margin: "0px 10px",
                borderRadius: "3px",
                height: "40px",
              }}
            />
            <Button
              label="Delete Content"
              icon="pi pi-times"
              severity="danger"
              onClick={(e) => removeContent(e, content.id)}
              style={{
                margin: "0px 10px",
                borderRadius: "3px",
                height: "40px",
              }}
            />
          </div>
        </div>
      ))}
    </Box>
  );
};

export default BannerContent;
