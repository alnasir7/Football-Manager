import React from "react";
import Fixtures from "./Fixtures";
import Table from "./table";

const Home = () => {
  return (
    <div>
      <div className="container" style={{ paddingTop: "50px", margin: "10px" }}>
        <div className="row">
          <div className="col col-8">
            <Fixtures />
          </div>
          <div
            className="col col-4"
            style={{ maxHeight: "75vh", overflow: "scroll" }}
          >
            <Table />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
