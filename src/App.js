import React, { useEffect } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Mail from "./components/Mail";
import MailList from "./components/MailList";
import Login from "./components/Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import NewMail from "./components/NewMail";
import { useSelector, useDispatch } from "react-redux";
import { selectSendNewMail, selectShowSidebar } from "./features/mailSlice";
import { selectUser, login } from "./features/userSlice";
import { auth } from "./firebase";
const App = () => {
  const sendNewMailIsOpen = useSelector(selectSendNewMail);
  const user = useSelector(selectUser);
  const showSidebar = useSelector(selectShowSidebar);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(
          login({
            name: user.displayName,
            email: user.email,
            photo: user.photoURL,
          })
        );
      }
    });
  }, []);
  return (
    <Router>
      {user ? (
        <div className="app">
          <Header />
          <div className="app__body">
            <Sidebar />
            <div
              style={{ width: `${!showSidebar ? "calc(100%-240px)" : "100%"}` }}
            >
              <Switch>
                <Route path="/mail">
                  <Mail />
                </Route>
                <Route path="/">
                  <MailList />
                </Route>
              </Switch>
            </div>
          </div>
          {sendNewMailIsOpen && <NewMail />}
        </div>
      ) : (
        <Login />
      )}
    </Router>
  );
};

export default App;
