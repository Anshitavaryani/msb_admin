import { Box } from "@mui/material";
import React, { useLayoutEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { GetSocialLoginById,UpdateSocialLogin } from "../../../services/Api/Api";
import { toast } from "react-toastify";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { BASE_URL_IMAGE } from "../../../services/Host";

const EditSocialLogin = () => {
  const { id } = useParams();
  const [idData, setIdData] = React.useState({});
  const [checkImage, setCheckImage] = React.useState(null);
  const [image, setImage] = useState({ preview: "", raw: "" });

  //get role By ID
  useLayoutEffect(() => {
    GetSocialLoginById(id)
      .then((res) => {
        setIdData(res.data.data);
        setCheckImage(res.data.data.file_name);

      })
      .catch((err) => {
        console.log(err, "error");
      });
  }, [id]);

  const handleImageChange = (e) => {

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
    formData.append("content_id", id);
    formData.append("social_media_name", idData?.social_media_name ? idData?.social_media_name : "");
    formData.append("redirection_url", idData?.redirection_url ? idData?.redirection_url : "");
    if (idData.image) {
      formData.append("images", idData.image);
    }

    UpdateSocialLogin(formData)
      .then((res) => {
        if (res.status === 200) {
          toast.success("Social Media edited successfully!");
        }
        navigate("/socialLogins");
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
  const navigateToSocialList = () => {
    navigate("/socialLogins");
  };
  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <h3 style={{ marginBottom: "60px" }}>Edit Social Media Content</h3>
      </Box>
      <Card>
        <div>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Social Media Name</Form.Label>
              <Form.Control
                type="text"
                defaultValue={idData?.social_media_name}
                name="social_media_name"
                onChange={(e) => onChange(e)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Redirection Url</Form.Label>
              <Form.Control
                type="text"
                defaultValue={idData?.redirection_url}
                name="redirection_url"
                onChange={(e) => onChange(e)}
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
                navigateToSocialList();
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

export default EditSocialLogin;

