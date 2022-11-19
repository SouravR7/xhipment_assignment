import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from "react-redux";
import { store } from "./store";

const root = ReactDOM.createRoot(document.getElementById("root"));
const clientId =
  "1065100131861-i9l7oligebpm9dm4po1jtt5q4185mc9b.apps.googleusercontent.com";
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer
        autoClose={2000}
        pauseOnHover
        newestOnTop
        transition={Slide}
      />
      <GoogleOAuthProvider clientId={clientId}>
        <App />
      </GoogleOAuthProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
