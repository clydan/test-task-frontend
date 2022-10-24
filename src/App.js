import React from 'react';
import Home from './views/Home.js';
import Admin from './views/Admin.js';
import { Route, Routes } from 'react-router-dom'

function App() {
  return (<Routes>
        <Route path='/' element={<Home />} />
        <Route path='/admin' element={<Admin />} />
  </Routes>
  )
}

export default App;
