import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
// import Login from "./pages/Login";
import Resetpassword from "./pages/Resetpassword";
import Forgotpassword from "./pages/Forgotpassword";
import MainLayout from "./components/MainLayout";
import Bloglist from "./pages/Bloglist";
import Customers from "./pages/Customers";
import Categorylist from "./pages/Categorylist";
import Addblog from "./pages/Addblog";
import AdminProfile from "./pages/AdminProfile";
import AdminList from "./pages/AdminList";
import RoleList from "./pages/RoleList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/reset-password" element={<Resetpassword />} />
        <Route path="/forgot-password" element={<Forgotpassword />} />
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="blog-list" element={<Bloglist />} />
          <Route path="blog" element={<Addblog />} />
          <Route path="blog/:id" element={<Addblog />} />
          <Route path="customers" element={<Customers />} />
          <Route path="list-category" element={<Categorylist />} />
          <Route path="adminProfile" element={<AdminProfile />} />
          <Route path="adminUser" element={<AdminList />} />
          <Route path="role-list" element={<RoleList />} />

        </Route>
      </Routes>
    </Router>
  );
}

export default App;
