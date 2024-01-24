import { Box } from "@mui/material";
import React from "react";
import { useState } from "react";
import { Button } from "primereact/button";
import Form from "react-bootstrap/Form";
import { CreateCategory } from "../../services/Api/Api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Card } from "primereact/card";
import CloseIcon from "@mui/icons-material/Close";
import imageCompression from "browser-image-compression";

const AddCategory = () => {
  const [title, setTitle] = useState("");
  const [images, setImages] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [disable, setDisable] = useState(false);
  const navigate = useNavigate();

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];

  //   if (file) {
  //     const reader = new FileReader();

  //     reader.onloadend = () => {
  //       // Set the image preview
  //       setImagePreview(reader.result);
  //       setImages(e.target.files[0]);
  //     };

  //     // Read the image as a data URL
  //     reader.readAsDataURL(file);
  //   }
  // };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];

    if (file) {
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png"]; // Add more allowed types if needed

      if (!allowedTypes.includes(file.type)) {
        console.error("Error: Invalid file type. Images (JPEG, JPG,PNG) only!");
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    setDisable(true);

    if (!title) {
      toast.error("Please enter name");
      setDisable(false);
      return;
    }
    if (!images) {
      toast.error("Please enter Image");
      setDisable(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("images", images);

      const response = await CreateCategory(formData);

      if (response.status === 200) {
        toast.success("Category added successfully");
        navigate("/category");
      }
      setDisable(false);
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          toast.error("Category with this name already exists", {
            position: "top-right",
            autoClose: 500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else if (error.response.status === 401) {
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
    navigate("/category");
  };

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <h3 style={{ marginBottom: "50px" }}>Create New Category</h3>
      </Box>
      <Card>
        <div>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label> Category name:</Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="Enter Category name"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
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

export default AddCategory;
