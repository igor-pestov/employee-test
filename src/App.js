import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./componets/Dashboard/Dashboard";
import Header from "./componets/Header/Header";
import TableEmployee from "./componets/TableEmployee.js/TableEmployee";

function App() {
  const data = JSON.parse(localStorage.getItem("employee"));

  return (
    <Router>
      <Header />
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Dashboard data={data} />
          </Route>

          <Route path="/employee-table">
            <TableEmployee data={data} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
