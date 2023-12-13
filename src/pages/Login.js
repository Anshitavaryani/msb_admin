import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { AdminLogin } from "../services/Api/Api";
import "./Login.scss";
import { Button } from "primereact/button";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  async function onSubmit(e) {
    try {
      e.preventDefault();

      let result = await AdminLogin(formData);

      if (result.status === 200) {
        toast.success("Logged In!", {
          position: "top-right",
          autoClose: 500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        localStorage.setItem("adminToken", result?.data?.data?.token);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (error) {
      console.error("Error in onSubmit:", error);

      if (error.response && error.response.status === 401) {
        toast.error("Invalid Password!", {
          position: "top-right",
          autoClose: 500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else if (error.response && error.response.status === 404) {
        toast.error("Email Doesn't exist", {
          position: "top-right",
          autoClose: 500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.error("Please Enter Required Fields", {
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
    }
  }

  return (
    <div className="LoginContainer">
      <ToastContainer />
      <div className="Login">
        <div className="Login_Container">
          <h1 style={{ marginBottom: "30px", marginTop: "30px" }}>
            ADMIN LOGIN
          </h1>
          {/* <h5 style={{}}>Please enter your login and password!</h5> */}
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              name="email"
              // value={email_id}
              onChange={(e) => onChange(e)}
              type="email"
              placeholder="Enter email"
            />
          </Form.Group>
          <Form.Group className="mb-3" style={{ position: "relative" }}>
            <Form.Label >Password</Form.Label>
            <div
              className="password-toggle-icon"
              onClick={handleTogglePassword}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </div>
            <Form.Control
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"

              onChange={(e) => onChange(e)}
            />
          </Form.Group>
          <div style={{ marginLeft: "100px" }}>
            <Button
              severity="secondary"
              onClick={(e) => {
                onSubmit(e);
              }}
              style={{
                borderRadius: "10px",
                marginTop: "10px",
                marginBottom: "10px",
                height: "40px",
                width: "80%",
                // backgroundColor: "#8f001e",
                paddingLeft: "140px",
                border: "#8f001e",
              }}
            >
              SIGN IN
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
