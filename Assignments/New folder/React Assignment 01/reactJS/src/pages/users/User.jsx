import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import Navbar from "../../components/Navbar";
import './user.css';

const User = () => {
  let [userInfo, setUserInfo] = useState(null);
  let { id } = useParams();

  const fetchUserInfo = async () => {
    // fetching single user by dynamic id
    try {
      let response = await axios.get(`https://dummyjson.com/users/${id}`);
      console.log(response?.data);
      setUserInfo(response?.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    <>
      <Navbar />
      <div>
        {
          userInfo ? 
          (
            // UI
            <div className="userinfo-card">
              <div>
                <img src={userInfo?.image} alt={`${userInfo?.firstName} profile`} />
              </div>

              <div>
                <h2>Full Name: {userInfo?.firstName} {userInfo?.lastName}</h2>
              <h2>Username: @{userInfo?.username}</h2>
              <h2>Organization: {userInfo?.company?.title}</h2>
              <h2>University: {userInfo?.university}</h2>
              <h2>Gender: {userInfo?.gender}</h2>
              <h2>Address: {userInfo?.address?.address}, {userInfo?.address?.city}</h2>
              <h2>Email: {userInfo?.email}</h2>
              <h2>Phone: {userInfo?.phone}</h2>
              </div>
            </div>
            //
          ) : (<h2>Loading user profile...</h2>)
        }
      </div>
    </>
  );
};

export default User;
