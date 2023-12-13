import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import {
  GetAllSectionContent,
  DeleteSectionContent,
} from "../../../services/Api/Api";
import { toast } from "react-toastify";
import { BASE_URL_IMAGE } from "../../../services/Host";
import { BASE_URL_VIDEO } from "../../../services/Host";
import "./SectionContent.css";

const SectionContent = () => {
  const navigate = useNavigate();
  const [contentData, setContentData] = useState([]);

  //get content data
  const getData = async () => {
    try {
      let result = await GetAllSectionContent(
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
      const result = await DeleteSectionContent(
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

  const navigateToAddContent = () => {
    navigate("/addSectionContent");
  };

  const navigateToEditContent = (event, id) => {
    navigate(`/editSectionContent/${id}`);
  };

  return (
    <Box m="20px">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        marginBottom="30px"
      >
        <h3>Section Content</h3>
        <Box>
          <Button
            label=" Add More Section Content"
            icon="pi pi-plus"
            severity="success"
            onClick={navigateToAddContent}
            style={{ margin: "0px 10px" }}
          />
        </Box>
      </Box>
      {contentData.map((content) => (
        <div key={content.id} className="card" style={{ marginBottom: "10px" }}>
          <div className="card-body section_content">
            <div className="text_content">
              <p
                dangerouslySetInnerHTML={{
                  __html: content.section_content,
                }}
                class="card-text"
              ></p>
              <h5 class="card-title">Redirection URL :</h5>
              <p class="card-text">{content.redirection_url}</p>
            </div>

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

              {content.file_name && content.file_name.endsWith(".mp4") && (
                <video width="100%" height="auto" controls>
                  <source
                    src={`${BASE_URL_VIDEO}/${content.file_name}`}
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
          </div>
          <div className="section_content_buttons">
            <Button
              label="Edit Content"
              icon="pi pi-pencil"
              onClick={() => {
                navigate("/editSectionContent", {
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

export default SectionContent;
