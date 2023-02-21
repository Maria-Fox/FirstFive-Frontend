import React from "react";
import { render, getByText } from "@testing-library/react";
import ProjectCarousel from "./ProjectCarousel";
import UserContext from "../UserComponents/UserContext";
import { MemoryRouter } from "react-router-dom";


describe("Renders ProjectCarousel", function () {

  test("Smoke - project carousel", function () {
    render(
      <MemoryRouter>
        <ProjectCarousel />
      </MemoryRouter>
    );
  });

  // test("Smoke - Render carousel", function () {
  //   const user = { username: "softwareDev1" };

  //   const { asFragment } = render(
  //     <MemoryRouter>
  //       <UserContext value={user}>
  //         <ProjectCarousel />
  //       </UserContext>
  //     </MemoryRouter>
  //   );
  // });

  // expect(asFragment()).toMatchSnapshot();
});