import { useState } from 'react'

import './App.css'
import Navbar from './Components/Navbar/Navbar'
import Sidebar from './Components/Sidebar/Sidebar'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Add from './Pages/Add/Add'
import List from './Pages/List/List'
import Orders from './Pages/Orders/Orders'
function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
    <Navbar/>
    <hr />
     <div className='app-content'>
      <Sidebar/>
     
    <Routes>
     <Route path='/add' element={<Add/>} />
     <Route path='/list' element={<List/>} />
     <Route path='/orders' element={<Orders/>} />
     </Routes>
     </div>
    </BrowserRouter>
  )
}

export default App
