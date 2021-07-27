import React, { useState } from "react";
import MenuIcon from "@material-ui/icons/Menu";
import TuneIcon from "@material-ui/icons/Tune";
import SearchIcon from "@material-ui/icons/Search";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import SettingsIcon from "@material-ui/icons/Settings";
import AppsIcon from "@material-ui/icons/Apps";
import ClearIcon from "@material-ui/icons/Clear";
import { IconButton } from "@material-ui/core";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, logout } from "./../features/userSlice";
import { auth } from "./../firebase";
import "./../css/Header.css";
import { handleShowSidebar, handleFilterData } from "../features/mailSlice";
const Header = () => {
  const [filter, setFilter] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        dispatch(logout());
      })
      .catch((error) => alert(error));
  };
  return (
    <div className="header">
      <div className="header__left">
        <IconButton onClick={() => dispatch(handleShowSidebar())}>
          <MenuIcon />
        </IconButton>
        <img
          onClick={() => history.push("/")}
          style={{ width: "100px", cursor: "pointer" }}
          src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_dark_1x_r2.png"
          alt="icon"
        />
        <div className="header__left__input">
          <IconButton>
            <SearchIcon />
          </IconButton>
          <input
            type="text"
            value={filter}
            placeholder="Search Mail"
            onChange={(e) => {
              dispatch(handleFilterData(e.target.value));
              setFilter(e.target.value);
            }}
          />
          <div className="input__icons">
            <IconButton
              onClick={() => {
                dispatch(handleFilterData(""));
                setFilter("");
              }}
            >
              <ClearIcon />
            </IconButton>
            <IconButton>
              <TuneIcon />
            </IconButton>
          </div>
        </div>
      </div>
      <div className="header__right">
        <div className="header__right__icons">
          <IconButton>
            <HelpOutlineIcon />
          </IconButton>
          <IconButton>
            <SettingsIcon />
          </IconButton>
          <IconButton>
            <AppsIcon />
          </IconButton>
        </div>
        <div className="header__right__image" onClick={() => handleSignOut()}>
          <img
            style={{ width: "80px" }}
            src="https://admin.google.com/u/0/ac/images/logo.gif?uid=100814915410390420480&service=google_gsuite"
            alt="hola"
          />
          <img style={{ width: "30px" }} src={user.photo} alt={user.name} />
        </div>
      </div>
    </div>
  );
};

export default Header;
