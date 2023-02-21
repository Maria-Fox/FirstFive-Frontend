import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render, fireEvent, getByText } from "@testing-library/react";
import Dopamine from "./Dopamine";
import { authUser } from "../TestUtils";
import UserContext from "./UserContext";
import { Button } from "reactstrap";

test("Dopamine comp is rendered for auth user", function () {
  let { asFragment } = render(
    <MemoryRouter>
      <UserContext.Provider value={authUser}>
        <Dopamine />
      </UserContext.Provider>
    </MemoryRouter>
  );

  expect(asFragment()).toMatchSnapshot();
});


test("Confetti button can be clicked on", function () {
  // mock confetti callback
  const handleClick = jest.fn();

  // getByText method to grab button and fire off event.
  render(<Dopamine />);

  fireEvent.click(getByText("Confetti"));
  expect(handleClick).toHaveBeenCalled(1);
});