import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import DeptPage from './components/deptPage';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import ImageCarousel from './components/carousel';
import InputNews from './components/InputNews';
import InputAnnouncements from './components/InputAnnouncements';
import ImageUpload from './components/ImageUpload';
import Testing from './components/Test';
const router = createBrowserRouter([
  {
    path:"/",
    element:<DeptPage />
  },
  {
    path:"/editnews",
    element:<InputNews />
  },
  {
    path:"/editannouncements",
    element:<InputAnnouncements />
  },
  {
    path:"/imageupload",
    element:<ImageUpload />
  },
  {
    path:"/test",
    element:<Testing />
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
