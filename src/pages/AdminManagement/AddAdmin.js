import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import { Button } from "primereact/button";
import Form from "react-bootstrap/Form";
import { CreateAdmin, GetAllRoles } from "../../services/Api/Api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Card } from "primereact/card";
import { SolutionOutlined } from "@ant-design/icons";
import { Steps } from "antd";

const AddAdmin = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [roleList, setRoleList] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");

  const navigate = useNavigate();

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
    const role = e.target.value;
    setSelectedRole(role);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!name) {
      toast.error("Please enter name");
      return;
    }
    if (!email) {
      toast.error("Please enter email");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      //   formData.append(
      //     "role_id",
      //     selectedRoleList.length > 0 ? selectedRoleList.join(",") : ""
      //   );
      formData.append("role_id", selectedRole);

      const response = await CreateAdmin(formData);

      if (response.status === 200) {
        toast.success("Admin added successfully");
      }
      navigate("/adminList");
    } catch (error) {
      if (error.response.status === 401) {
        toast.error("Token expired");
        localStorage.removeItem("adminToken");
        setTimeout(() => {
          navigate("/Login");
        }, 1000);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  const navigateToAdmin = () => {
    navigate("/adminList");
  };

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <h3 style={{ marginBottom: "50px" }}>Create New Admin</h3>
      </Box>
      <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
        <Card style={{ width: "70%" }}>
          <div>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label> Name</Form.Label>
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
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  className="new_form_control"
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
                  <option>Select Role</option>
                  {roleList.map((item, index) => {
                    return (
                      <option key={index} value={item.id}>
                        {item?.name}
                      </option>
                    );
                  })}
                </Form.Select>
              </Form.Group>

              <div>
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
                    navigateToAdmin();
                  }}
                  style={{ borderRadius: "10px", marginLeft: "10px" }}
                >
                  Cancel
                </Button>
              </div>
            </Form>
          </div>
        </Card>
        <Card
          className="admin_description"
          style={{ width: "30%", marginLeft: "10px" }}
        >
          <Steps
            direction="vertical"
            size="small"
            items={[
              {
                title: "ADMIN",
                status: "finish",
                icon: <SolutionOutlined />,
                description:"This role grants extensive access and permissions across all features and pages of the admin panel, including full control over content in the Dashboard,Admin Management,Home Page, Calculator, and Proposal sections",
              },
              {
                title: "SUB-ADMIN",
                status: "finish",
                icon: <SolutionOutlined />,
                description:"This role is more focused, allowing admins to view, edit, and delete content specifically in the Home Page, Calculator, and Proposal sections.",
              },
            ]}
          />
        </Card>
      </div>
    </Box>
  );
};

export default AddAdmin;
