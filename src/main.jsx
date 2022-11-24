import React from 'react';
import './index.css';
import Root from './routes/Root';
import SignUp from './routes/SignUp';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import NavBar from './components/NavBar';
import { createRoot } from 'react-dom/client';
import SignIn from './routes/SignIn';
import Profile from './routes/Profile';
import Create from './routes/Create';
import Blog from './routes/Blog';
import Edit from './routes/Edit';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <CookiesProvider>
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Root />} />
        <Route path="/users/signup" element={<SignUp />} />
        <Route path="/users/signin" element={<SignIn />} />
        <Route path="/users/profile" element={<Profile />} />
        <Route path="/blogs/new" element={<Create />} />
        <Route path="/blogs/:id" element={<Blog />} />
        <Route path="/blogs/edit/:id" element={<Edit />} />
      </Routes>
    </BrowserRouter>
  </CookiesProvider>
);
