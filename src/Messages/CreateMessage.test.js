import React from "react";
import { MemoryRouter } from "react-router-dom";
import { UserProvider } from "../TestUtils";
import CreateMessage from "./CreateMessage";
import { render } from "@testing-library/react";


test("Smoke - renders the CreateMessageForm", function () {
  render(<CreateMessage />);
});

test("CreateMsg forms renders for valid user", function () {

  let { asFragment } = render(
    <MemoryRouter>
      <UserProvider>
        <CreateMessage />
      </UserProvider>
    </MemoryRouter>
  );

  expect(asFragment()).toMatchSnapshot();
});

test("CreateMsg forms does NOT render for invalid user", function () {
  let { asFragment } = render(
    <MemoryRouter>
      <CreateMessage />
    </MemoryRouter>
  );

  expect(asFragment()).not.toMatchSnapshot();
});

