import React from 'react'
// import {BrowserRouter as Routes,Route} from "react-router-dom"
// import { HomePage } from '../Pages/HomePage'
// import AuthPage from '../Pages/AuthPage'

// const AppRoutes = () => {
//   return (
//       <Routes>
//           <Route path="/" element={<HomePage/>}></Route>
//           <Route path="/auth" element={<AuthPage/>}></Route>
//       </Routes>
//     )
// }

// export default AppRoutes
import { Routes, Route } from "react-router-dom";
import { HomePage } from "../Pages/HomePage";
import AuthPage from "../Pages/AuthPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/auth" element={<AuthPage />} />
    </Routes>
  );
};

export default AppRoutes;