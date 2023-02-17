import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render, fireEvent } from "@testing-library/react";
import Dopamine from "./Dopamine";
import { UserProvider } from "../TestUtils";

test("Dopamine comp is rendered for auth user", function () {
  let { asFragment } = render(
    <MemoryRouter>
      <UserProvider>
        <Dopamine />
      </UserProvider>
    </MemoryRouter>
  );

  expect(asFragment()).toMatchSnapshot();
});


test("Confetti button can be clicked on", function () {
  // mock confetti callback
  const handleClick = jest.fn();

  // getByText method to grab button and fire off event.
  let { getByText } = render(
    <MemoryRouter>
      <UserProvider>
        <Dopamine />
      </UserProvider>
    </MemoryRouter>
  );

  const confettiButton = getByText("Confetti");

  fireEvent.click(confettiButton);
  expect(handleClick).toHaveBeenCalled();
});


test("Dopamine comp is NOT rendered for unauth user", function () {
  let { asFragment } = render(
    <Dopamine />
  );

  expect(asFragment()).not.toMatchSnapshot();
});