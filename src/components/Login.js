import React from "react";
import { auth, provider } from "./../firebase";
import { useDispatch } from "react-redux";
import { login } from "./../features/userSlice";
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
    <div>
      Login
      <button onClick={() => handleSignIn()}>sign in</button>
    </div>
  );
};

export default Login;
