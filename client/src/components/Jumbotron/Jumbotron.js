import React from "react";

const Jumbotron = (props) =>
  <div style={{ height: 300, clear: 'both' }} className={"jumbotron " + props.className}>
    {props.children}
  </div>;

export default Jumbotron;
