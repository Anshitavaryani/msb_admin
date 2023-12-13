import React, { useEffect, useLayoutEffect, useState } from "react";
import { Button } from "primereact/button";
import { Box } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { Row, Col, Modal } from "react-bootstrap";
import {
  GetBlogById,
  GetlikesByBlogId,
  GetCommentsByBlogId,
} from "../../services/Api/Api";
import { BASE_URL_IMAGE } from "../../services/Host";
import { Card } from "primereact/card";

const ViewBlog = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [blogData, setBlogData] = useState([]);
  const [image, setImage] = useState({ preview: "", raw: "" });
  const [showModal, setShowModal] = useState(false);
  const [selectedBlogId, setSelectedBlogId] = useState(null);
  const [likesList, setLikesList] = useState([]);
  const [likesCount, setLikesCount] = useState();
  const [commentCount, setCommentCount] = useState();

  useEffect(() => {
    if (selectedBlogId) {
      fetchLikesByBlogId(selectedBlogId);
    }
  }, [selectedBlogId]);

  useEffect(() => {
    // Fetch likes data when selectedBlogId changes
    if (selectedBlogId) {
      fetchCommentByBlogId(selectedBlogId);
    }
  }, [selectedBlogId]);

  const handleModalShow = (blogId) => {
    setSelectedBlogId(blogId);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedBlogId(null);
    setLikesList([]);
  };

  const fetchLikesByBlogId = async (blog_id) => {
    try {
      const result = await GetlikesByBlogId(
        blog_id,
        localStorage.getItem("adminToken")
      );
      setLikesList(result.data.data.rows);
      setLikesCount(result.data.data.count);
    } catch (error) {
      console.error("Error fetching likes:", error);
    }
  };

  useEffect(() => {
    // Fetch likes data when the component mounts
    fetchLikesByBlogId(id);
  }, [id]);

  const fetchCommentByBlogId = async (blog_id) => {
    try {
      const result = await GetCommentsByBlogId(
        blog_id,
        localStorage.getItem("adminToken")
      );
      setCommentCount(result.data.data.count);
    } catch (error) {
      console.error("Error fetching likes:", error);
    }
  };

  useEffect(() => {
    // Fetch likes data when the component mounts
    fetchCommentByBlogId(id);
  }, [id]);

  const navigateToBlog = () => {
    navigate("/stories");
  };

  //get role By ID
  useLayoutEffect(() => {
    GetBlogById(id)
      .then((res) => {
        setBlogData(res.data.data);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }, [id]);

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <h3 style={{ marginTop: "5px", marginBottom: "30px" }}>View Story</h3>
      </Box>

      <Card>
        <div className="admin_profile">
          <Form className="admin_details_form">
            <Row>
              <Form.Group className="mb-3">
                <Form.Label>Story's Heading:</Form.Label>
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
                {blogData?.blog_attachment &&
                blogData?.blog_attachment[0]?.file_name ? (
                  <img
                    src={`${BASE_URL_IMAGE}${blogData?.blog_attachment[0]?.file_name}`}
                    alt="Blog Icon"
                    className="category-icon-preview"
                    style={{ height: "100px", width: "100px" }}
                  />
                ) : (
                  <span>No Image Available</span>
                )}
              </Form.Group>
            </Row>

            <Row>
              <Form.Group className="mb-3">
                <Form.Label>Story's Content:</Form.Label>
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
            <Row>
              <Form.Group className="mb-3">
                <Form.Label>Views Count:</Form.Label>
                <Form.Control
                  name="type"
                  type="text"
                  defaultValue={blogData?.views_count}
                  disabled
                />
              </Form.Group>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Likes Count:</Form.Label>
                  <Form.Control
                    name="type"
                    type="text"
                    defaultValue={likesCount}
                    disabled
                  />
                  <p style={{ marginTop: "10px", marginBottom: "20px" }}>
                    <Link to="#" onClick={() => handleModalShow(blogData?.id)}>
                      Click here
                    </Link>{" "}
                    to explore who enjoyed this story!
                  </p>
                </Form.Group>

                {/* Modal */}
                <Modal
                  show={showModal}
                  onHide={handleModalClose}
                  aria-labelledby="contained-modal-title-vcenter"
                  centered
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Explore Likes</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <ul>
                      {likesList.map((like, index) => (
                        <li key={index}>{like.liked_by.name}</li>
                      ))}
                    </ul>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleModalClose}>
                      Close
                    </Button>
                    {/* Add additional buttons or functionality as needed */}
                  </Modal.Footer>
                </Modal>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Comment Count:</Form.Label>
                  <Form.Control
                    name="type"
                    type="text"
                    defaultValue={commentCount}
                    disabled
                  />
                  <p style={{ marginTop: "10px" }}>
                    <Link to={`/commentList/${id}`}>Click here</Link> to Dive
                    into User Feedback!
                  </p>
                </Form.Group>
              </Col>
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
                Return to Story List
              </Button>
            </div>
          </Form>
        </div>
      </Card>
    </Box>
  );
};

export default ViewBlog;
