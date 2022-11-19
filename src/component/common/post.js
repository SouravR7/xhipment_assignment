import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import LinesEllipsis from "react-lines-ellipsis";

import * as Colors from "../../styled-component/colors";
import { Xbutton } from "../common/xbutton/xbutton";
import PostDialog from "./postDialog";
import { api_url } from "../../utils/config";
import { ACTIONS } from "../../store/actions";

const useStyles = makeStyles({
  postCard: {
    width: "100%",
    borderRadius: "8px",
    padding: "25px",
    boxSizing: "border-box",
    border: "1px solid  #979797",
    marginBottom: "20px",
    minHeight: "380px",
  },
  postCardContainer: {
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    justifyContent: "space-between",
    paddingLeft: "0px",
    paddingRight: "30px",

    "@media (max-width: 991px)": {
      padding: "0px 25px",
    },
  },
  postText: {
    "@media (max-width: 600px)": {
      fontSize: "26px",
    },
  },
  postTitle: {
    fontSize: "2.4rem",
    color: `${Colors.textColor}`,
    margin: "10px 0px",
    padding: "0",
    height: "110px",
  },
  postDetails: {
    color: `${Colors.textPrimary}`,
    fontSize: "1.4rem",
    margin: "15px 0px",
    height: "170px",
  },
  buttonContainer: {
    minHeight: "50px",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: "45px",
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
    "@media (max-width: 991px)": {
      width: "100%",
    },
  },
  dialogTextField: {
    width: "100%",
  },
});

export default function Post(props) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [deleteOpen, setDeleteOpen] = useState({
    open: false,
    id: null,
  });

  const [createDialog, setCreateDialog] = useState({
    type: "",
    open: false,
  });

  const addEditClickOpen = (post) => {
    setCreateDialog({
      type: "update",
      open: true,
      post: post,
    });
  };

  const onClose = () => {
    setCreateDialog({
      type: "",
      open: false,
    });
  };

  const addDeleteClickOpen = (post) => {
    setDeleteOpen({
      open: true,
      id: post.id,
    });
  };

  const handleDeleteClose = () => {
    setDeleteOpen({
      open: false,
      id: null,
    });
  };

  const deletePostData = (id) => {
    fetch(`${api_url}/posts/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((res) => {
        setDeleteOpen({
          open: false,
          id: null,
        });
        dispatch({
          type: ACTIONS.DELETE_POST_RESPONSE,
          payload: {
            id: id,
          },
        });
        toast.success("Deleted Successfully!", { toastId: "delete_success" });
      });
  };

  const handleDelete = (id) => {
    deletePostData(id);
  };

  return (
    <Grid
      item
      xs={12}
      md={8}
      lg={6}
      xl={4}
      className={classes.postCardContainer}
    >
      <div className={classes.postCard}>
        <div className={classes.postTitle}>
          <LinesEllipsis
            text={props.post.title}
            maxLine="2"
            ellipsis="..."
            trimRight
            className={classes.postText}
          />
        </div>
        <div className={classes.postDetails}>
          <LinesEllipsis
            text={props.post.body}
            maxLine="4"
            ellipsis="..."
            trimRight
          />
        </div>
        <div className={classes.buttonContainer}>
          <Xbutton
            style={{
              width: "95px",
              height: "48px",
              fontSize: "16px",
              color: `${Colors.Secondary}`,
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
            color={Colors.white}
            onClick={() => addEditClickOpen(props.post)}
          >
            <EditIcon />
            Edit
          </Xbutton>
          <Xbutton
            style={{
              width: "95px",
              height: "48px",
              fontSize: "16px",
              color: `${Colors.Secondary}`,
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
            color={Colors.white}
            onClick={() => addDeleteClickOpen(props.post)}
          >
            <DeleteIcon />
            Delete
          </Xbutton>
        </div>
      </div>
      {createDialog.open && (
        <PostDialog
          type={createDialog.type}
          open={createDialog.open}
          post={createDialog.post}
          onClose={onClose}
        />
      )}
      <Dialog
        open={deleteOpen.open}
        maxWidth="sm"
        onClose={handleDeleteClose}
        classes={{
          paper: classes.dialog,
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" className={classes.dialogTitle}>
          Delete confirmation
          <CloseIcon
            onClick={handleDeleteClose}
            style={{ cursor: "pointer" }}
          />
        </DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete the post?
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
            onClick={() => handleDelete(deleteOpen.id)}
          >
            Yes
          </Xbutton>
          {/*{strings.SaveChanges}*/}
        </DialogActions>
      </Dialog>
    </Grid>
  );
}
