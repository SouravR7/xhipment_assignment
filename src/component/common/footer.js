import React from "react";

import * as Colors from "../../styled-component/colors";
//import { Body } from "../../Styles-Elements/Labels";
import { Xbutton } from "./xbutton/xbutton";

import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  footerImgBlock: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0 0 0px 0",
    height: "100px",
    "@media(min-width: 1660px)": {
      height: "200px",
    },
  },
  loginLogo: {
    height: "80px",

    "@media(min-width: 1660px)": {
      height: "83px",
    },
  },
  loginFooterHolder: {
    height: "50px",
    backgroundColor: `${Colors.Primary}`,
    display: "flex",
    alignTtems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingLeft: "15px",
    paddingRight: "15px",
    width: "100%",
    boxSizing: "border-box",
    borderBottom: `5px solid ${Colors.nightGray}`,
    "@media(min-width: 1660px)": {
      height: "60px",
      borderBottom: `8px solid ${Colors.nightGray}`,
    },
    "@media (max-width:767px)": {
      paddingLeft: "5px",
      paddingRight: "5px",
    },
    "@media (max-width:380px)": {
      paddingLeft: "0px",
      paddingRight: "0px",
    },
  },
  footerFont: {
    padding: "16px 24px 16px 24px",
    fontSize: "12px",
    color: `${Colors.Secondary}`,
  },
});

const footerLogo = "https://www.xhipment.com/assets/img/xhipment-logo.png";

function Footer() {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.footerImgBlock}>
        <img
          height={60}
          src={footerLogo}
          alt="name"
          className={classes.loginLogo}
        />
      </div>
      <div className={classes.loginFooterHolder}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <span className={classes.footerFont}>© 2022 MMI</span>
          <span className={classes.footerFont}>Terms & Conditions</span>
          <span className={classes.footerFont}>Privacy policy</span>
        </div>
      </div>
    </div>
  );
}

export default Footer;
