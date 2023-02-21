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
});

// Create a mock of the useParams React hook 
jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useParams: jest.fn(),
}))

// alt: 
test('It renders the comp w/ URL', async () => {
  jest.spyOn(MemoryRouter, 'useParams').mockReturnValue({ username: authUser.username });

  let { asFragment } = render(
    <MemoryRouter >
      <UserProvider user={authUser}>
        <MessageList />
      </UserProvider>
    </MemoryRouter>
  );

  expect(asFragment()).toMatchSnapShot();
});

// https://kpwags.com/posts/2022/07/01/mocking-react-router-and-useparams