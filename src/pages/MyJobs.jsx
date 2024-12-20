import React, { useEffect, useState } from "react";
import axios from "axios";
import { SpinnerDotted } from "spinners-react";
import { useNavigate } from "react-router-dom";
import { IoLocationOutline } from "react-icons/io5";
import { TiDelete } from "react-icons/ti";
import { MdAttachMoney } from "react-icons/md";
import { FaRegBuilding } from "react-icons/fa";
import { TfiTimer } from "react-icons/tfi";
import { useAuth } from "../pages/AuthContext";

export const JobsPosted = () => {
  axios.defaults.withCredentials=true;
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [curtime, setcurtime] = useState(Date.now());
  const [searchTerm, setSearchTerm] = useState(""); // State for search term

  const getdetails = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/provider/jobsposted?search=${localStorage.getItem(
          "provideremail"
        )}`
      );
      setItems(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const islogin = async () => {
    const {islogin}=useAuth();
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/provider/isproviderlogin`,{
          withCredentials:true,
        }
      );
      if (response.data === "no refreshtoken" || response.data==="invalid refresh token" ) {
        navigate("/");
      }
    } catch (error) {
      console.error("Error fetching login status:", error);
    }
  };

  useEffect(() => {
    islogin();
    getdetails();
  }, []);

  // Filter items based on searchTerm
  const filteredItems = items.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex justify-center h-[100vh] ">
      <div className="flex-column justify-center items-center w-[100%] m-5 bg-[#F1F1F1] overflow-y-auto">
        <div className="w-full flex justify-center m-2">
          <input
            type="text"
            placeholder="Search..."
            className="w-[50%] p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm} // Bind input value to searchTerm state
            onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm on input change
          />
        </div>
        {loading ? (
          <div className="flex justify-center h-full">
            <SpinnerDotted
              size={50}
              thickness={100}
              speed={98}
              color="rgba(33, 32, 156, 1)"
              className="items-center justify-center align-center h-full"
            />
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center text-xl text-gray-500 mt-10">
            No data available
          </div>
        ) : (
          filteredItems.map((item, index) => (
            <button
              key={index}
              className="flex flex-wrap m-2 rounded-md shadow-md p-10 mr-10 w-[90%] bg-white align-center hover:scale-105 transition-all"
            >
              <div className="w-[100%]">
                <div className="flex justify-between items-center text-2xl text-[#21209C] ml-14">
                  <div>{item.title}</div>

                  <div className="flex space-x-4">
                    <button
                      className="text-sm text-sky-400"
                      onClick={() => navigate(`/applicantlist/${item._id}`)}
                    >
                      Applications
                    </button>
                    <button className="text-md text-red-500">
                      <TiDelete />
                    </button>
                  </div>
                </div>

                <div className="flex justify-between ml-14 mt-5 ">
                  <div className="text-lg text-[#FDB827] flex">
                    <FaRegBuilding className="mt-1 mr-1" />
                    {item.companyname}
                  </div>
                  <div className="flex gap-5 text-sm">
                  <div className="flex gap-1">
                    <IoLocationOutline className="mt-1" />
                    <div>{item.location}</div>
                  </div>
                  <div className="flex gap-1">
                    <MdAttachMoney className="mt-1" />
                    <div>{item.amount}/month</div>
                  </div>
                  <div className="flex gap-1 text-[#FDB827]">
                    <TfiTimer className="mt-1" />
                    {Math.floor(
                      (new Date(curtime) - new Date(item.date)) / (1000 * 60 * 60 * 24)
                    )}{" "}
                    days ago
                  </div>
                  </div>
                </div>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
};
