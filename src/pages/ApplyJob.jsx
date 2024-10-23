import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { SpinnerDotted } from "spinners-react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const ApplyJob = () => {
  const notify = (message) => toast(message);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [cgpa, setCgpa] = useState(0);
  const [college, setCollege] = useState("");
  const [skills, setSkill] = useState("");
  const [hirereason, setHirereason] = useState("");
  const [coverletter, setCV] = useState("");
  const [resume, setResume] = useState("");

  const handleSubmit = async () => {
    try {
      const username = localStorage.getItem("username", "");
      const response = await axios.post(
        "http://localhost:3000/api/createdetails",
        {
          name,email,address,college,cgpa,skills,hirereason,coverletter,resume
        }
      );
      console.log(response.data.message);
      if (response.data.message === "Application created successfully") {
        notify(response.data.message);
        // navigate('/');
      } else {
        notify(response.data.message);
        // navigate('/createapplication');
      }
    } catch (err) {
      notify(err.message);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen p-5 rounded-md shadow-lg">
        <div className="flex-column  justify-center items-center bg-[#F1F1F1] rounded-md shadow-md p-2 w-[47%]">
          <div className="text-bold text-[#21209C] m-2 text-2xl">
           Fill Details
          </div>
          <div className="text-sm m-4">
            <label htmlFor="title"></label>
            <input
              type="text"
              name="title"
              className="rounded-md w-[40rem] placeholder:text-sm p-2"
              placeholder="Name"
              value={name}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="text-sm m-4">
            <label htmlFor="email"></label>
            <input
              type="text"
              name="email"
              className="rounded-md w-[40rem] placeholder:text-sm p-2"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="text-sm m-4">
            <label htmlFor="Address"></label>
            <input
              type="text"
              name="location"
              className="rounded-md w-[40rem] placeholder:text-sm p-2"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          
          <div className="text-sm m-4">
            <label htmlFor="description"></label>
            <input
              type="text"
              name="description"
              className="rounded-md w-[40rem] placeholder:text-sm p-2"
              placeholder="College with branch"
              value={college}
              onChange={(e) => setCollege(e.target.value)}
            />
          </div>
          <div className="text-sm m-4">
            <label htmlFor="Cgpa"> </label>
            <input
              type="number"
              name="cgpa"
              className="rounded-md w-[40rem] placeholder:text-sm p-2"
              placeholder="cgpa"
              value={cgpa}
              onChange={(e) => setCgpa(e.target.value)}
            />
          </div>
          <div className="text-sm m-4">
            <label htmlFor="Skills"> </label>
            <input
              type="text"
              name="Skills"
              className="rounded-md w-[40rem] placeholder:text-sm p-2"
              placeholder="Skills"
              value={skills}
              onChange={(e) => setSkill(e.target.value)}
            />
          </div>
          <div className="text-sm m-4">
            <label htmlFor="duration"> </label>
            <input
              type="text"
              name="duration"
              className="rounded-md w-[40rem] placeholder:text-sm p-2"
              placeholder="Why you should be hired for this role?"
              value={hirereason}
              onChange={(e) => setHirereason(e.target.value)}
            />
          </div>
          <div className="text-sm m-4">
            <label htmlFor="status"> </label>
            <textarea
            rows={3}
              name="status"
              className="rounded-md w-[40rem] placeholder:text-sm p-2"
              placeholder="Cover letter"
              value={coverletter}
              onChange={(e) => setCV(e.target.value)}
            />
          </div>
          <div className="text-sm m-4">
            <label htmlFor="resume" className="text-[#21209C] ml-2">Resume</label>
            <input
              type="file"
              accept=".pdf"
              name="amount"
              id="resume"
              className="rounded-md w-[40rem] placeholder:text-sm p-2"
              placeholder="Resume"
              onChange={(e)=>setResume(e.target.files[0])}
           
            />
          </div>
<div className="flex justify-center"><button
            className="bg-[#FDB827] w-[15%] mt-2 text-[#23120B] rounded-md p-1 shadow-lg"
            onClick={() => handleSubmit()}
          >
            Submit
          </button></div>
          
        </div>
      </div>

      <ToastContainer />
    </>
  );
};
