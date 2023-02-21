import React from "react";
import { render } from "@testing-library/react";
import ProjectCard from "./ProjectCard";
import { MemoryRouter } from "react-router-dom";
import UserContext from "../UserComponents/UserContext";
import ProjectList from "./ProjectList";

describe("Smoke- render ProjectCard", function () {

  let project = {
    id: 1,
    name: "TestProj",
    project_desc: "test proj-desc",
    timeframe: "2 days",
    github_repo: "www.https:github.com",
    handleMatch: jest.fn()
  };

  const validUser = { username: "softwareDev1", matchedProjectIds: [] };

  test("It renders a ProjectCard", function () {

    render(
      <MemoryRouter>
        <ProjectCard props={project} />
      </MemoryRouter>
    );
  });

  test("ProjectCard populates with sample data", function () {
    const { asFragment } = render(
      <MemoryRouter>
        <UserContext.Provider value={validUser}>
          <ProjectCard props={project} />
        </UserContext.Provider>
      </MemoryRouter >
    );

    expect(asFragment()).toMatchSnapshot();
  });


  test("If ProjectList has data, ProjectCard is rendered w/ prop data", () => {


    const mockChildComponent = jest.fn();

    jest.mock("./ProjectList", () => (props) => {
      mockChildComponent(props);
      return <mockChildComponent />;
    });

    render(<ProjectCard props={project} />);


    expect(mockChildComponent).toHaveBeenCalledWith(
      expect.objectContaining({
        data: {
          id: 1,
          name: "TestProj",
          project_desc: "test proj-desc",
          timeframe: "2 days",
          github_repo: "www.https:github.com",
          handleMatch: jest.fn()
        }
      })
    )
  })
});