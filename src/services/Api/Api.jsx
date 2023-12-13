import axios from "axios";
import { BASE_URL } from "../Host";

//admin login
export const AdminLogin = async (data) => {
  let config = {
    email: data?.email,
    password: data?.password,
  };

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

// *****************************************BLOG API***********************************************************

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

//get comments by blog Id
export const GetCommentsByBlogId = async (blog_id) => {
  return await axios.get(
    BASE_URL + "blog/getCommentsByBlogId?blog_id=" + blog_id
  );
};

//delete comment
export const DeleteCommentByBlogId = async (comment_id, adminToken) => {
  const formData = new FormData();
  formData.append("comment_id", comment_id);
  return axios.delete(BASE_URL + "blog/deleteCommentByAdmin", {
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
      "x-access-token": adminToken,
    },
  });
};

//get likes users
export const GetlikesByBlogId = async (blog_id) => {
  return await axios.get(
    BASE_URL + "blog/getAllLikesByBlogId?blog_id=" + blog_id
  );
};

// ********************************ADMIN API***********************************************************
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
  const res = await axios.get(BASE_URL + "admin/getUserCount");
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

export const GetMostLiked = async () => {
  const res = await axios.get(BASE_URL + "admin/getMostLikedStory");
  return res;
};

export const GetMostViewed = async () => {
  const res = await axios.get(BASE_URL + "admin/getMostViewedStory");
  return res;
};

export const GetLoginLogs = async () => {
  const res = await axios.get(BASE_URL + "admin/getLoginLogs");
  return res;
};

// ********************************Social APIs*********************************************************

//get all social login
export const GetAllSocialLogin = async () => {
  const res = await axios.get(BASE_URL + "content/getAllSocialLogin");
  return res;
};

//get social login by id
export const GetSocialLoginById = async (id) => {
  return await axios.get(BASE_URL + "content/findSocialLoginById?id=" + id);
};

//create social login
export const CreateSocialLogin = async (formData) => {
  return await axios.post(BASE_URL + "content/createSocialLogin", formData, {
    headers: {
      "x-access-token": `${localStorage.getItem("adminToken")}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

//update social
export const UpdateSocialLogin = async (formData) => {
  return await axios.put(BASE_URL + "content/updateSocialLogin", formData, {
    headers: {
      "x-access-token": `${localStorage.getItem("adminToken")}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

//delete social
export const DeleteSocialLogin = async (content_id, adminToken) => {
  const formData = new FormData();
  formData.append("content_id", content_id);
  return axios.delete(BASE_URL + "content/deleteSocialLogin", {
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
      "x-access-token": adminToken,
    },
  });
};

//*************************************************Section content api******************************************************** */


export const GetAllSectionContent = async () => {
  const res = await axios.get(BASE_URL + "content/getAllSectionContent");
  return res;
};

export const GetSectionContentById = async (id) => {
  return await axios.get(BASE_URL + "content/findSectionContentById?id=" + id);
};

export const CreateSectionContent = async (formData) => {
  return await axios.post(BASE_URL + "content/createSectionContent", formData, {
    headers: {
      "x-access-token": `${localStorage.getItem("adminToken")}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

export const UpdateSectionContent = async (formData) => {
  return await axios.put(BASE_URL + "content/updateSectionContent", formData, {
    headers: {
      "x-access-token": `${localStorage.getItem("adminToken")}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

export const DeleteSectionContent = async (content_id, adminToken) => {
  const formData = new FormData();
  formData.append("content_id", content_id);
  return axios.delete(BASE_URL + "content/deleteSectionContent", {
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
      "x-access-token": adminToken,
    },
  });
};


//*************************************************Banner content api******************************************************** */



export const GetAllBannerContent = async () => {
  const res = await axios.get(BASE_URL + "content/getAllBannerContent");
  return res;
};

export const GetBannerContentById = async (id) => {
  return await axios.get(BASE_URL + "content/findBannerContentById?id=" + id);
};

export const CreateBannerContent = async (formData) => {
  return await axios.post(BASE_URL + "content/createBannerContent", formData, {
    headers: {
      "x-access-token": `${localStorage.getItem("adminToken")}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

export const UpdateBannerContent = async (formData) => {
  return await axios.put(BASE_URL + "content/updateBannerContent", formData, {
    headers: {
      "x-access-token": `${localStorage.getItem("adminToken")}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

export const DeleteBannerContent = async (content_id, adminToken) => {
  const formData = new FormData();
  formData.append("content_id", content_id);
  return axios.delete(BASE_URL + "content/deleteBannerContent", {
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
      "x-access-token": adminToken,
    },
  });
};

//*************************************************Card content api******************************************************** */


export const GetAllCardContent = async () => {
  const res = await axios.get(BASE_URL + "content/getAllCardContent");
  return res;
};

//get social login by id
export const GetCardContentById = async (id) => {
  return await axios.get(BASE_URL + "content/findCardContentById?id=" + id);
};

//create social login
export const CreateCardContent = async (formData) => {
  return await axios.post(BASE_URL + "content/createCardContent", formData, {
    headers: {
      "x-access-token": `${localStorage.getItem("adminToken")}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

//update social
export const UpdateCardContent = async (formData) => {
  return await axios.put(BASE_URL + "content/updateCardContent", formData, {
    headers: {
      "x-access-token": `${localStorage.getItem("adminToken")}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

//delete social
export const DeleteCardContent = async (content_id, adminToken) => {
  const formData = new FormData();
  formData.append("content_id", content_id);
  return axios.delete(BASE_URL + "content/deleteCardContent", {
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
      "x-access-token": adminToken,
    },
  });
};