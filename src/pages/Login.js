import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { AdminLogin } from "../services/Api/Api";
import "./Login.scss";
import { Button } from "primereact/button";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  async function onSubmit(e) {
    try {
      e.preventDefault();

      let result = await AdminLogin(formData);

      if (result.status === 200) {
        localStorage.setItem("adminToken", result?.data?.data?.token);
        toast.success(" Logged In !", {
          position: "top-right",
          autoClose: 500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (error) {
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
  }

  return (
    <div className="LoginContainer">
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
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              // value={password}
              onChange={(e) => onChange(e)}
              type="password"
              placeholder="Password"
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
                marginBottom:"10px",
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
