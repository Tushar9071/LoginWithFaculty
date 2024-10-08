import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route ,Routes } from 'react-router-dom';
import SignUp from './components/signup/SignUp';
import Login from './components/login/Login';
import FacultyTable from './components/faculty/FacultyList';
import Map from './components/faculty/Map';
import Viewmore from './components/faculty/viewmore';
import AddFaculty from './components/faculty/AddFaculty';
import UpdateFaculty from './components/faculty/UpdateFaculty';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<FacultyTable/>}/>   
        <Route  path='/login' element={<Login/>}/>  
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/map' element={<Map/>} />
        <Route path ='/viewmore/:id' element={<Viewmore/>}/>
        <Route path ='/addfaculty' element={<AddFaculty/>}/>
        <Route path ='/updatefaculty/:id' element={<UpdateFaculty/>}/>
      </Routes>
    </BrowserRouter>
  </>
);


