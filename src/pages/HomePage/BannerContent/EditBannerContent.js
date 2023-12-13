import { Box } from "@mui/material";
import React, { useLayoutEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import {
  GetCardContentById,
  UpdateBannerContent,
} from "../../../services/Api/Api";
import { BASE_URL_IMAGE } from "../../../services/Host";
import { toast } from "react-toastify";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const EditBannerContent = () => {
  const location = useLocation();

  const { data } = location.state;
  console.log("cardadta==>", data, data.id);
  const { id } = useParams();
  const [image, setImage] = useState({ preview: "", raw: "" });
  const [idData, setIdData] = useState({
    card_content: data?.card_content || "",
    images: data?.file_name || "",
  });

  //get role By ID
  useLayoutEffect(() => {
    GetCardContentById(id)
      .then((res) => {
        setIdData(res.data.data);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }, [id]);

  //update role api implementation
  const onChange = (e) => {
    setIdData({ ...idData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("content_id", data?.id);
    formData.append(
      "banner_content",
      idData?.banner_content ? idData?.banner_content : ""
    );
    if (idData.images) {
      formData.append("images", idData.images);
    }

    UpdateBannerContent(formData)
      .then((res) => {
        if (res.status === 200) {
          toast.success("Bnaner Content edited successfully!");
        }
        navigate("/bannerContent");
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

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    // setDescription(data);
    setIdData((prevData) => ({
      ...prevData,
      banner_content: data,
    }));
  };

  const handleImageChange = (e) => {
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
    setIdData({ ...idData, images: e.target.files[0] });
  };
  

  const navigate = useNavigate();
  const navigateToSocialList = () => {
    navigate("/bannerContent");
  };
  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <h3 style={{ marginBottom: "60px" }}>Edit Banner Content</h3>
      </Box>
      <Card>
        <div>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Banner's Content:</Form.Label>

              <CKEditor
                editor={ClassicEditor}
                onChange={handleEditorChange}
                data={data?.banner_content}
                config={{
                  height: "1000px",
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Image:</Form.Label>

              <Form.Control
                type="file"
                name="image"
                onChange={(e) => handleImageChange(e)}
              />
              {data ? (
                <>
                  {image.preview === "" ? (
                    <img
                      src={`${BASE_URL_IMAGE}${data.file_name}`}
                      alt="Banner"
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

export default EditBannerContent;
