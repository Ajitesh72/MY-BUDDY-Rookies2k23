import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "../src/styles/App.css"
import { BrowserRouter } from "react-router-dom";
import {configureStore} from "@reduxjs/toolkit"
import {Provider} from "react-redux"
import rootReducer from "./reducers/rootReducer";

const store=configureStore({
  reducer:{
    mainReducer:rootReducer,
  },
})

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
   <Provider store={store}>
    <App />
   </Provider>
  </BrowserRouter>
);
