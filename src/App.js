import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import ChangePassword from "./pages/ChangePassword/ChangePassword";
import Forgotpassword from "./pages/Forgotpassword";
import MainLayout from "./components/MainLayout";
import Categorylist from "./pages/Category/Categorylist";
import AddCategory from "./pages/Category/AddCategory";
import EditCategory from "./pages/Category/EditCategory";
import AdminList from "./pages/AdminList";
import RoleList from "./pages/Roles/RoleList";
import AddRole from "./pages/Roles/AddRole";
import EditRole from "./pages/Roles/EditRole";
import Customers from "./pages/Customer/Customers";
import AddCustomer from "./pages/Customer/AddCustomer";
import ViewCustomer from "./pages/Customer/ViewCustomer";
import Addblog from "./pages/Blogs/Addblog";
import Bloglist from "./pages/Blogs/Bloglist";
import ViewBlog from "./pages/Blogs/ViewBlog";
import EditBlog from "./pages/Blogs/EditBlog";
import CommentList from "./pages/Blogs/CommentList";
import AdminUser from "./pages/AdminManagement/AdminUser";
import ViewAdmin from "./pages/AdminManagement/ViewAdmin";
import AddAdmin from "./pages/AdminManagement/AddAdmin";
import EditAdmin from "./pages/AdminManagement/EditAdmin";
import LoginLogs from "./pages/LoginLogs";
import BannerContent from "./pages/HomePage/BannerContent/BannerContent";
import AddBannerContent from "./pages/HomePage/BannerContent/AddBannerContent";
import EditBannerContent from "./pages/HomePage/BannerContent/EditBannerContent";
import SectionContent from "./pages/HomePage/SectionContent/SectionContent";
import AddSectionContent from "./pages/HomePage/SectionContent/AddSectionContent";
import EditSectionContent from "./pages/HomePage/SectionContent/EditSectionContent";
import CardContent from "./pages/HomePage/CardContent/CardContent";
import AddCardContent from "./pages/HomePage/CardContent/AddCardContent";
import EditCardContent from "./pages/HomePage/CardContent/EditCardContent";
import SocialLogins from "./pages/HomePage/SocialLogins/SocialLogins";
import AddSocialLogin from "./pages/HomePage/SocialLogins/AddSocialLogin";
import EditSocialLogin from "./pages/HomePage/SocialLogins/EditSocialLogin";



function App() {
  return (
    <Router>
      <Routes>
       
        <Route path="/forgot-password" element={<Forgotpassword />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="/reset-password" element={<ChangePassword />} />
          <Route path="/stories" element={<Bloglist />} />
          <Route path="/addStory" element={<Addblog />} />
          <Route path="/editStory/:id" element={<EditBlog />} />
          <Route path="/viewStory/:id" element={<ViewBlog />} />
          <Route path="/commentList/:blog_id" element={<CommentList />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/addCustomer" element={<AddCustomer />} />
          <Route path="/viewCustomer/:id" element={<ViewCustomer />} />
          <Route path="/category" element={<Categorylist />} />
          <Route path="/addCategory" element={<AddCategory />} />
          <Route path="/editCategory/:id" element={<EditCategory />} />
          <Route path="adminUser" element={<AdminList />} />
          <Route path="/role-list" element={<RoleList />} />
          <Route path="/addRole" element={<AddRole />} />
          <Route path="/editRole/:id" element={<EditRole />} />
          <Route path="/adminList" element={<AdminUser />} />
          <Route path="/viewAdmin" element={<ViewAdmin />} />
          <Route path="/addAdmin" element={<AddAdmin />} />
          <Route path="/editAdmin/:id" element={<EditAdmin />} />
          <Route path="/loginLogs" element={<LoginLogs />} />
          <Route path="/bannerContent" element={<BannerContent />} />
          <Route path="/addBannerContent" element={<AddBannerContent />} />
          <Route path="/editBannerContent" element={<EditBannerContent />} />
          <Route path="/sectionContent" element={<SectionContent />} />
          <Route path="/addSectionContent" element={<AddSectionContent />} />
          <Route path="/editSectionContent" element={<EditSectionContent />} />
          <Route path="/cardContent" element={< CardContent/>} />
          <Route path="/addCardContent" element={< AddCardContent/>} />
          <Route path="/editCardContent" element={< EditCardContent/>} />
          <Route path="/socialLogins" element={<SocialLogins />} />
          <Route path="/addSocialLogin" element={<AddSocialLogin />} />
          <Route path="/editSocialLogin/:id" element={<EditSocialLogin />} />
        </Route>
        {/* <Route path = "/customers" element={<MainLayout> <Customers/></MainLayout>}/> */}
      </Routes>
    </Router>
  );
}

export default App;
