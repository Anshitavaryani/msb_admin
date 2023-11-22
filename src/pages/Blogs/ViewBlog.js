import React, { useEffect, useLayoutEffect, useState } from "react";
import { Button } from "primereact/button";
import { Box } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { Row } from "react-bootstrap";
import { GetBlogById } from "../../services/Api/Api";
import { BASE_URL_IMAGE } from "../../services/Host";
import { Card } from "primereact/card";

const ViewBlog = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [blogData, setBlogData] = useState([]);
  const [image, setImage] = useState({ preview: "", raw: "" });

  const navigateToBlog = () => {
    navigate("/blogs");
  };

  //get role By ID
  useLayoutEffect(() => {
    GetBlogById(id)
      .then((res) => {
        setBlogData(res.data.data);
        console.log("rolebyid", res.data.data);
        // console.log("imagessss", blogData?.blogs[0]?.file_name);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }, [id]);
  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <h3 style={{ marginTop: "5px", marginBottom: "30px" }}>View Blog</h3>
      </Box>

      <Card>
        <div className="admin_profile">
          <Form className="admin_details_form">
            <Row>
              <Form.Group className="mb-3">
                <Form.Label>Blog's Heading</Form.Label>
                <Form.Control
                  name="name"
                  defaultValue={blogData?.heading}
                  type="text"
                  disabled
                />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group className="mb-3">
                <Form.Label>Image:</Form.Label>
                <br />
                {blogData?.blog_attachment && blogData?.blog_attachment[0]?.file_name ? (
                  <img
                    src={`${BASE_URL_IMAGE}${blogData?.blog_attachment[0]?.file_name}`}
                    alt="Blog Icon"
                    className="category-icon-preview"
                    style={{height:"100px",width:"100px"}}
                  />
                ) : (
                  <span>No Image Available</span>
                )}
              </Form.Group>
            </Row>

            <Row>
              <Form.Group className="mb-3">
                <Form.Label>Blog'sDescription</Form.Label>
                <Form.Control
                  name="name"
                  defaultValue={blogData?.description}
                  as="textarea"
                  disabled
                  rows={6}
                />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group className="mb-3">
                <Form.Label>Type</Form.Label>
                <Form.Control
                  name="type"
                  type="text"
                  defaultValue={blogData?.type}
                  disabled
                />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group className="mb-3">
                <Form.Label>Categories</Form.Label>
                <Form.Control
                  name="type"
                  type="text"
                  // defaultValue={blogData?.Categories?.title}
                  defaultValue={blogData?.Categories?.map(
                    (category) => category.title
                  ).join(", ")}
                  disabled
                />
              </Form.Group>
            </Row>

            <div>
              <Button
                // icon="pi pi-times"
                severity="secondary"
                onClick={(e) => {
                  navigateToBlog();
                }}
                style={{ borderRadius: "10px", marginLeft: "10px" }}
              >
                Return to Blog List
              </Button>
            </div>
          </Form>
        </div>
      </Card>
    </Box>
  );
};

export default ViewBlog;
