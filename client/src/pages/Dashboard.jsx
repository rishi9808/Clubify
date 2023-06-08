import React, { useEffect, useState } from "react";
import fetcher from "../utils/fetcher";
import { useNavigate, useParams } from "react-router-dom";

const Dashboard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(null);

  const getUserDetails = async () => {
    if (!id) {
        return; // If id is undefined, exit the function
      }

    console.log(id)
  
    const res = await fetcher(`api/user/${id}`, {
      method: "GET",
    });

    
    const data = await res.json();
    console.log(data);

    if (data) {
      setUserDetails(data);
    } else {
      res.err({ error: data.error });
    }
  };

  useEffect(() => {
    getUserDetails();
  }, [id]);

  return userDetails ? (
    <div className="flex flex-col justify-center items-center bg-blue-100 m-2">
      <h1 className="text-xl uppercase text-2xl m-2 p-2">
        Welcome {userDetails.name} 
      </h1>
    </div>
  ) : (
    <div></div>
  );
};

export default Dashboard;
