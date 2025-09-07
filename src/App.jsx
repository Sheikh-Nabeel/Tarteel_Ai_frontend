import { useState } from 'react'
import Login from './Components/Forms/Login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup from './Components/Forms/Signup'
import ForgetPassword from './Components/Forms/ForgetPassword'
import CreateNewPassword from './Components/Forms/CreateNewPassword'
import BottomNav from './Components/Navbar/BottomNav'
import Quran from './Components/Quran/Quran'
import SurahDetail from './Components/Quran/SurahDetail'


function App() {

  return (
    <>
    <BrowserRouter>
     <Login/>
     <Signup/>
     <ForgetPassword/>
     <CreateNewPassword/>
     <BottomNav/>
     <Routes>
        <Route path="/quran" element={<Quran />} />
        <Route path="/quran/:id" element={<SurahDetail />} />
     </Routes>
    
    
    </BrowserRouter>
    </>
  )
}

export default App
