import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import './index.css'
import React, { Component } from 'react';

import '@coreui/coreui/dist/css/coreui.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'

const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  rootElement
);
