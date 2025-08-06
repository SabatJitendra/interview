import React from "react";
import Pagination from "./components/Pagination/Pagination";

const App = () => {
  return (
    <div>
      <div style={{ display: "block" }}>
        <h1>Pagination Component</h1>
        <Pagination />
      </div>
      <div style={{ display: "none" }}>
        <h1>Accordion Component</h1>
      </div>
    </div>
  );
};

export default App;
