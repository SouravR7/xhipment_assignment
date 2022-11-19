import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  Routes,
  Route,
  BrowserRouter as Router,
  useNavigate,
} from "react-router-dom";
import jwt_decode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { createBrowserHistory } from "history";
import Login from "./component/Auth/login";
import Home from "./component/home/home";
import Protected from "./component/AuthorizedApp";
import { dispatchUpdateUserObject } from "./store/dispatchers/userDispatcher";

function App() {
  const history = createBrowserHistory();
  const user_data = useSelector((state) => state.userData.data);
  const { email, name } = user_data;
  let token = localStorage.getItem("user_token");

  console.log(user_data);

  useEffect(() => {
    if (token && !email) {
      var user = jwt_decode(token);
      dispatchUpdateUserObject(user);
    }
  }, [user_data]);

  return (
    <Router history={history}>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route
          path="/home"
          element={
            <Protected isLoggedIn={token}>
              <Home />
            </Protected>
          }
        />
        {/* <Route exact path="/dashboard" element={<Dashboard />} /> */}
        {/* <Route exact path="/signin" render={(props) => <Signin {...props} />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
