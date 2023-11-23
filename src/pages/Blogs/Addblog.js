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

const Addblog = () => {
  const navigate = useNavigate();
  const [heading, setHeading] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("unpaid");
  const [categoryList, setCategoryList] = useState([]);
  const [images, setImage] = useState(null);
  const [selectedCategoryList, setSelectedCategoryList] = useState([]);

  //get category name
  const getCategoryList = async () => {
    // Write your code here
    let res = await GetAllCategory();
    console.log(res?.status, res?.data?.data, res?.response);
    if (res?.status === 200) {
      setCategoryList(res?.data?.data);
      console.log("categroy", res?.data?.data);
    } else {
    }
  };

  useEffect(() => {
    getCategoryList();
  }, []);

  const handleCategory = (e) => {
    console.log("item==>", e.target.value);
    e.preventDefault();
    let category = [...selectedCategoryList];
    category.push(e.target.value);
    setSelectedCategoryList(category);
    console.log("categoryyyyy===>", category);
  };

  const handleRemoveCategory = (e, item) => {
    e.preventDefault();
    let category = [...selectedCategoryList];
    category = category.filter((e) => e !== item);
    setSelectedCategoryList(category);
    console.log("categoryyyyy===>", category);
  };

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setDescription(data);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

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
    // if (!image) {
    //   toast.error("Please insert image");
    //   return;
    // }
    try {
      const formData = new FormData();
      formData.append("heading", heading);
      formData.append("description", description);
      formData.append("type", type);
      formData.append("images", images);
      formData.append(
        "categories",
        selectedCategoryList.length > 0 ? selectedCategoryList.join(",") : ""

        // idData?.category_name ? idData?.category_name : ""
      );

      const response = await CreateBlog(formData);
      console.log("response===>", response);

      if (response.status === 200) {
        toast.success("Blog added successfully");
        setTimeout(() => {
          // Refresh the page
          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      if (error.response.status === 401) {
        toast.error("Token expired");
        localStorage.removeItem("adminToken");
        setTimeout(() => {
          navigate("/Login");
        }, 1000);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  const navigateToBlogs = () => {
    navigate("/blogs");
  };

  return (
    <div>
      <h3 style={{ marginBottom: "30px" }}>Create a New Blog</h3>

      <Card>
        <div>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label> Heading</Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="Enter Blog heading"
                value={heading}
                onChange={(e) => setHeading(e.target.value)}
                className="new_form_control"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                required
                accept="images/*"
                onChange={(e) => {
                  setImage(e.target.files[0]);
                }}
              />
            </Form.Group> 

            <Form.Group className="mb-3">
              <Form.Label> Blog Description</Form.Label>

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
              <Form.Label>Select Category list</Form.Label>

              <Form.Select
                aria-label="Default select example"
                // value={userType}
                onChange={(e) => handleCategory(e)}
                className="new_form_control"
              >
                <option>Choose Category</option>
                {categoryList.map((item, index) => {
                  return <option value={item.title}>{item?.title}</option>;
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
                  <text style={{ fontSize: 16 }}>{item}</text>
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
                style={{
                  borderRadius: "10px",
                  marginLeft: "10px",
                  marginTop: "10px",
                  // width:"10px"
                }}
              >
                Save
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
