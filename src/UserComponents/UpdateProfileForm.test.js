import React from "react";
import { MemoryRouter } from "react-router-dom";
import UpdateProfileForm from "./UpdateProfileForm";
import { UserProvider } from "../TestUtils";

test("Renders form for valid user", function () {
  let { asFragment } = render(
    <UserProvider>
      <UpdateProfileForm />
    </UserProvider>
  );

  expect(asFragment()).toMatchSnapshot();
});

test("Does not render for invalid user", function () {
  let { asFragment } = render(
    <UpdateProfileForm />
  );

  expect(asFragment()).not.toMatchSnapshot();
});