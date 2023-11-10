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
import AdminProfile from "./pages/AdminProfile";
import AdminList from "./pages/AdminList";
import RoleList from "./pages/Roles/RoleList";
import AddRole from "./pages/Roles/AddRole";
import EditRole from "./pages/Roles/EditRole";
import Customers from "./pages/Customer/Customers";
import AddCustomer from "./pages/Customer/AddCustomer";
import Addblog from "./pages/Blogs/Addblog";
import Bloglist from "./pages/Blogs/Bloglist";
import ViewBlog from "./pages/Blogs/ViewBlog";
import EditBlog from "./pages/Blogs/EditBlog";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/reset-password" element={<ChangePassword />} />
        <Route path="/forgot-password" element={<Forgotpassword />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="/blogs" element={<Bloglist />} />
          <Route path="/addBlog" element={<Addblog />} />
          <Route path="/editBlog/:id" element={<EditBlog />} />
          <Route path="/viewBlog/:id" element={<ViewBlog />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/addCustomer" element={<AddCustomer />} />
          <Route path="/category" element={<Categorylist />} />
          <Route path="/addCategory" element={<AddCategory />} />
          <Route path="/editCategory/:id" element={<EditCategory />} />
          <Route path="adminProfile" element={<AdminProfile />} />
          <Route path="adminUser" element={<AdminList />} />
          <Route path="/role-list" element={<RoleList />} />
          <Route path="/addRole" element={<AddRole />} />
          <Route path="/editRole/:id" element={<EditRole />} />
        </Route>
        {/* <Route path = "/customers" element={<MainLayout> <Customers/></MainLayout>}/> */}
      </Routes>
    </Router>
  );
}

export default App;
