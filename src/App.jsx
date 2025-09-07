import React from 'react'
import { useState } from 'react'
import Login from './Components/Forms/Login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import Signup from './Components/Forms/Signup'
import ForgetPassword from './Components/Forms/ForgetPassword'
import CreateNewPassword from './Components/Forms/CreateNewPassword'
import BottomNav from './Components/Navbar/BottomNav'
import TopNav from './Components/Navbar/TopNav'
import Home from './Components/Home/Home'
import Quran from './Components/Quran/Quran'
import ParaList from './Components/Quran/ParaList'
import SurahByPara from './Components/Quran/SurahByPara'
import AyahSelection from './Components/Quran/AyahSelection'
import SurahDetail from './Components/Quran/SurahDetail'
import Hadith from './Components/Hadith/Hadith'
import Ibadat from './Components/Ibadat/Ibadat'
import Qibla from './Components/Qibla/Qibla'
import Notifications from './Components/Notifications/Notifications'
import Profile from './Components/Profile/Profile'
import Settings from './Components/Settings/Settings'

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          {/* Authentication Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgetPassword />} />
          <Route path="/create-new-password" element={<CreateNewPassword />} />
          
          {/* Main App Routes with Navigation */}
          <Route path="/*" element={
            <>
              <TopNav />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/quran" element={<ParaList />} />
                <Route path="/quran/para/:paraNumber" element={<SurahByPara />} />
                <Route path="/quran/para/:paraNumber/surah/:surahNumber" element={<AyahSelection />} />
                <Route path="/quran/:id" element={<SurahDetail />} />
                <Route path="/hadith" element={<Hadith />} />
                <Route path="/ibadat" element={<Ibadat />} />
                <Route path="/qibla" element={<Qibla />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
              <BottomNav />
            </>
          } />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
