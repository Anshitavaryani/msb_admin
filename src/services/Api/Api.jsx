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

//get userby id
export const GetUserById = async (id) => {
  return await axios.get(BASE_URL + "admin/getUserById?id=" + id);
};

//admin add user
export const AddUser = async ({ email, name, payment_status }) => {
  const formData = new FormData();

  formData.append("email", email);
  formData.append("name", name);
  formData.append("payment_status", payment_status);

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


//get all roles
export const GetAllRoles = async () => {
  const res = await axios.get(BASE_URL + "role/all");

  return res;
};

//get role byid
export const GetRoleById = async (id) => {
  return await axios.get(BASE_URL + "role/getRolebyId?id=" + id);
};

//create role
export const CreateRole = async (formData) => {
  return await axios.post(BASE_URL + "role/create", formData, {
    headers: {
      "x-access-token": `${localStorage.getItem("adminToken")}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

//update role
export const UpdateRoles = async (formData) => {
  return await axios.put(BASE_URL + "role/editRole", formData, {
    headers: {
      "x-access-token": `${localStorage.getItem("adminToken")}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

//delete role
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

//get all categroy
export const GetAllCategory = async () => {
  const res = await axios.get(BASE_URL + "category/all");
  return res;
};

//get category by id
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
  return axios.post(BASE_URL + "admin/change-password", data, {
    headers: {
      "Content-Type": "multipart/form-data",
      "x-access-token": `${localStorage.getItem("adminToken")}`,
    },
  });
};

export const GetAdmins = async () => {
  const res = await axios.get(BASE_URL + "admin/getAllAdmin");
  return res;
};

export const GetAdminById = async (id) => {
  return await axios.get(BASE_URL + "admin/getAdminById?id=" + id);
};

export const UpdateAdmin = async (formData) => {
  return await axios.put(BASE_URL + "admin/updateAdmin", formData, {
    headers: {
      "x-access-token": `${localStorage.getItem("adminToken")}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

export const DeleteAdmin = async (admin_id, adminToken) => {
  const formData = new FormData();
  formData.append("admin_id", admin_id);
  return axios.delete(BASE_URL + "admin/deleteAdmin", {
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
      "x-access-token": adminToken,
    },
  });
};

export const GetAdminProfile = async () => {
  const token = await localStorage.getItem("adminToken");
  console.log("token-=========>", token);
  return await axios.get(BASE_URL + "admin/getAdminProfile", {
    headers: {
      "x-access-token": `${token}`,
      // "Content-Type": "multipart/form-data",
    },
  });
};

export const CreateAdmin = async (formData) => {
  return await axios.post(BASE_URL + "admin/register", formData, {
    headers: {
      "x-access-token": `${localStorage.getItem("adminToken")}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

export const ChangePaymentStatus = async ({ user_id, payment_status }) => {
  const formData = new FormData();
  formData.append("user_id", user_id);
  formData.append("payment_status", payment_status);

  return await axios.post(BASE_URL + "admin/updatepaymentStatus", formData);
};

export const GetUserCount = async () => {
  const res = await axios.get(BASE_URL + "admin/getCount");
  return res;
};

export const GetBlogCount = async () => {
  const res = await axios.get(BASE_URL + "admin/getBlogCount");
  return res;
};

export const GetCategoryCount = async () => {
  const res = await axios.get(BASE_URL + "admin/getCategoryCount");
  return res;
};

export const GetUserCountByMonth = async () => {
  const res = await axios.get(BASE_URL + "admin/getUserCountByMonth");
  return res;
};
