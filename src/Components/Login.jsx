import { Button } from "@mui/material";
import React from "react";
import { auth, provider } from "../Firebase";
import { signInWithPopup } from "firebase/auth";
import { useStateValue } from "../StateProvider";
import { actionTypes } from "../reducer";

const Login = () => {
  const [{}, dispatch] = useStateValue();

  const signin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    <div className="w-[70vw] h-[70vh] bg-white rounded-xl shadow-xl flex flex-col items-center justify-center gap-2">
      <img
        className="w-56"
        src="https://static.vecteezy.com/system/resources/previews/022/794/113/large_2x/3d-render-whatsapp-logo-icon-isolated-on-transparent-background-free-png.png"
        alt=""
      />
      <h1 className="text-2xl font-semibold text-zinc-700">
        Sign in to WhatsApp
      </h1>
      <Button onClick={signin}>Sign In With Google</Button>
    </div>
  );
};

export default Login;
