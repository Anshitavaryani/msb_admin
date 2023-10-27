import React, { useEffect, useLayoutEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { Row, Col } from "react-bootstrap";
// import { GetAdminProfile } from "../../../Services/API/API";

const AdminProfile = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState([]);

  const navigateToAdminProfileEdit = () => {
    navigate("/editAdminProfile");
  };
  const navigateToDashboard = () => {
    navigate("/mentor");
  };

  //api call for get admin profile
//   const getData = async () => {
//     try {
//       let result = await GetAdminProfile();
//       setProfileData(result.data.data);
//     } catch (e) {
//       console.log(e);
//     }
//   };
//   useEffect(() => {
//     getData();
//   }, []);
  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
      
      </Box>

      <div className="admin_profile">
        {/* <div className="card_header">USER DETAILS</div> */}
        <Form className="admin_details_form">
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  name="name"
                  defaultValue={profileData?.name}
                  type="text"
                />
              </Form.Group>
            </Col>
            </Row>
          <Row>
            <Form.Group className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control name="name" 
               defaultValue={profileData?.email}
               type="text" />
            </Form.Group>
          </Row>
          <Row>
           
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Role</Form.Label>
                <Form.Control name="name" type="text"
                 defaultValue={profileData?.phone_no}/> 
              </Form.Group>
            </Col>
          </Row>
         

          <div className="row mt-3 div_button">
            <Button
              className="admin_edit_button"
              variant="primary"
              type="submit"
              onClick={navigateToAdminProfileEdit}
            >
              Edit
            </Button>

            <Button
              className="admin_edit_button"
              variant="dark"
              onClick={(e) => {
                navigateToDashboard();
              }}
            >
              Go Back
            </Button>
          </div>
        </Form>
      </div>
    </Box>
  );
};

export default AdminProfile;


