import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import axios from 'axios';
import {BrowserRouter,Routes,Route,Link} from 'react-router-dom';

import First from './components/Input';
import Second from './components/Input2';
import Third from './components/Input3'
import Last from './components/Output';


function App() {
  return(
  
    <Routes>
      <Route path='/' element={<First />}>

      </Route>
      <Route path='/second' element={<Second />}>

      </Route>
      <Route path='/third' element={<Third />}>

      </Route>
      <Route path='/output' element={<Last />}>

      </Route>
      

    </Routes>
    
  );

  
  };
  export default App;
