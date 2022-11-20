import React from 'react';
import './index.css';
import Root from './routes/Root';
import SignUp from './routes/SignUp';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import NavBar from './components/NavBar';
import { createRoot } from 'react-dom/client';

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <BrowserRouter>
    <NavBar/>
    <Routes>
      <Route path="/" element={<Root />} />
      <Route path="/users/signup" element={<SignUp/>}/>
    </Routes>
  </BrowserRouter>,
  rootElement
);
