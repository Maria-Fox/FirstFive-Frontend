import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../API";
import UserContext from "./UserContext";
import AlertNotification from "../Common/AlertNotifications";
import "./UserProfile.css";

const UserProfile = () => {
  const { username } = useParams();
  const { authUser } = useContext(UserContext);
  const [userData, setUserData] = useState(null);
  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();

  // ***************************************************************

  useEffect(function userProfile() {
    async function viewUserProfile() {
      try {
        let user = await API.viewAuthUserProfile(username);
        // console.log("Data is:", user)
        setUserData({
          username: user.username,
          bio: user.bio,
          email: user.email
        });
      } catch (e) {
        console.log(e, "***")
      };
    };

    viewUserProfile();
  }, [setUserData, username]);

  // ***************************************************************


  // Need guidance on how I can update an owner - component wise.
  let navigateToUpdate = () => {
    console.log("update ran")
    navigate(`/users/update/${authUser}`);
    console.log("nav ran")
  };

  // ***************************************************************


  let handleDelete = () => {
    console.log("delete ran")
    try {
      API.deleteUser(authUser);
      navigate("/auth/register");
    } catch (e) {
      setErrors(e);
      return;
    }
  };

  if (!userData) return <p>Loading...</p>

  // The routes are the same jus the type of route (get vs path is diff) how do I move around that?
  let updateForm = (
    <div className="ProfileOptions">
      <button onClick={navigateToUpdate}>Update Profile Details</button>
      <div style={{ paddingTop: "20px" }}>
        <p style={{ color: "red" }}>Danger Zone</p>
        <button onClick={handleDelete} style={{ backgroundColor: "red" }}>Delete Profile</button>
      </div>
    </div>
  );


  return (
    <div>
      {errors ? <AlertNotification messages={errors} /> : null}
      <h1 style={{ textAlign: "center" }}>Profile</h1>

      <div className="ProfilePage">

        <h2>Username: {userData.username}</h2>
        <p>Bio: {userData.bio}</p>
        <p>Email: {userData.email}</p>

        {updateForm}
      </div>
    </div>
  );
};

export default UserProfile;