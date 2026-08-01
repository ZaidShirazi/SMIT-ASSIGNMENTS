import React from "react";
import { useNavigate } from "react-router";
import "./usercard.css";

const UserCard = ({ uid, title, firstName, lastName, image }) => {
  let navigate = useNavigate();

  return (
    <main>
      <div className="usercard" onClick={() => navigate(`/users/${uid}`)}>
        <div className="img-container"><img src={image} alt="userImg" /></div>
        <h2>
          {firstName} {lastName}
        </h2>
      </div>
    </main>
  );
};

export default UserCard;
