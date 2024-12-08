import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import SignIn from './pages/backoffice/SignIn';
import Home  from './pages/backoffice/Home';
import Register from './pages/backoffice/Register';
import UserManage from './pages/backoffice/UserManage';
import Content from './pages/backoffice/Content';
import ReviewsManage from './pages/backoffice/ReviewsManage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <SignIn />
  },
  {
    path: '/home',
    element: <Home />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/usermanage',
    element: <UserManage />
  },
  {
    path: '/content',
    element: <Content />
  },
  {
    path: '/reviewsmanage',
    element: <ReviewsManage  />
  },
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);