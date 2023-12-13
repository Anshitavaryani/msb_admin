import { Box } from "@mui/material";
import React, { useLayoutEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useParams, useNavigate,useLocation } from "react-router-dom";
import { GetCardContentById,UpdateCardContent } from "../../../services/Api/Api";
import { toast } from "react-toastify";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";


const EditCardContent = () => {
  const location = useLocation();

  const { data } = location.state;
  console.log("cardadta==>",data,data.id)
  const { id } = useParams();
  const [idData, setIdData] = useState({
    card_content: data?.card_content || "",
    redirection_url: data?.redirection_url || "",
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
    formData.append("card_content", idData?.card_content ? idData?.card_content : "");
    formData.append("redirection_url", idData?.redirection_url ? idData?.redirection_url : "");
   

    UpdateCardContent(formData)
      .then((res) => {
        if (res.status === 200) {
          toast.success("Card Content edited successfully!");
        }
        navigate("/cardContent");
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
      card_content: data,
    }));
  };

  const navigate = useNavigate();
  const navigateToSocialList = () => {
    navigate("/cardContent");
  };
  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <h3 style={{ marginBottom: "60px" }}>Edit Card Content</h3>
      </Box>
      <Card>
        <div>
          <Form>
          <Form.Group className="mb-3">
                <Form.Label>Card's Content:</Form.Label>

                <CKEditor
                  editor={ClassicEditor}
                  onChange={handleEditorChange}
                  data={data?.card_content}
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

export default EditCardContent;

