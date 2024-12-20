import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { SpinnerDotted } from "spinners-react";
import { useNavigate } from "react-router-dom";
import { IoLocationOutline } from "react-icons/io5";
import { MdAttachMoney } from "react-icons/md";
import { FaRegBuilding } from "react-icons/fa";
import { TfiTimer } from "react-icons/tfi";
import { useAuth } from "../pages/AuthContext";
export const JobsApplied = () => {
  axios.defaults.withCredentials=true;
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [curtime, setcurtime] = useState(Date.now());
  const getdetails = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/myjobs`);
      setItems(response.data);
      console.log(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  const islogin = async () => {
    try {
      const {islogin}=useAuth();
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/isseekerlogin`);
      console.log(response.data);
      if (response.data === "no refreshtoken" || response.data==="invalid refresh token") {
        
        navigate('/');
      }
    } catch (error) {
      console.error('Error fetching login status:', error);
      
    }
  }

  useEffect(() => {
    islogin();
    getdetails();
  }, []);

  return (
    <>
      <div className="flex justify-center h-[100vh] ">
        <div className="flex-column justify-center w-[100%] m-5 bg-[#F1F1F1] overflow-y-auto">
          {loading ? (
             <div className="flex justify-center h-full">   <div className="flex flex-col justify-center"><SpinnerDotted size={50} thickness={100} speed={98} color="rgba(33, 32, 156, 1)" className="items-center justify-center align-center h-full" /></div> </div>
          ) : items === "No data" || items.length === 0 ? (
            <div className="text-center text-xl text-gray-500 mt-10">
              No data available
            </div>
          ) : (
            items.map((item, index) => (
              <button
                key={index}
                onClick={() => navigate(`/fullview/${item._id}`)}
                className="flex flex-wrap m-2 rounded-md shadow-md p-10 mr-10 w-[90%] bg-white align-center"
              >
                <div className="w-[100%]">
                  <div className="flex text-[#21209C] text-2xl ml-14">
                    {item.title}
                  </div>
                  <div className="flex gap-[10%] ml-14 mt-5">
                    <div className="text-lg text-[#FDB827] flex">
                      <FaRegBuilding className="mt-1 mr-1" />
                      {item.companyname}
                    </div>
                    <div className="flex gap-2">
                      <IoLocationOutline className="mt-1" />
                      <div> {item.location}</div>
                    </div>
                    <div className="flex gap-2">
                      <MdAttachMoney className="mt-1" />
                      <div>{item.amount}/month</div>
                    </div>
                    <div className="text-green-400 flex gap-2">
                      <div className="mt-1">
                        <TfiTimer />
                      </div>
                      {Math.floor(
                        (new Date(curtime) - new Date(item.date)) /
                          (1000 * 60 * 60 * 24)
                      )}{" "}
                      days ago
                    </div>
                  </div>
                </div>
              </button>
            ))
          )}
        </div>
      </div>
    </>
  );
};
