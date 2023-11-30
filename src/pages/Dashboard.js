import React, { useEffect, useState } from "react";
import { Column } from "@ant-design/plots";
import { GetUserCountByMonth, GetBlogCount,GetCategoryCount,GetUserCount } from "../services/Api/Api";

const getAllMonths = () => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return months.map((month) => ({ type: month, sales: 0 }));
};

const Dashboard = () => {
  const [userData, setUserData] = useState([]);
  const [blogData, setBlogData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [customerData,setCustomerData] = useState([]);

  //get customer count
  const getCustomerData = async () => {
    try {
      const result = await GetUserCount(localStorage.getItem("adminToken"));
      setCustomerData(result.data.data);
      console.log("blogdata", result);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getCustomerData();
  }, []);



  //get categroy count
  const getCategoryData = async () => {
    try {
      const result = await GetCategoryCount(localStorage.getItem("adminToken"));
      setCategoryData(result.data.data);
      console.log("blogdata", result);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getCategoryData();
  }, []);

  //get blog count
  const getBlogData = async () => {
    try {
      const result = await GetBlogCount(localStorage.getItem("adminToken"));
      setBlogData(result.data.data);
      console.log("blogdata", result);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getBlogData();
  }, []);

  

  //get usercount by month api
  const getData = async () => {
    try {
      const result = await GetUserCountByMonth(
        localStorage.getItem("adminToken")
      );
      setUserData(result.data.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const formattedData =
    userData.length > 0
      ? userData.map(({ month, userCount }) => ({
          type: month,
          sales: userCount,
        }))
      : getAllMonths();

  const config = {
    data: formattedData,
    xField: "type",
    yField: "sales",
    color: ({ type }) => "#ffd333",
    label: {
      position: "middle",
      style: {
        fill: "#FFFFFF",
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "Month",
      },
      sales: {
        alias: "User Count",
      },
    },
  };

  return (
    <div>
      <h3 className="mb-4 title">Dashboard</h3>
      <div className="d-flex justify-content-between align-items-center gap-3">
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 roudned-3">
          <div>
            <p className="desc">Total Users</p>
            <h4 className="mb-0 sub-title">{customerData}</h4>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 roudned-3">
          <div>
            <p className="desc">Total Stories</p>
            <h4 className="mb-0 sub-title">{blogData}</h4>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 roudned-3">
          <div>
            <p className="desc">Total Categories</p>
            <h4 className="mb-0 sub-title">{categoryData}</h4>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="mb-5 title">User Registration Statistics by Month</h3>
        <div>
          <Column {...config} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
