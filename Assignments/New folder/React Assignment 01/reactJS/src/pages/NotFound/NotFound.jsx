import React from "react";
import Navbar from "../../components/Navbar";
import "./notFound.css";

const NotFound = () => {
  return (
    <>
      <Navbar />

      <div className="notFound-container">
        <h1>404</h1>
        <h3>Oops... Page not found !</h3>
      </div>
    </>
  );
};

export default NotFound;
