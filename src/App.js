import React from "react";
import "./styles.css";
import { hot } from "react-hot-loader";
import List from "./List";

class App extends React.Component {
  render() {
    return <div>
      <List />
    </div>;
  }
}

export default hot(module)(App);
