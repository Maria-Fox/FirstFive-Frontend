import React, { useContext } from "react";
import { MemoryRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import MessageList from "./MessaageList";
import { UserProvider } from "../TestUtils";

const { authUser } = useContext(UserProvider);


test("Smoke - Renders message list", function () {
  render(<MessageList />);
});

test("Valid user see's MessageList", function () {
  jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
    useParams: () => ({
      username: authUser.username,
    }),
    useRouteMatch: () => ({ url: '/messages/:username/all' }),
  }));

  let { asFragment } = render(
    <MemoryRouter>
      <UserProvider>
        <MessageList />
      </UserProvider>
    </MemoryRouter>
  );

  expect(asFragment()).toMatchSnapShot();
});