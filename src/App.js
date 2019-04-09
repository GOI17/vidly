import React, { Component } from "react";
import MoviesTable from "./components/moviesTable";
import "./App.css";

class App extends Component {
  render() {
    return (
      <main className="container">
        <MoviesTable />
      </main>
    );
  }
}

export default App;
