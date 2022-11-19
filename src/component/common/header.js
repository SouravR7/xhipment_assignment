import React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@mui/styles";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormControlLabel from "@mui/material/FormControlLabel";
import CloseIcon from "@mui/icons-material/Close";

import * as Colors from "../../styled-component/colors";
import { ACTIONS } from "../../store/actions";
import { Xbutton } from "./xbutton/xbutton";

const useStyles = makeStyles({
  LoginHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: "80px",
    backgroundColor: "white",
    position: "sticky",
    top: 0,
    zIndex: 99,
    flexDirection: "row",
    paddingLeft: "120px",
    paddingRight: "120px",
    width: "100%",
    boxSizing: "border-box",
    boxShadow: "0 0 25px 0 rgb(0 0 0 / 6%)",
    "@media (min-width:1660px)": {
      height: "140px",
    },
    "@media (max-width: 991px)": {
      paddingLeft: "15px",
      paddingRight: "15px",
    },
  },
  loginLogo: {
    height: "54px",
  },
  buttonsHolder: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dialog: {
    border: `1px solid  ${Colors.midGray} !important`,
    borderRadius: "8px !important",
    marginBottom: "100px !important",
    marginTop: "20px !important",
  },

  dialogTitle: {
    borderBottom: `1px solid  ${Colors.midGray} !important`,
    fontSize: "1rem !important",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  dialogContent: {
    padding: "0px 25px !important",
    paddingTop: "20px !important",
  },
  dialogActions: {
    padding: "20px !important",
  },
  dialogGridItem: {
    width: "80%",
    margin: "auto",
    marginTop: "20px",
    "@media (max-width: 991px)": {
      width: "100%",
    },
  },
  dialogTextField: {
    width: "100%",
  },
});

const headerLogo = "https://www.xhipment.com/assets/img/xhipment-logo.png";

function Header() {
  const classes = useStyles();
  const history = useNavigate();
  const dispatch = useDispatch();
  const [logoutOpen, setLogoutOpen] = useState(false);

  const user_data = useSelector((state) => state.userData.data);
  const { email, name, given_name } = user_data;
  const handleLogout = () => {
    setLogoutOpen(true);
  };

  const handleDeleteClose = () => {
    setLogoutOpen(false);
  };

  const handleLogoutDone = () => {
    localStorage.removeItem("user_token");
    dispatch({
      type: ACTIONS.UPDATE_USER_DATA,
      payload: {
        email: "",
        name: "",
      },
    });
    history("/");
  };

  return (
    <div className={classes.LoginHeader}>
      <>
        <img
          height={54}
          src={headerLogo}
          alt="icon"
          className={classes.loginLogo}
        />
        {!email ? (
          <div className={classes.buttonsHolder}>
            <div>Signin</div>

            <Xbutton style={{ marginLeft: "2em" }} color={Colors.white}>
              Sign Up
            </Xbutton>
          </div>
        ) : (
          <div className={classes.buttonsHolder}>
            <div>Welcome, {given_name}</div>
            <Xbutton
              style={{ marginLeft: "2em" }}
              color={Colors.white}
              onClick={handleLogout}
            >
              Log out
            </Xbutton>
          </div>
        )}
      </>
      <Dialog
        open={logoutOpen}
        maxWidth="xs"
        onClose={handleDeleteClose}
        classes={{
          paper: classes.dialog,
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" className={classes.dialogTitle}>
          Logout confirmation
          <CloseIcon
            onClick={handleDeleteClose}
            style={{ cursor: "pointer" }}
          />
        </DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to Logout?
          </DialogContentText>
        </DialogContent>
        <DialogActions className={classes.dialogActions}>
          <div
            style={{
              fontSize: "15px",
              color: "black",
              cursor: "pointer",
              fontWeight: "500",
            }}
            onClick={handleDeleteClose}
          >
            No
          </div>
          <Xbutton
            style={{
              width: "70px",
              height: "28px",
              fontSize: "15px",
              color: "black",
              marginLeft: "10px",
            }}
            color={Colors.Secondary}
            onClick={() => handleLogoutDone()}
          >
            Yes
          </Xbutton>
          {/*{strings.SaveChanges}*/}
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Header;
