import { useState } from 'react'
import './App.css'
import Header from './Header'
import Sidebar from './Sidebar'
import Home from './Home'
import { Route, Routes } from 'react-router-dom'
import ListProduct from './ListProduct'
import AddProduct from './AddProduct'
import View from './View'
import Edit from './Edit'

function App() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  return (
    <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar}/>
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/products' element={<ListProduct/>}/>
        <Route path='/add-product' element={<AddProduct/>}/>
        <Route path="/product/:id" element={<View />} />
        <Route path="/edit/:id" element={<Edit />} />

      </Routes>
      
    </div>
  )
}

export default App
