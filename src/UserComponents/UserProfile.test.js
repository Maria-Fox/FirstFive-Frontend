import React from "react";
import { render } from "@testing-library/react";
import UserProfile from "./UserProfile";
import { UserProvider } from "../TestUtils";

test("Renders UserProfile component w/ valid user", function () {

  // userData is obtained through API call (name is passed in through URL params) - not a prop. Unsure how to test.
  render(
    <UserProvider>
      <UserProfile />
    </UserProvider>
  );
});


test("Does NOT render UserProfile for invalid user", function () {
  // Render does not include the UserProvider component.
  const { asFragment } = render(
    <UserProfile />
  );

  expect(asFragment()).not.toMatchSnapshot();
});