import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import { makeStyles } from "@mui/styles";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";
import ErrorIcon from "@mui/icons-material/Error";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import * as Colors from "../../styled-component/colors";
import { Xbutton } from "../common/xbutton/xbutton";
import { api_url } from "../../utils/config";
import { ACTIONS } from "../../store/actions";

const useStyles = makeStyles({
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
    minHeight: "400px",
  },
  dialogActions: {
    padding: "20px !important",
    display: "flex !important",
    justifyContent: "space-between !important",
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

export default function PostDialog(props) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { type, open, onClose } = props;

  const [title, setTitle] = useState(props.post ? props.post.title : "");
  const [description, setDescription] = useState(
    props.post ? props.post.body : ""
  );

  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const createNewPost = () => {
    let objBody = {
      title: title,
      body: description,
      userId: 1,
    };
    fetch(`${api_url}/posts`, {
      method: "POST",
      body: JSON.stringify(objBody),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((res) => {
        console.log(res);
        onClose();
        dispatch({
          type: ACTIONS.CREATE_POST_RESPONSE,
          payload: res,
        });

        toast.success("Created Successfully!", { toastId: "create_success" });
      });
  };

  const updatePost = () => {
    let objBody = {
      id: `${props.post.id}`,
      title: title,
      body: description,
      userId: 1,
    };
    fetch(`${api_url}/posts/${props.post.id}`, {
      method: "PUT",
      body: JSON.stringify(objBody),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          toast.error("Can't update the post", { toastId: "update_error" });
          return;
        }
      })
      .then((res) => {
        console.log(res);
        onClose();
        dispatch({
          type: ACTIONS.UPDATE_POST_RESPONSE,
          payload: res,
        });

        toast.success("Updated Successfully!", { toastId: "update_success" });
      });
  };

  const handlePosts = () => {
    if (title !== "" && description !== "") {
      if (type === "add") {
        createNewPost();
      } else {
        updatePost();
      }
    } else if (title === "") {
      setError(true);
      setErrorMsg("Please enter title");
    } else {
      setError(true);
      setErrorMsg("Please enter description");
    }
  };

  return (
    <Dialog
      maxWidth="sm"
      fullWidth={true}
      open={open}
      //onClose={handleClose}
      classes={{
        paper: classes.dialog,
      }}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle className={classes.dialogTitle}>
        {type === "add" ? "Create new post" : "Update post"}
        {/*{strings.EditStaff*/}
        <CloseIcon onClick={onClose} style={{ cursor: "pointer" }} />
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <DialogContentText
          id="alert-dialog-description"
          style={{
            textAlign: "center",
            padding: "10px 0px",
            textWeight: "700",
            color: "black",
          }}
        >
          {type === "add" ? " Create a new post" : "Edit the post details"}
        </DialogContentText>
        <div className={classes.dialogGridItem}>
          <div>Title* : </div>
          <TextField
            id="filled-basic"
            value={title}
            variant="filled"
            style={{ width: "100%", marginTop: "10px" }}
            onChange={(e) => {
              setTitle(e.target.value);
              if (e.target.value !== "") {
                setError(false);
                setErrorMsg("");
              }
            }}
          />
        </div>
        <div className={classes.dialogGridItem}>
          <span>Description* : </span>
          <TextField
            id="filled-basic"
            value={description}
            variant="filled"
            multiline
            rows={4}
            style={{ width: "100%", marginTop: "10px" }}
            onChange={(e) => {
              setDescription(e.target.value);
              if (e.target.value !== "") {
                setError(false);
                setErrorMsg("");
              }
            }}
          />
        </div>

        <div className={classes.dialogGridItem}></div>
      </DialogContent>
      <DialogActions className={classes.dialogActions}>
        <div>
          {error && (
            <span
              style={{
                fontSize: "14px",
                color: "red",
                fontWeight: "500",
                display: "flex",
                alignItems: "center",
                marginLeft: "2em",
              }}
            >
              <ErrorIcon />
              {errorMsg}
            </span>
          )}
        </div>
        <div>
          <Xbutton onClick={onClose}> Cancel</Xbutton>
          <Xbutton onClick={handlePosts} style={{ marginLeft: "2em" }}>
            {" "}
            {type === "add" ? "Create" : "Update"}{" "}
          </Xbutton>
        </div>
      </DialogActions>
    </Dialog>
  );
}
