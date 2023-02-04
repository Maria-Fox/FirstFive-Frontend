import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UserContext from "./UserContext";

const UpdateProfileForm = () => {

  const { authUser } = useContext(UserContext);
  const { username } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function confirmPermission() {
      if (authUser !== username) {
        // If not the appropriate user then redirect to that users page.
        navigate(`/users/update/:${authUser}`);
      };
    };
  });




  return (
    <div>
      <h1>Update Profile</h1>
      <p>Find out how to prepoulate a form w/ current data for edits.</p>
      <p>Add a handleSubmit function to send off the request.</p>

    </div>
  )
};

export default UpdateProfileForm;
