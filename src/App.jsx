import "./App.css";
import Adminpenal from "./pages/Adminpenal";
import Categary from "./pages/Categary";
import DashBoard from "./pages/DashBoard";
import InteviewPortal from "./pages/InteviewPortal";
import SubCatagary from "./pages/SubCatagary";
import QandA from "./pages/QandA";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
function App() {
  return (
    <>
      {/* <Adminpenal/> */}
      {/* <InteviewPortal /> */}
      {/* <DashBoard/> */}
      {/* <Categary/> */}
      {/* <SubCatagary/> */}
      {/* <QandA/> */}
      <Router>
        <Switch>
        <Route path="/qa">
          <QandA></QandA>
          </Route>
        <Route path="/subcategory">
        <SubCatagary></SubCatagary>
          </Route>
          <Route path="/categary">
          <Categary></Categary>
          </Route>
          <Route path="/dashboard">
          <DashBoard></DashBoard>
          </Route>
          <Route path="/">
            <Adminpenal />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
