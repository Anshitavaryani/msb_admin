import axios from "axios";
import { BASE_URL } from "../Host";

//admin login
export const AdminLogin = async (data) => {
  // console.log("loginnnn==>", AdminLogin);
  let config = {
    email: data?.email,
    password: data?.password,
  };
  console.log("loginnnn==>", BASE_URL + "admin/login");
  return await axios.post(BASE_URL + "admin/login", config);
};

//get all user
export const GetUsers = async () => {
  const res = await axios.get(BASE_URL + "admin/getAllUsers");

  return res;
};

//admin add user
export const AddUser = async ({ email, name }) => {
  const formData = new FormData();

  formData.append("email", email);
  formData.append("name", name);

  return await axios.post(BASE_URL + "admin/createUser", formData, {
    headers: {
      "x-access-token": `${localStorage.getItem("adminToken")}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

//delete user
export const DeleteUser = async (user_id, adminToken) => {
  const formData = new FormData();
  formData.append("user_id", user_id);
  return axios.delete(BASE_URL + "admin/deleteUser", {
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
      "x-access-token": adminToken,
    },
  });
};

export const GetAllRoles = async () => {
  const res = await axios.get(BASE_URL + "role/all");

  return res;
};

export const GetRoleById = async (id) => {
  return await axios.get(BASE_URL + "role/getRolebyId?id=" + id);
};

export const CreateRole = async (formData) => {
  return await axios.post(BASE_URL + "role/create", formData, {
    headers: {
      "x-access-token": `${localStorage.getItem("adminToken")}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

export const UpdateRoles = async (formData) => {
  return await axios.put(BASE_URL + "role/editRole", formData, {
    headers: {
      "x-access-token": `${localStorage.getItem("adminToken")}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

export const DeleteRole = async (role_id, adminToken) => {
  const formData = new FormData();
  formData.append("role_id", role_id);
  return axios.delete(BASE_URL + "role/deleteRole", {
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
      "x-access-token": adminToken,
    },
  });
};

export const GetAllCategory = async () => {
  const res = await axios.get(BASE_URL + "category/all");
  return res;
};

export const GetCategoryById = async (id) => {
  return await axios.get(BASE_URL + "category/getCategoryById?id=" + id);
};

export const UpdateCategory = async (formData) => {
  return await axios.put(BASE_URL + "category/updateCategory", formData, {
    headers: {
      "x-access-token": `${localStorage.getItem("adminToken")}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

export const CreateCategory = async (formData) => {
  return await axios.post(BASE_URL + "category/createCategory", formData, {
    headers: {
      "x-access-token": `${localStorage.getItem("adminToken")}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

export const DeleteCategory = async (category_id, adminToken) => {
  const formData = new FormData();
  formData.append("category_id", category_id);
  return axios.delete(BASE_URL + "category/deleteCategory", {
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
      "x-access-token": adminToken,
    },
  });
};

export const GetAllBlogs = async () => {
  const res = await axios.get(BASE_URL + "blog/getAllBlogs");
  return res;
};

export const GetBlogById = async (id) => {
  return await axios.get(BASE_URL + "blog/getBlogById?id=" + id);
};

export const CreateBlog = async (formData) => {
  return await axios.post(BASE_URL + "blog/createBlog", formData, {
    headers: {
      "x-access-token": `${localStorage.getItem("adminToken")}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

export const UpdateBlog = async (formData) => {
  return await axios.put(BASE_URL + "blog/updateBlog", formData, {
    headers: {
      "x-access-token": `${localStorage.getItem("adminToken")}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

export const DeleteBlog = async (blog_id, adminToken) => {
  const formData = new FormData();
  formData.append("blog_id", blog_id);
  return axios.delete(BASE_URL + "blog/deleteBlog", {
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
      "x-access-token": adminToken,
    },
  });
};

export const ChangeAdminPassword = async (data) => {
  const token = await localStorage.getItem("adminToken");
  return axios.post(BASE_URL + "admin/changePassword", data, {
    headers: {
      "Content-Type": "multipart/form-data",
      "x-access-token": `${token}`,
    },
  });
};
