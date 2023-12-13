import { Box } from "@mui/material";
import React, { useLayoutEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import {
  GetSectionContentById,
  UpdateSectionContent,
} from "../../../services/Api/Api";
import { toast } from "react-toastify";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { BASE_URL_IMAGE } from "../../../services/Host";
import { BASE_URL_VIDEO } from "../../../services/Host";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const EditSectionContent = () => {
  const { id } = useParams();
  const location = useLocation();
  const { data } = location.state;
  console.log("cardadta==>", data, data.id);
  const [idData, setIdData] = React.useState({
    section_content: data?.section_content || "",
    redirection_url: data?.redirection_url || "",
    images: data?.file_name || "",
    videos: data?.file_name || "",
  });
  const [checkImage, setCheckImage] = React.useState(null);
  const [image, setImage] = useState({ preview: "", raw: "" });
  const [videos, setVideos] = useState({ preview: "", raw: "" });
  const [disable, setDisable] = useState(false);

  const isImage = data?.file_type === "Image";
  //get role By ID
  useLayoutEffect(() => {
    GetSectionContentById(id)
      .then((res) => {
        setIdData(res.data.data);
        setCheckImage(res.data.data.file_name);
        console.log("image", res.data.data.file_name);
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
    setIdData({ ...idData, images: e.target.files[0] });
  };

  const handleVideoChange = (e) => {
    if (e.target.files.length) {
      setVideos({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
    setIdData({ ...idData, videos: e.target.files[0] });
  };
  //update role api implementation
  const onChange = (e) => {
    setIdData({ ...idData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setDisable(true);
    const formData = new FormData();
    formData.append("content_id", data?.id);
    formData.append(
      "section_content",
      idData?.section_content ? idData?.section_content : ""
    );
    formData.append(
      "redirection_url",
      idData?.redirection_url ? idData?.redirection_url : ""
    );
    if (idData.images) {
      formData.append("images", idData.images);
    }
    if (idData.videos) {
      formData.append("videos", idData.videos);
    }

    UpdateSectionContent(formData)
      .then((res) => {
        if (res.status === 200) {
          toast.success("Content edited successfully!");
        }
        navigate("/sectionContent");
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
      section_content: data,
    }));
  };

  const navigate = useNavigate();
  const navigateToSocialList = () => {
    navigate("/sectionContent");
  };
  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <h3 style={{ marginBottom: "60px" }}>Edit SectionContent</h3>
      </Box>
      <Card>
        <div>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Section's Content:</Form.Label>

              <CKEditor
                editor={ClassicEditor}
                onChange={handleEditorChange}
                data={data?.section_content}
                config={{
                  height: "1000px",
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Redirection Url</Form.Label>
              <Form.Control
                type="text"
                defaultValue={data?.redirection_url}
                name="redirection_url"
                onChange={(e) => onChange(e)}
              />
            </Form.Group>

            {/* <Form.Group className="mb-3">
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
                      alt="Section Banner"
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
            </Form.Group> */}

            {isImage ? (
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
                        alt="Section Banner"
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
            ) : (
              <Form.Group className="mb-3">
                <Form.Label>Video:</Form.Label>
                <Form.Control
                  type="file"
                  name="videos"
                  onChange={(e) => handleVideoChange(e)}
                />
                {data ? (
                  <>
                    {videos.preview === "" ? (
                      <video
                        width="500px"
                        height="300px"
                        style={{ marginTop: "20px", marginLeft: "20px" }}
                        controls
                      >
                        <source
                          src={`${BASE_URL_VIDEO}${data.file_name}`}
                          type="video/mp4"
                        />
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      <video
                        width="500px"
                        height="300px"
                        style={{ marginTop: "20px", marginLeft: "20px" }}
                        controls
                      >
                        <source src={videos.preview} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    )}
                  </>
                ) : (
                  <span>No Video Available</span>
                )}
              </Form.Group>
            )}
          </Form>
          <div className="button">
            <Button
              icon="pi pi-check"
              severity="success"
              type="submit"
              onClick={handleSubmit}
              disabled={disable}
              style={{
                borderRadius: "10px",
                marginLeft: "10px",
                marginTop: "10px",
              }}
            >
              {disable ? "Please wait...." : "Save"}
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

export default EditSectionContent;
