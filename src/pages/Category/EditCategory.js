import { Box } from "@mui/material";
import React, { useLayoutEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { GetCategoryById, UpdateCategory } from "../../services/Api/Api.jsx";
import { toast } from "react-toastify";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { BASE_URL_IMAGE } from "../../services/Host";

const EditCategory = () => {
  const { id } = useParams();
  const [idData, setIdData] = React.useState({});
  const [checkImage, setCheckImage] = React.useState(null);
  const [image, setImage] = useState({ preview: "", raw: "" });

  //get role By ID
  useLayoutEffect(() => {
    GetCategoryById(id)
      .then((res) => {
        setIdData(res.data.data);
        setCheckImage(res.data.data.file_name);
        console.log("rolebyid", res.data.data);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }, [id]);

  const handleImageChange = (e) => {
    console.log("imageessss===>", e.target.value);
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
    setIdData({ ...idData, image: e.target.files[0] });
  };
  //update role api implementation
  const onChange = (e) => {
    setIdData({ ...idData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("category_id", id);
    formData.append("title", idData?.title ? idData?.title : "");
    if (idData.image) {
      formData.append("images", idData.image);
    }

    UpdateCategory(formData)
      .then((res) => {
        if (res.status === 200) {
          toast.success("Category edited successfully!");
        }
        navigate("/category");
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
    navigate("/category");
  };
  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <h3 style={{ marginBottom: "60px" }}>Edit Category</h3>
      </Box>
      <Card>
        <div>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                defaultValue={idData?.title}
                name="title"
                onChange={(e) => onChange(e)}
                placeholder="Enter title"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Image:</Form.Label>

              <Form.Control
                type="file"
                name="image"
                onChange={(e) => handleImageChange(e)}
              />
              {idData ? (
                <>
                  {image.preview === "" ? (
                    <img
                      src={`${BASE_URL_IMAGE}${idData.file_name}`}
                      alt="Categroy Icon"
                      style={{
                        height: "100px",
                        width: "100px",
                        marginTop: "20px",
                        marginLeft: "20px",
                      }}
                    />
                  ) : (
                    <img
                      src={image.preview}
                      alt="Preview"
                      style={{
                        height: "100px",
                        width: "100px",
                        marginTop: "20px",
                        marginLeft: "20px",
                      }}
                    />
                  )}
                </>
              ) : (
                <span>No Image Available</span>
              )}
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

export default EditCategory;
