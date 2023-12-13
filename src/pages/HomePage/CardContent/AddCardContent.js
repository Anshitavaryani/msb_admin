import { Box } from "@mui/material";
import React from "react";
import { useState } from "react";
import { Button } from "primereact/button";
import Form from "react-bootstrap/Form";
import { CreateCardContent } from "../../../services/Api/Api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Card } from "primereact/card";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const AddCardContent = () => {
  const [cardContent, setCardContent] = useState("");
  const [redirectionUrl, setRedirectionUrl] = useState("");
  const [disable, setDisable] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setDisable(true);

    if (!cardContent) {
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
      formData.append("card_content", cardContent);
      formData.append("redirection_url", redirectionUrl);

      const response = await CreateCardContent(formData);

      if (response.status === 200) {
        toast.success("Card Content added successfully");
        navigate("/cardContent");
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

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setCardContent(data);
  };

  const navigateToRole = () => {
    navigate("/cardContent");
  };

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <h3 style={{ marginBottom: "50px" }}>Create A New Card Content</h3>
      </Box>
      <Card>
        <div>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Card Content:</Form.Label>

              <CKEditor
                editor={ClassicEditor}
                onChange={handleEditorChange}
                config={{
                  height: "1000px",
                }}
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

export default AddCardContent;
