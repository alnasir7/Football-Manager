import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Fixtures from "./Fixtures";
import Home from "./Home";
import { useDispatch } from "react-redux";
import teams from "../Data/teams";
import generateSchedule from "../Engine/schedule";
import { uploadSchedule } from "../Actions/ReduxActions";
import Navbar from "./Navbar";
import Table from "./table";

const Root = () => {
  const dispatch = useDispatch();
  dispatch({ type: uploadSchedule, payload: generateSchedule() });
  dispatch({ type: "uploadTeams", payload: teams });

  return (
    <BrowserRouter>
      <Navbar />
      <Route path="/" exact component={Home} />
      <Route path="/table" exact component={Table} />
      <Route path="/Fixtures" exact component={Fixtures} />
    </BrowserRouter>
  );
};

export default Root;
