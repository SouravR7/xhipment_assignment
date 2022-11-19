import React from "react";
//import PropTypes from "prop-types";
import * as Colors from "../../../styled-component/colors";
import { withStyles } from "@mui/styles";
import Button from "@mui/material/Button";

import "./button.css";

const styles = (theme) => ({
  button: {
    //margin: theme.spacing(1),
    width: "fit-content",
  },
  hoverButton: {
    // margin: theme.spacing(1),
    width: "fit-content",
  },
});

class SingleButton extends React.Component {
  state = {
    hovered: false,
  };
  hoverOn = (event) => {
    this.setState({ hovered: true });
  };
  hoverOff = (event) => {
    this.setState({ hovered: false });
  };

  render() {
    const {
      classes,
      className,
      onClick,
      style,
      disabled = false,
      startIcon = null,
      endIcon = null,
      size = "medium",
      outline,
      id,
      color,
    } = this.props;
    return (
      <Button
        style={{
          textTransform: "inherit",
          backgroundColor: `${color}`,
          border: `1px solid ${Colors.Secondary}`,
          color: `${Colors.Secondary}`,
          ...style,
        }} //default to not auto-caps
        variant={outline ? "None" : "outlined"}
        color="secondary"
        type="submit"
        disabled={disabled}
        onMouseEnter={this.hoverOn}
        onMouseLeave={this.hoverOff}
        className={[
          this.state.hovered ? classes.hoverButton : classes.button,
          className,
        ].join(" ")}
        onClick={onClick}
        startIcon={startIcon}
        endIcon={endIcon}
        size={"small"}
        id={id}
      >
        {this.props.children}
      </Button>
    );
  }
}

// SingleButton.propTypes = {
//   classes: PropTypes.object.isRequired
// };
const Xbutton = withStyles(styles, { withTheme: true })(SingleButton);

export { Xbutton };
