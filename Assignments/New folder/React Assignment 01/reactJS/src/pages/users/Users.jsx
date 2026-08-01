import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import Navbar from "../../components/Navbar";
import UserCard from "../../components/UserCard";
import './users.css';

const Users = () => {
  let [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      let response = await axios.get("https://dummyjson.com/users");
      setUsers([...response?.data?.users]);
      console.log(response?.data?.users);
      
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <Navbar />
      <main className="main">
        {users?.length > 0 ? (
          users?.map((user) => {
            return (
              <UserCard
                uid={user?.id}
                title={user?.title}
                firstName={user?.firstName}
                lastName={user?.lastName}
                image={user?.image}
              />
            );
          })
        ) : (
          <h2>no data...</h2>
        )}
      </main>
    </>
  );
};

export default Users;
