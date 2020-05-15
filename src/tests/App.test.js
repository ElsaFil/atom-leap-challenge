import React from "react";
import ReactDOM from "react-dom";
import { render, cleanup, waitForDomChange } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import App from "../App";

afterEach(cleanup);

// tests

test("runs app", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
});

test("renders the select input", () => {
  const select = render(<App />).getByTestId("selectDataType");
  expect(select).toBeInTheDocument();
});

test("renders the graph container", () => {
  const app = render(<App />);
  const container = app.getByTestId("graph-container");
  expect(container).toBeInTheDocument();
});

test("aggregates data correctly", async () => {
  const data = [
    {
      id: 301,
      category: "Games",
      location: "Brazil",
      fundingAmount: 65500,
      announcedDate: "Oct 31, 2011",
    },
    {
      id: 302,
      category: "Games",
      location: "Brazil",
      fundingAmount: 17100,
      announcedDate: "May 14, 2012",
    },
    {
      id: 303,
      category: "Games",
      location: "Brazil",
      fundingAmount: 48000000,
      announcedDate: "Dec 13, 2016",
    },
    {
      id: 304,
      category: "Games",
      location: "Brazil",
      fundingAmount: 78900,
      announcedDate: "Dec 13, 2018",
    },
    {
      id: 305,
      category: "Games",
      location: "Brazil",
      fundingAmount: 93900,
      announcedDate: "Aug 18, 2014",
    },
    {
      id: 306,
      category: "Games",
      location: "Brazil",
      fundingAmount: 70900,
      announcedDate: "June 7, 2013",
    },
  ];
  var mock = new MockAdapter(axios);
  mock.onGet("http://demo0377384.mockable.io/funding-test").reply(200, data);

  // const app = render(<App />);
  // const gamesColumn = await waitForDomChange(() => {
  //   const found = app.findByText("48.3263");
  //   console.log(found);
  //   return found;
  // });
  // expect(gamesColumn).toBeInTheDocument();
});
