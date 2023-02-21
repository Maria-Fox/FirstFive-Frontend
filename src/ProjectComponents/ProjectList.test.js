import React from "react";
import { render, getByText } from "@testing-library/react";
import ProjectList from "./ProjectList";
import { MemoryRouter } from "react-router-dom";
import App from "../App";
// import { UserProvider } from "../TestUtils";
import axios from "axios";
import UserContext from "../UserComponents/UserContext";


describe("ProjectList component- approp display", function () {

  // test("Render ProjectList component", function () {
  //   <MemoryRouter>
  //     <ProjectList />
  //   </MemoryRouter>
  // });


  // test("Valid user, renders loading if no API call yet.", function () {

  //   const validUser = { username: "softwareDev1", matchedProjectIds: [] };

  //   //Not mocking API call- justpassing in 0 matchedProjectIds so user see's "Loading..."

  //   const { asFragment, getByText } = render(
  //     <MemoryRouter>
  //       <UserContext.Provider value={validUser}>
  //         <ProjectList />
  //       </UserContext.Provider>
  //     </MemoryRouter >
  //   );

  //   expect(getByText('Projects')).toBeInTheDocument();
  //   expect(asFragment()).toMatchSnapshot();
  // });

  // SNAPSHOT doens't match excpected outcome. I expect the project to be displayed but it's a state piece. Only gets updated after API call.
  test("Valid user, renders full project list WITH matchedprojects.", function () {

    const validUser = { username: "softwareDev1", matchedProjectIds: [1, 2, 3] };

    jest.mock(axios);

    let projects = [{
      id: 4,
      owner_username: "Delia_Designs",
      name: "Designa smart TV APP layout",
      project_desc: "'Beautifully design an interface for smart TV platforms. Include comprehnsive testing for all devices.",
      timeframe: "3-6 months",
      github_repo: "https://github.com/"
    }];

    // Mocks API request in useEffect & populates the projects state piece which is then rendered in the DOM.
    axios.get.mockResolvedValue(projects);

    const { asFragment, getByText } = render(
      <MemoryRouter>
        <UserContext.Provider value={validUser}>
          <ProjectList projects={projects} />
        </UserContext.Provider>
      </MemoryRouter >
    );

    expect(getByText('Projects')).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });
});

