import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Fixtures from "./Fixtures";
import Home from "./Home";
import Select from "./Select";
import { useDispatch } from "react-redux";

import generateSchedule from "../Engine/schedule";
import { uploadSchedule } from "../Actions/ReduxActions";
import Navbar from "./Navbar";
import Table from "./table";
import GoalScorers from "./GoalScorers";
import { useEffect } from "react";

const Root = () => {
  const dispatch = useDispatch();
  dispatch({ type: uploadSchedule, payload: generateSchedule() });

  useEffect(() => {}, []);

  return (
    <BrowserRouter>
      <Navbar />
      <Route path="/home" exact component={Home} />
      <Route path="/table" exact component={Table} />
      <Route path="/Fixtures" exact component={Fixtures} />
      <Route path="/goalscorers" exact component={GoalScorers} />
      <Route path="/" exact render={(props) => <Select {...props} />} />
    </BrowserRouter>
  );
};

export default Root;
