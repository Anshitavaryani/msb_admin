import { Box } from "@mui/material";
import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { AddUser } from "../../services/Api/Api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddCustomer = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!name || !email) {
      toast.error("Please enter name and email");
      return;
    }

    try {
      const response = await AddUser({
        email: email,
        name: name,
      });

      if (response.status === 200) {
        toast.success("User added successfully");
      }
      setTimeout(() => {
        navigate("/customers");
      }, 1000);
    } catch (error) {
      if (error.response && error.response.status === 500) {
        toast.error("Email already exists");
      } else if (error.response.status == 401) {
        toast.error("Token expired");
        localStorage.removeItem("adminToken");
        setTimeout(() => {
          navigate("/Login");
        }, 3000);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  const navigateToUser = () => {
    navigate("/customers");
  };

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <h3>Create New Customer</h3>
      </Box>
      <div >
        <Form className="form">
          <Form.Group className="mb-3">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              required
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="new_form_control"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              className="new_form_control"
            />
          </Form.Group>

          <div className="row new_button">
            <Button
              className="add_new_button1"
              variant="primary"
              type="submit"
              onClick={(e) => {
                handleSubmit(e);
              }}
            >
              Submit
            </Button>

            <Button
              variant="dark"
              className="add_new_button"
              type="submit"
              onClick={() => navigateToUser()}
            >
              Go Back
            </Button>
          </div>
        </Form>
      </div>
    </Box>
  );
};

export default AddCustomer;
