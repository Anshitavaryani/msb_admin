import React, { useEffect, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import Form from "react-bootstrap/Form";
import { GetAllCategory, CreateBlog } from "../../services/Api/Api";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CloseIcon from "@mui/icons-material/Close";
import imageCompression from "browser-image-compression";

const Addblog = () => {
  const navigate = useNavigate();
  const [heading, setHeading] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("unpaid");
  const [categoryList, setCategoryList] = useState([]);
  const [images, setImages] = useState(null);
  const [selectedCategoryList, setSelectedCategoryList] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [disable, setDisable] = useState(false);

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
      const allowedTypes = ["image/jpeg", "image/jpg"]; // Add more allowed types if needed
  
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
  
  
  

  //get category name
  const getCategoryList = async () => {
    // Write your code here
    let res = await GetAllCategory();

    if (res?.status === 200) {
      setCategoryList(res?.data?.data);
    } else {
    }
  };

  useEffect(() => {
    getCategoryList();
  }, []);

  const handleCategory = (e) => {
  
    let categoryTitle = "";
    for (let i in categoryList) {
      if (categoryList[i].id == e.target.value) {
        categoryTitle = categoryList[i].title;
      }
    }
    e.preventDefault();
    let category = [...selectedCategoryList];
    const temp = {
      id: e.target.value,
      title: categoryTitle,
    };
    category.push(temp);

    setSelectedCategoryList(category);
  };

  const handleRemoveCategory = (e, item) => {
    e.preventDefault();
    let category = [...selectedCategoryList];
    category = category.filter((e) => e !== item);
    setSelectedCategoryList(category);
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

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setDescription(data);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setDisable(true);

    if (!heading) {
      toast.error("Please enter heading");
      return;
    }
    if (!description) {
      toast.error("Please enter description");
      return;
    }
    if (!type) {
      toast.error("Please enter type");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("heading", heading);
      formData.append("description", description);
      formData.append("type", type);
      if (images) {
        formData.append("images", images, "compressed_image.jpg");
      }
      // formData.append("images", images);
      // formData.append(
      //   "categories",
      //   selectedCategoryList.length > 0 ? selectedCategoryList.join(",") : ""
      // );
      if (selectedCategoryList.length > 0) {
        const catIdList = [];
        for (let i in selectedCategoryList) {
          catIdList.push(selectedCategoryList[i].id);
        }
        formData.append("categories", catIdList.join(","));
      }

      const response = await CreateBlog(formData);

      if (response.status === 200) {
        toast.success("Story added successfully");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
      setDisable(false);
    } catch (error) {
      if (error.response.status === 400) {
        toast.error("Story with this title already exist", {
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
          navigate("/Login");
        }, 1000);
      } else {
        toast.error("Something went wrong");
      }
      setDisable(false);
    }
  };

  const navigateToBlogs = () => {
    navigate("/stories");
  };

  return (
    <div>
      <h3 style={{ marginBottom: "30px" }}>Create a New Story</h3>

      <Card>
        <div>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label> Heading:</Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="Enter Story heading"
                value={heading}
                onChange={(e) => setHeading(e.target.value)}
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

            <Form.Group className="mb-3">
              <Form.Label> Story's Description:</Form.Label>

              <CKEditor
                editor={ClassicEditor}
                onChange={handleEditorChange}
                config={{
                  height: "1000px",
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Type:</Form.Label>
              <Form.Select
                aria-label="Default select example"
                className="new_form_control"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option>Select Type:</option>
                <option value="PAID">PAID</option>
                <option value="UNPAID">UNPAID</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Select Category:</Form.Label>

              <Form.Select
                aria-label="Default select example"
                // value={userType}
                onChange={(e) => handleCategory(e)}
                className="new_form_control"
              >
                <option>Choose Category</option>
                {categoryList.map((item, index) => {
                  return <option value={item.id}>{item?.title}</option>;
                })}
              </Form.Select>
            </Form.Group>
            {selectedCategoryList.map((item, index) => {
              return (
                <div
                  onClick={(e) => {
                    handleRemoveCategory(e, item);
                  }}
                >
                  <text style={{ fontSize: 16 }}>{item.title}</text>
                  <CloseIcon fontSize="small" color="warning" />
                </div>
              );
            })}
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
                  navigateToBlogs();
                }}
                style={{ borderRadius: "10px", marginLeft: "10px" }}
              >
                Cancel
              </Button>
            </div>
          </Form>
        </div>
      </Card>
    </div>
  );
};

export default Addblog;
