import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ChangeAdminPassword } from "../../services/Api/Api";
import { toast } from "react-toastify";
import "./ChangePassword.css"

const ChangePassword = () => {
  const navigate = useNavigate();
  const navigateToDashboard = () => {
    navigate("/");
  };

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if(oldPassword?.length == 0 || newPassword?.length == 0 || confirmPassword?.length == 0){
      toast.error("Please enter valid input", {
        position: "top-right",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return
    };

    if(newPassword  != confirmPassword){
      toast.error("Please enter valid input", {
        position: "top-right",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    };
    
    const formData = new FormData();
    formData.append("old_password", oldPassword);
    formData.append("new_password", newPassword);
    formData.append("confirm_Password", confirmPassword);
    console.log("formdata====>", formData);

    try{

      const res = await ChangeAdminPassword(formData);
      if(res?.status == 200){
        toast.success(" Password changed !", {
          position: "top-right",
          autoClose: 500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }else{
        toast.error(res?.data?.message, {
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

    }catch (error) {
      toast.error(error?.response?.data?.message, {
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
  };

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <h3 style={{marginLeft:"560px",marginTop:"130px"}}>CHANGE PASSWORD</h3>
      </Box>
      <Form className="form">
        <Form.Group className="mb-3">
          <Form.Label>Current Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Current Password"
            onChange={(event) => {
              setOldPassword(event.target.value);
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="password"
            placeholder=" New Password"
            onChange={(event) => {
              setNewPassword(event.target.value);
            }}
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            onChange={(event) => {
              setConfirmPassword(event.target.value);
            }}
          />
        </Form.Group>

        <Button
          variant="primary"
          className="mx-3"
          type="submit"
          onClick={(e) => {
            handleChangePassword(e);
          }}
        >
          Change Password
        </Button>
        <Button
          onClick={(e) => {
            navigateToDashboard();
          }}
          variant="dark"
        >
          Go back
        </Button>
      </Form>
    </Box>
  );
};

export default ChangePassword;
