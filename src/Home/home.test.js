import React from "react";
import { render } from "@testing-library/react";
import Home from "./Home";
import { MemoryRouter } from "react-router";

// smoke
test("Should render Home Page", function () {
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>);
});



// snapshot test. The first time user will have "Loading..."
test("Creates a LoginForm snapshot", function () {

  // as fragment is a method destructured from the return obj. Puts return item in a div and we can test what's in the fragment.
  const { asFragment } = render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>,
  );
  expect(asFragment()).toMatchSnapshot();
});