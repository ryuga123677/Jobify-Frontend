import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { SpinnerDotted } from "spinners-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
export const Applicantchatlist = () => {
  axios.defaults.withCredentials=true;
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const getdetails = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/provider/getapplieremail?search=${localStorage.getItem("provideremail")}`
      );
      setItems(response.data);
      console.log(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  const islogin = async () => {
    try {const {islogin}=useAuth();
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/provider/isproviderlogin`);
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
      <div className="flex justify-center h-[100vh]">
  <div className="flex-column justify-center w-[100%] m-5 bg-[#F1F1F1] overflow-y-auto">
    {loading ? (
      <div className="flex justify-center h-full">   <div className="flex flex-col justify-center"><SpinnerDotted size={50} thickness={100} speed={98} color="rgba(33, 32, 156, 1)" className="items-center justify-center align-center h-full" /></div> </div>
    ) : (
     
      [...new Set(items)].map((item, index) => (
        <button
          key={index}
          onClick={() => {navigate(`/chat/${item}`)}}
          className="flex flex-wrap m-2 rounded-md shadow-md p-10 mr-10 w-[90%] bg-white align-center"
        >
          <div className="w-[100%]">
            <div className="flex text-[#21209C] gap-2 text-xl ml-14"><span>{item}</span> <span className="text-black text-md"> -has applied for job.Click to chat</span></div>
          </div>
        </button>
      ))
    )}
  </div>
</div>

    </>
  );
};
