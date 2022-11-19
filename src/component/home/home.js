import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { makeStyles } from "@mui/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

import * as Colors from "../../styled-component/colors";
import { Xbutton } from "../common/xbutton/xbutton";
import Header from "../common/header";
import Post from "../common/post";
import { api_url } from "../../utils/config";
import { ACTIONS } from "../../store/actions";
import PostDialog from "../common/postDialog";

const useStyles = makeStyles({
  mainMidContainer: {
    padding: "50px 75px 0 75px",

    "@media (max-width: 991px)": {
      padding: "80px 15px 0",
    },
  },
  gridContainer: {
    padding: "0px 45px",
    "@media (max-width: 991px)": {
      padding: "0px 30px",
    },
  },

  homepageHolder: {
    paddingBottom: "80px",
    background: "#fafafa",
    minHeight: "600px",
  },
  listHeader: {
    padding: "10px 10px",
    textAlign: "center",
    fontSize: "26px",
    fontWeight: "700",
  },
  tableHead: {
    background: "#f1f1f1",
  },
  addButton: {
    display: "flex",
    justifyContent: "flex-end",
    padding: "25px 80px",
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

function Home(props) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [createDialog, setCreateDialog] = useState({
    type: "",
    open: false,
  });

  const posts = useSelector((state) => state.postData.posts);

  const getAllPosts = () => {
    fetch(`${api_url}/posts`, { method: "GET" })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((res) => {
        dispatch({
          type: ACTIONS.GET_ALL_POSTS,
          payload: res,
        });
      });
  };

  useEffect(() => {
    if (posts.length === 0) {
      getAllPosts();
    }
  }, []);

  const addCreateClickOpen = () => {
    setCreateDialog({
      type: "add",
      open: true,
    });
  };

  const onClose = () => {
    setCreateDialog({
      type: "",
      open: false,
    });
  };

  return (
    <div>
      <Header />
      <div className={classes.mainMidContainer}>
        <div className={classes.homepageHolder}>
          <div className={classes.listHeader}>Posts</div>
          <div className={classes.addButton}>
            <Xbutton
              style={{
                width: "150px",
                height: "48px",
                fontSize: "16px",
                color: "black",
              }}
              color={Colors.Secondary}
              onClick={() => addCreateClickOpen(1)}
            >
              Create new post
            </Xbutton>
          </div>
          <Grid container spacing={2} className={classes.gridContainer}>
            {posts.length > 0
              ? posts.map((item, index) => {
                  return <Post key={index} post={item} />;
                })
              : "NO data found"}
          </Grid>
        </div>

        {createDialog.open && (
          <PostDialog
            type={createDialog.type}
            open={createDialog.open}
            onClose={onClose}
          />
        )}
      </div>
    </div>
  );
}

export default Home;
