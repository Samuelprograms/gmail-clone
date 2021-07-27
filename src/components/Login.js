import React from "react";
import { auth, provider } from "./../firebase";
import { useDispatch } from "react-redux";
import { login } from "./../features/userSlice";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Button from "@material-ui/core/Button";

import "./../css/Login.css";
const Login = () => {
  const dispatch = useDispatch();
  const handleSignIn = () => {
    auth
      .signInWithPopup(provider)
      .then((user) => {
        dispatch(
          login({
            name: user.displayName,
            email: user.email,
            photo: user.photoURL,
          })
        );
      })
      .catch((error) => alert(error));
  };

  return (
    <div className="login">
      <img
        src="data:image/png;base64,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"
        alt="Gmail Logo"
      />
      <Button
        color="primary"
        variant="contained"
        className="login__button"
        startIcon={<AccountCircleIcon />}
        onClick={() => handleSignIn()}
      >
        Sign In
      </Button>
    </div>
  );
};

export default Login;
