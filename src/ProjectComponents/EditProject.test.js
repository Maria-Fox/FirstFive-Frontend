import React from "react";
import { render } from "@testing-library/react";
import EditProject from "./EditProject";
import UserContext from "../UserComponents/UserContext";
import { MemoryRouter } from "react-router-dom";

describe("Rendering edit project form", function () {

  test("Smoke- Valid User- rendered edit project component.",
    function () {

      const authUser = { username: "softwareDev1" };

      render(
        <MemoryRouter>
          <UserContext.Provider value={authUser}>
            <EditProject />
          </UserContext.Provider>
        </MemoryRouter>
      );
    });

  test("Snapshot- matches project edit.", function () {

    const { asFragment } = render(
      <MemoryRouter>
        <UserContext.Provider value={{ username: "softwareDev1" }}>
          <EditProject />
        </UserContext.Provider>
      </MemoryRouter>
    );

    expect(asFragment()).toMatchSnapshot();
  })
});

