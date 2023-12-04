import React, { useEffect, useLayoutEffect, useState } from "react";
import { Button } from "primereact/button";
import { Box } from "@mui/material";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useNavigate, useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { Row } from "react-bootstrap";
import CloseIcon from "@mui/icons-material/Close";
import {
  GetBlogById,
  UpdateBlog,
  GetAllCategory,
} from "../../services/Api/Api";
import { BASE_URL_IMAGE } from "../../services/Host";
import { Card } from "primereact/card";
import { toast } from "react-toastify";

const EditBlog = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [blogData, setBlogData] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategoryList, setSelectedCategoryList] = useState([]);
  const [checkImage, setCheckImage] = React.useState(null);
  const [image, setImage] = useState({ preview: "", raw: "" });

  const [selectedValue, setSelectedValue] = useState();

  const navigateToBlog = () => {
    navigate("/stories");
  };

  //get blog By ID
  useLayoutEffect(() => {
    GetBlogById(id)
      .then((res) => {
        setBlogData(res.data.data);
        // setCheckImage(res.data.data.blog_attachment[0].file_name);
        if (
          res.data.data.blog_attachment &&
          res.data.data.blog_attachment.length > 0
        ) {
          setCheckImage(res.data.data.blog_attachment[0].file_name);
        } else {
          setCheckImage(null);
        }
        const catlist = res.data.data.Categories;
        const currentCatList = [];

        for (let item in catlist) {
          console.log(catlist[item].id, "id");
          const temp = {
            id: catlist[item].id,
            title: catlist[item].title,
          };
          currentCatList.push(temp);
        }
        console.log("currentCatList====>", currentCatList);
        setSelectedCategoryList(currentCatList);
        console.log("blogdata", setBlogData, res.data.data);
        console.log("setSelectedCategoryList====>", setSelectedCategoryList);
        console.log("image", setCheckImage);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }, [id]);

  //get category name
  const getCategoryList = async () => {
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
    console.log("item==>", e.target.value);
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
    console.log("categoryyyyy===>", category);
  };

  const handleRemoveCategory = (e, item) => {
    e.preventDefault();
    let category = [...selectedCategoryList];
    category = category.filter((e) => e.title !== item.title);
    setSelectedCategoryList(category);
    console.log("categoryyyyy===>", category);
  };

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    // setDescription(data);
    setBlogData((prevData) => ({
      ...prevData,
      description: data,
    }));
  };

  const handleImageChange = (e) => {
    console.log("imageessss===>", e.target.value);
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
    setBlogData({ ...blogData, image: e.target.files[0] });
  };

  //edit blog
  const handleBlogDataChange = (e) => {
    setBlogData({ ...blogData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("blog_id", id);
    formData.append("heading", blogData?.heading ? blogData?.heading : "");
    formData.append(
      "description",
      blogData?.description ? blogData?.description : ""
    );
    formData.append("type", selectedValue ? selectedValue : "");

    if (blogData.image) {
      formData.append("images", blogData.image);
    }

    // Check if categories are selected; if not, use the existing categories
    if (selectedCategoryList.length > 0) {
      const catIdList = [];
      for (let i in selectedCategoryList) {
        catIdList.push(selectedCategoryList[i].id);
      }
      formData.append("categories", catIdList.join(","));
    }

    UpdateBlog(formData)
      .then((res) => {
        if (res.status === 200) {
          toast.success("Story edited successfully!");
        }
        navigate("/stories");
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

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <h3 style={{ marginTop: "5px", marginBottom: "30px" }}>Edit Story</h3>
      </Box>

      <Card>
        <div>
          <Form>
            <Row>
              <Form.Group className="mb-3">
                <Form.Label>Story's Heading:</Form.Label>
                <Form.Control
                  name="heading"
                  defaultValue={blogData?.heading}
                  type="text"
                  onChange={(e) => handleBlogDataChange(e)}
                />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group className="mb-3">
                <Form.Label>Image:</Form.Label>

                <Form.Control
                  type="file"
                  name="image"
                  onChange={(e) => handleImageChange(e)}
                />
                {blogData &&
                blogData.blog_attachment &&
                blogData.blog_attachment[0] ? (
                  <>
                    {image.preview === "" ? (
                      <img
                        src={`${BASE_URL_IMAGE}${blogData.blog_attachment[0].file_name}`}
                        alt="Story Icon"
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
            </Row>

            <Row>
              <Form.Group className="mb-3">
                <Form.Label>Story's Content:</Form.Label>

                <CKEditor
                  editor={ClassicEditor}
                  onChange={handleEditorChange}
                  data={blogData?.description}
                  // defaultValue={blogData?.description}
                  config={{
                    height: "1000px",
                  }}
                />
              </Form.Group>
            </Row>
            
            <Row>
              <Form.Group className="mb-3">
                <Form.Label>Type:</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  className="new_form_control"
                  value={selectedValue}
                  onChange={(e) => setSelectedValue(e.target.value)}
                >
                  {blogData?.type === "PAID" ? (
                    <>
                      <option value="PAID">PAID</option>
                      <option value="UNPAID">UNPAID</option>
                    </>
                  ) : (
                    <>
                      <option value="UNPAID">UNPAID</option>
                      <option value="PAID">PAID</option>
                    </>
                  )}
                </Form.Select>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group className="mb-3">
                <Form.Label>Categories:</Form.Label>
                <Form.Control
                  disabled
                  name="type"
                  type="text"
                  defaultValue={blogData?.Categories?.map(
                    (category) => category.title
                  ).join(", ")}
                />
              </Form.Group>
            </Row>
            <Row>
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
                console.log("selectedlist====>", selectedCategoryList);
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
            </Row>

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
                }}
              >
                Save
              </Button>
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

export default EditBlog;
