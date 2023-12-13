import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { GetAllCardContent,DeleteCardContent } from "../../../services/Api/Api";
import { toast } from "react-toastify";
import "./CardContent.css"

const CardContent = () => {
  const navigate = useNavigate();
  const [contentData, setContentData] = useState([]);

  //get content data
  const getData = async () => {
    try {
      let result = await GetAllCardContent(localStorage.getItem("adminToken"));
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
      const result = await DeleteCardContent(
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
    navigate("/addCardContent");
  };

  const navigateToEditContent = (event, id) => {
    navigate(`/editCardContent/${id}`);
  };


  return (
    <Box m="20px">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        marginBottom="30px"
      >
        <h3>Card Content</h3>
        <Box>
          <Button
            label=" Add More Card Content"
            icon="pi pi-plus"
            severity="success"
            onClick={navigateToAddContent}
            style={{ margin: "0px 10px" }}
          />
        </Box>
      </Box>
      <div className="row">
        {contentData.map((content, index) => (
          <div className="col-sm-6" key={index}>
            <div className="card" style={{ height: "350px" }}>
              <div className="card-body">
                <p
                  dangerouslySetInnerHTML={{
                    __html: content.card_content,
                  }}
                  className="card-text"
                ></p>
                <h5 className="card-title" style={{marginTop:"10px"}}>Redirection Url:</h5>

                <p className="card-text">{content.redirection_url}</p>
                <div className="add_section_button_container" >
                  <Button
                  className="edit_section_button_container" 
                    label="Edit Content"
                    icon="pi pi-pencil"
                    onClick={() => {
                      navigate('/editCardContent', {
                        state: { data: content }, // Change content.data to content
                      });
                    }}
                    style={{
                      margin: "0px 10px",
                      borderRadius: "3px",
                      height: "40px",
                    }}
                  ></Button>
                  <Button
                   className="delete_section_button_container" 
                    label="Delete Content"
                    icon="pi pi-times"
                    severity="danger"
                    onClick={(e) => removeContent(e, content.id)}
                    style={{
                      margin: "0px 10px",
                      borderRadius: "3px",
                      height: "40px",
                    }}
                  ></Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Box>
  );
};

export default CardContent;
