import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { makeStyles } from "@mui/styles";
import { useGoogleLogin } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";

import * as Colors from "../../styled-component/colors";
import Header from "../common/header";
import Footer from "../common/footer";
import { ACTIONS } from "../../store/actions";

import { Xbutton } from "../common/xbutton/xbutton";

const useStyles = makeStyles({
  grayBox: {
    backgroundColor: `${Colors.grayf9}`,
    padding: "24px 0px 32px 0px",
    minHeight: "calc(100vh - 286px)",
    "@media (max-width: 767px)": {
      padding: "24px 15px 30px 15px",
    },
  },
  gridContainer: {
    display: "flex",

    justifyContent: "center",
    flexDirection: "column",
    backgroundColor: `${Colors.white}`,
    border: `1px solid ${Colors.gray97}`,
    boxShadow: "none",
    padding: "32px 32px",
    margin: "30px auto 0px auto",
    borderRadius: "4px",
    alignItems: "center",
    maxWidth: "calc(565px - 66px)",
    "@media (max-width: 767px)": {
      padding: "32px 20px",
    },
  },
  gridItem: {
    width: "100%",
    marginBottom: "24px",
    position: "relative",
  },
  heading: {
    fontFamily: "Roboto",
    color: "#272727",
    fontSize: "32px",
    fontWeight: "700",
    textAlign: "center",
    padding: "initial",
    margin: "initial",
    "@media (max-width: 991px)": {
      fontSize: "28px",
    },
  },
  headinglight: {
    fontFamily: "Roboto",
    color: `${Colors.Secondary}`,
    fontSize: "36px",
    fontWeight: "700",
    textAlign: "center",
    padding: "initial",
    margin: "initial",
    "@media (max-width: 991px)": {
      fontSize: "28px",
    },
  },
});

function Login() {
  const classes = useStyles();
  const history = useNavigate();
  const dispatch = useDispatch();

  // useEffect(() => {
  //   const keyDownHandler = (event) => {
  //     console.log("User pressed: ", event.key);

  //     if (event.key === "Enter") {
  //       event.preventDefault();

  //       // 👇️ call submit function here

  //       routeChange(event);
  //     }
  //   };

  //   document.addEventListener("keydown", keyDownHandler);

  //   return () => {
  //     document.removeEventListener("keydown", keyDownHandler);
  //   };
  // }, []);

  const handleSucess = (credentialResponse) => {
    console.log(credentialResponse.credential);
    localStorage.setItem("user_token", credentialResponse.credential);
    var decoded = jwt_decode(credentialResponse.credential);
    console.log(decoded);
    dispatch({
      type: ACTIONS.UPDATE_USER_DATA,
      payload: decoded,
    });
    history("/home");
    // if (credentialResponse.credential) {
    //   props.history.push("/dashboard");
    // }
  };

  const handleSignIn = (e) => {
    e.preventDefault();
  };

  return (
    <div className="page-background">
      <Header />
      <div className={classes.grayBox}>
        <div className="grid-header">
          <div className={classes.heading}>
            Sign in to <span className={classes.headinglight}>Xhipment</span>
          </div>
        </div>
        <div></div>
        <div className={classes.gridContainer}>
          <GoogleLogin onSuccess={handleSucess} />
          {/* <Xbutton
            style={{
              width: "170px",
              height: "48px",
              fontSize: "15px",
              margin: "12px 0px 32px",
            }}
            color={Colors.white}
            onClick={handleSignIn}
          >
            Sign in
          </Xbutton> */}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Login;
