import React from "react";
import Fixtures from "./Fixtures";
import Table from "./table";

const Home = (props) => {
  return (
    <div>
      <div className="container home">
        <div className="row">
          <div className="col col-8">
            <Fixtures />
          </div>
          <div className="col col-4 home-table">
            <Table miniDisplay={true} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
