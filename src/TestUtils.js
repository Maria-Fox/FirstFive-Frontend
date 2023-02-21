// Used to create sample test user data & test UserContect provider..

import React from "react";
import UserContext from "./UserComponents/UserContext";

const testUser = {
  username: "softwareDev1"
};

// sample / data
const matchedProjectIds = [1, 2, 3, 4];

// Creating a context provider and passing in the test user, matching ids. Passing in chidlren.
const UserProvider =
  ({ children, authUser: testUser, matchedProjectIds }) => {
    <UserContext.Provider value={{ authUser, matchedProjectIds }}>
      {children}
    </UserContext.Provider>
  };

export { UserProvider };