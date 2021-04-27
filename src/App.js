import "antd/dist/antd.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Content from "./components/Content";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import routes from "./routes";
import { useAuth } from "./services/customHooks/useAuth";

function App() {
  const context = useAuth();

  return (
    <div className="App">
      {/* <h1>{context?signed[0]}</h1> */}
      <Router>
        <Header />
        <Content>
          <Switch>
            {routes.map((route) =>
              route.private && !context.signed ? (
                <Redirect to="/signin" />
              ) : (
                <Route
                  key={route.component}
                  path={route.path}
                  component={route.component}
                />
              )
            )}
          </Switch>
        </Content>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
