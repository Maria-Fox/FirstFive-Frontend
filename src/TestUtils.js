// Used to create sample test user data & test UserContect provider..

import React from "react";
import UserContext from "./UserComponents/UserContext";

const testUser = {
  username: "softwareDev1"
};

// sample / data
const matchedIds = [1, 2, 3, 4];

// Creating a contect provider and passing in the test user, matching ids. Passing in chidlren.
const UserProvider =
  ({ children, authUser: testUser, matchedIds }) => {
    <UserContext.Provider value={{ authUser, matchedIds }}>
      {children}
    </UserContext.Provider>
  };

export { UserProvider };