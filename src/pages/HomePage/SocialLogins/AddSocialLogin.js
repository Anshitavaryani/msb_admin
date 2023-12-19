import { Box } from "@mui/material";
import React from "react";
import { useState } from "react";
import { Button } from "primereact/button";
import Form from "react-bootstrap/Form";
import { CreateSocialLogin } from "../../../services/Api/Api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Card } from "primereact/card";
import CloseIcon from "@mui/icons-material/Close";
import imageCompression from "browser-image-compression";

const AddSocialLogin = () => {
  const [socialMediaName, setSocialMediaName] = useState("");
  const [redirectionUrl, setRedirectionUrl] = useState("");
  const [disable, setDisable] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setDisable(true);

    if (!socialMediaName) {
      setDisable(false);
      toast.error("Please enter Social Media Name");
      return;
    }
    if (!redirectionUrl) {
      setDisable(false);
      toast.error("Please enter Link");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("social_media_name", socialMediaName);
      formData.append("redirection_url", redirectionUrl);

      const response = await CreateSocialLogin(formData);

      if (response.status === 200) {
        toast.success("Social Media added successfully");
        navigate("/socialLogins");
      }
      setDisable(false);
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          toast.error("Token expired");
          localStorage.removeItem("adminToken");
          setTimeout(() => {
            navigate("/login");
          }, 1000);
        } else {
          toast.error("Something went wrong");
        }
      } else {
        toast.error("Network error");
      }
      setDisable(false);
    }
  };

  const navigateToRole = () => {
    navigate("/socialLogins");
  };

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <h3 style={{ marginBottom: "50px" }}>
          Create A New Social URL for your wesbite
        </h3>
      </Box>
      <Card>
        <div>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label> Social Media Name:</Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="Enter Social Media Name"
                value={socialMediaName}
                onChange={(e) => setSocialMediaName(e.target.value)}
                className="new_form_control"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label> Redirection Url:</Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="Enter Redirection Url"
                value={redirectionUrl}
                onChange={(e) => setRedirectionUrl(e.target.value)}
                className="new_form_control"
              />
            </Form.Group>

            <div>
              <Button
                icon="pi pi-check"
                severity="success"
                type="submit"
                onClick={handleSubmit}
                disabled={disable}
                style={{
                  borderRadius: "10px",
                  marginLeft: "10px",
                  marginTop: "10px",
                  // width:"10px"
                }}
              >
                {disable ? "Saving...." : "Save"}
              </Button>

              <Button
                icon="pi pi-times"
                severity="secondary"
                onClick={(e) => {
                  navigateToRole();
                }}
                style={{ borderRadius: "10px", marginLeft: "10px" }}
              >
                Cancel
              </Button>
            </div>
          </Form>
        </div>
      </Card>
    </Box>
  );
};

export default AddSocialLogin;
