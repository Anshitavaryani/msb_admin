import React, { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { AiOutlineDashboard } from "react-icons/ai";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { FaUsers, FaRegSun, FaUser } from "react-icons/fa";
import { MdOutlineCategory } from "react-icons/md";
import { BiCategoryAlt } from "react-icons/bi";
import { MdAutoStories } from "react-icons/md";
import { MdOutlineAutoStories } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { MdOutlineDashboard } from "react-icons/md";
import { BsCardList } from "react-icons/bs";
import { PiChatsBold } from "react-icons/pi";
import { toast } from "react-toastify";
import { Layout, Menu, theme } from "antd";
import { useNavigate } from "react-router-dom";
import { FaUserGear } from "react-icons/fa6";
import "./MainLayout.scss";
import Login from "../pages/Login";
const { Header, Sider, Content } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();


  // const notify = () =>{ }
  function logout() {
    localStorage.removeItem("adminToken");
    // notify()
    toast.warn("Logged Out!", {
      position: "top-right",
      autoClose: 500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    setTimeout(() => {
      navigate("/Login");
    }, 1000);
  }

  const token = localStorage.getItem("adminToken");
  return (
    <>
      {token ? (
        <Layout /* onContextMenu={(e) => e.preventDefault()} */>
          <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
            className="sidebar"
          >
            <div className="logo">
              <h2 className="text-white fs-5 text-center py-3 mb-0">
                <span className="sm-logo">MSB</span>
                <span className="lg-logo">MY STORY BANK</span>
              </h2>
            </div>
            <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={[""]}
              onClick={({ key }) => {
                if (key === "signout") {
                } else {
                  navigate(key);
                }
              }}
              items={[
                {
                  key: "/",
                  icon: <AiOutlineDashboard className="fs-4" />,
                  label: "Dashboard",
                },
                {
                  key: "/customers",
                  icon: <FaUsers className="fs-4" />,
                  label: "Customers",
                },
                {
                  key: "category",
                  icon: <BiCategoryAlt className="fs-4" />,
                  label: "Category ",
                },
                {
                  key: "stories",
                  icon: <MdAutoStories className="fs-4" />,
                  label: "Stories",
                  children: [
                    {
                      key: "addStory",
                      icon: <MdOutlineAutoStories className="fs-4" />,
                      label: "Add Story",
                    },
                    {
                      key: "stories",
                      icon: <MdOutlineAutoStories className="fs-4" />,
                      label: "Stories List",
                    },
                  ],
                },
                {
                  key: "bannerContent",
                  icon: <FaHome className="fs-4" />,
                  label: "Home Page",
                  children: [
                    {
                      key: "sectionContent",
                      icon: <MdOutlineDashboard className="fs-4" />,
                      label: "Section Content",
                    },
                    {
                      key: "bannerContent",
                      icon: <MdOutlineCategory className="fs-4" />,
                      label: "Banner Content",
                    },
                    {
                      key: "cardContent",
                      icon: <BsCardList className="fs-4" />,
                      label: "Card Content",
                    },
                    {
                      key: "socialLogins",
                      icon: <PiChatsBold className="fs-4" />,
                      label: "Social Logins",
                    },
                  ],
                },
                {
                  key: "/adminList",
                  icon: <FaUserGear className="fs-4" />,
                  label: "Admin Management",
                
                },
                // {
                //   key: "role-list",
                //   icon: <FaRegSun className="fs-4" />,
                //   label: "Role ",
                // },
              ]}
            />
          </Sider>
          <Layout className="site-layout">
            <Header
              className="d-flex justify-content-between ps-1 pe-5"
              style={{
                padding: 0,
                background: colorBgContainer,
              }}
            >
              {React.createElement(
                collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                {
                  className: "trigger",
                  onClick: () => setCollapsed(!collapsed),
                }
              )}
              <div className="d-flex gap-4 align-items-center">
                {/* <div className="position-relative">
              <IoIosNotifications className="fs-4" />
              <span className="badge bg-warning rounded-circle p-1 position-absolute">
                3
              </span>
            </div> */}
                <div className="position-relative">
                  <Link to="https://mystorybank.info/" target="_blank">
                    Visit Website
                  </Link>
                </div>

                <div className="d-flex gap-3 align-items-center dropdown">
                  <div
                    role="button"
                    id="dropdownMenuLink"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <FaUser />
                  </div>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuLink"
                  >
                    <li>
                      <Link
                        className="dropdown-item py-1 mb-1"
                        style={{ height: "auto", lineHeight: "20px" }}
                        to="/viewAdmin"
                      >
                        View Profile
                      </Link>
                    </li>
                  
                    <li>
                      <Link
                        className="dropdown-item py-1 mb-1"
                        style={{ height: "auto", lineHeight: "20px" }}
                        to="/reset-password"
                      >
                        Change Password
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item py-1 mb-1"
                        style={{ height: "auto", lineHeight: "20px" }}
                        onClick={() => logout()}
                      >
                        Signout
                      </Link>
                    </li>
                  </div>
                </div>
              </div>
            </Header>
            <Content
              style={{
                margin: "24px 16px",
                padding: 24,
                minHeight: 280,
                background: colorBgContainer,
              }}
            >
              <ToastContainer
                position="top-right"
                autoClose={250}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                theme="light"
              />
              <Outlet />
            </Content>
          </Layout>
        </Layout>
      ) : (
        <Login />
      )}
    </>
  );
};
export default MainLayout;
