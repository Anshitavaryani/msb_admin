import { Box } from "@mui/material";
import React from "react";
import { useState } from "react";
import { Button } from "primereact/button";
import Form from "react-bootstrap/Form";
import { CreateCategory } from "../../services/Api/Api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Card } from "primereact/card";

const AddCategory = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!title) {
      toast.error("Please enter name");
      return;
    }
    if (!description) {
      toast.error("Please enter description");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);

      const response = await CreateCategory(formData);

      if (response.status === 200) {
        toast.success("Category added successfully");
      }
      navigate("/category");
    } catch (error) {
      if (error.response.status === 401) {
        toast.error("Token expired");
        localStorage.removeItem("adminToken");
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  const navigateToRole = () => {
    navigate("/category");
  };

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <h3 style ={{marginBottom:"50px"}}>Create New Category</h3>
      </Box>
      <Card>
        <div>
          <Form >
            <Form.Group className="mb-3">
              <Form.Label> Title</Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="Enter title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="new_form_control"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Description"
                value={description}
                required
                onChange={(e) => setDescription(e.target.value)}
                className="new_form_control"
              />
            </Form.Group>

            <div >
              <Button
                icon="pi pi-check"
                severity="success"
                type="submit"
                onClick={handleSubmit}
                style={{
                  borderRadius: "10px",
                  marginLeft: "10px",
                  marginTop: "10px",
                  // width:"10px"
                }}
              >
                Save
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

export default AddCategory;


