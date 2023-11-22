import { Box } from "@mui/material";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import {
  GetAdminById,
  UpdateAdmin,
  GetAllRoles,
} from "../../services/Api/Api.jsx";
import { toast } from "react-toastify";
import { Button } from "primereact/button";
import { Card } from "primereact/card";

const EditAdmin = () => {
  const { id } = useParams();
  const [idData, setIdData] = React.useState({});
  const [roleList, setRoleList] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");

  //get role By ID
  useLayoutEffect(() => {
    GetAdminById(id)
      .then((res) => {
        setIdData(res.data.data);
        setSelectedRole(res.data.data.admin_roles.id);

        console.log("rolebyid", res.data.data);
        console.log("rolebyid===>", id);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }, [id]);

  const getRoleList = async () => {
    let res = await GetAllRoles();

    if (res?.status === 200) {
      setRoleList(res?.data?.data);
      console.log("roles", res?.data?.data);
    } else {
    }
  };
  useEffect(() => {
    getRoleList();
  }, []);

  const handleCategory = (e) => {
    e.preventDefault();
    console.log("Submit email:", idData.email);
    const role = e.target.value;
    setSelectedRole(role);
  };

  //update role api implementation
  const onChange = (e) => {
    console.log("onChange email:", e.target.value);
    setIdData({ ...idData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("admin_id", id);
    formData.append("name", idData?.name ? idData?.name : "");
    formData.append("email", idData?.email_id ? idData?.email_id : "");
    formData.append("role_id", selectedRole);

    UpdateAdmin(formData)
      .then((res) => {
        if (res.status === 200) {
          toast.success("Admin edited successfully!");
        }
        navigate("/adminList");
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          toast.error("Token expired!");
          localStorage.removeItem("adminToken");
          setTimeout(() => {
            navigate("/Login");
          }, 3000);
        } else {
          toast.error("Something went wrong");
        }
      });
  };

  const navigate = useNavigate();
  const navigateToRole = () => {
    navigate("/adminList");
  };
  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <h3 style={{ marginBottom: "60px" }}>Edit Admin</h3>
      </Box>
      <Card>
        <div>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                defaultValue={idData?.name}
                name="name"
                onChange={(e) => onChange(e)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                defaultValue={idData?.email_id}
                name="email_id"
                onChange={(e) => onChange(e)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Select Role :</Form.Label>

              <Form.Select
                aria-label="Default select example"
                value={selectedRole}
                onChange={(e) => handleCategory(e)}
                className="new_form_control"
              >
                {roleList.map((item, index) => (
                  <option key={index} value={item.id}>
                    {item?.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Form>
          <div className="button">
            <Button
              icon="pi pi-check"
              severity="success"
              type="submit"
              onClick={handleSubmit}
              style={{
                borderRadius: "10px",
                marginLeft: "10px",
                marginTop: "10px",
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
        </div>
      </Card>
    </Box>
  );
};

export default EditAdmin;
