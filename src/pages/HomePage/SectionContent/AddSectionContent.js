import { Box } from "@mui/material";
import React from "react";
import { useState } from "react";
import { Button } from "primereact/button";
import Form from "react-bootstrap/Form";
import { CreateSectionContent } from "../../../services/Api/Api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Card } from "primereact/card";
import CloseIcon from "@mui/icons-material/Close";
import imageCompression from "browser-image-compression";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const AddSectionContent = () => {
  const [sectionContent, setSectionContent] = useState("");
  const [redirectionUrl, setRedirectionUrl] = useState("");
  const [videos, setVideos] = useState(null);
  const [images, setImages] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [disable, setDisable] = useState(false);
  const navigate = useNavigate();

  const handleImageChange = async (e) => {
    const file = e.target.files[0];

    if (file) {
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png"]; // Add more allowed types if needed

      if (!allowedTypes.includes(file.type)) {
        console.error("Error: Invalid file type. Images (JPEG, JPG) only!");
        return;
      }

      if (file.size <= 1024 * 1024) {
        // If image size is less than or equal to 1 MB, no need to compress
        setImages(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        // Compress the image to 25% if its size is more than 1 MB
        try {
          const compressedFile = await imageCompression(file, {
            maxSizeMB: 1,
            maxWidthOrHeight: 1920,
          });

          // Check if compression actually reduced the size
          if (compressedFile.size < file.size) {
            const reader = new FileReader();
            reader.onloadend = () => {
              setImagePreview(reader.result);
              setImages(new Blob([compressedFile], { type: "image/jpeg" }));
            };
            reader.readAsDataURL(compressedFile);
          } else {
            // If compression did not reduce the size, use the original image
            setImages(file);
            const reader = new FileReader();
            reader.onloadend = () => {
              setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
          }
        } catch (error) {
          console.error("Error compressing image:", error);
        }
      }
    }
  };

 

  const handleVideoChange = (event) => {
    const file = event.target.files[0];
    console.log("video",file)

    // Check if a file is selected
    if (file) {
      // You can perform additional checks here, such as file type validation
      // For example, check if the file type is a video
      if (file.type.startsWith('video/')) {
        setVideos(file);
      } else {
        alert('Please select a valid video file.');
      }
    }
  };

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setSectionContent(data);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setDisable(true);

    if (!sectionContent) {
      setDisable(false);
      toast.error("Please enter Section Content");
      return;
    }
    if (!redirectionUrl) {
      setDisable(false);
      toast.error("Please enter Link");
      return;
    }
    // if (!images) {
    //   setDisable(false);
    //   toast.error("Please enter Image");
    //   return;
    // }

    try {
      const formData = new FormData();
      formData.append("section_content", sectionContent);
      formData.append("redirection_url", redirectionUrl);
      formData.append("images", images);
      formData.append("videos", videos);

      const response = await CreateSectionContent(formData);

      if (response.status === 200) {
        toast.success("Social Media added successfully");
        navigate("/sectionContent");
      }
      setDisable(false);
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          toast.error("Token expired");
          localStorage.removeItem("adminToken");
          setTimeout(() => {
            navigate("/login");
          }, 1000);
        } else {
          toast.error("Something went wrong");
        }
      } else {
        toast.error("Network error");
      }
      setDisable(false);
    }
  };

  const handleRemoveImage = (e) => {
    e.preventDefault();
    setImages(null);
    setImagePreview(null);

    // Clear the file input value
    const fileInput = document.getElementById("imageInput");
    if (fileInput) {
      fileInput.value = null;
    }
  };

  const navigateToRole = () => {
    navigate("/sectionContent");
  };

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <h3 style={{ marginBottom: "50px" }}>Create A New Section Content</h3>
      </Box>
      <Card>
        <div>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Section Content:</Form.Label>

              <CKEditor
                editor={ClassicEditor}
                onChange={handleEditorChange}
                config={{
                  height: "1000px",
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label> Redirection Url:</Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="Enter Redirection Url"
                value={redirectionUrl}
                onChange={(e) => setRedirectionUrl(e.target.value)}
                className="new_form_control"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Video Link:</Form.Label>
              <Form.Control
                type="file"
                required
                placeholder="Insert Video Link"
                accept="video/*"
                id="videoInput"
                onChange={handleVideoChange}
                // onChange={(e) => {setVideos(e.target.value);
                // console.log("videos",e.target.value)}}
                className="new_form_control"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Image:</Form.Label>
              <Form.Control
                type="file"
                required
                accept="images/*"
                id="imageInput"
                onChange={handleImageChange}
              />
            </Form.Group>
            {imagePreview && (
              <div
                style={{ position: "relative" }}
                onClick={(e) => {
                  handleRemoveImage(e);
                }}
              >
                <img
                  src={imagePreview}
                  alt="Preview"
                  style={{
                    height: "100px",
                    width: "100px",
                    margin: "10px",
                  }}
                />
                <CloseIcon
                  fontSize="small"
                  color="warning"
                  style={{
                    position: "absolute",
                    left: "99px",
                  }}
                />
              </div>
            )}

            <div>
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
                  // width:"10px"
                }}
              >
                {disable ? "Saving...." : "Save"}
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
          </Form>
        </div>
      </Card>
    </Box>
  );
};

export default AddSectionContent;
