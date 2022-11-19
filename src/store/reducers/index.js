import { combineReducers } from "redux";
import { userData } from "./userReducer/userDataReducers";
import { postData } from "./postReducer/postsDataReducer";

const RootReducer = combineReducers({
  userData: userData,
  postData: postData,
});

export default RootReducer;
