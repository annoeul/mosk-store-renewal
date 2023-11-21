import React from "react"
import { Route, Routes } from "react-router-dom"
import LoginPage from "../pages/LoginPage"
import SignupPage from "../pages/SignupPage"
import DashHomePage from "../pages/DashHomePage"

function Router() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/dashHome" element={<DashHomePage />} />
    </Routes>
  )
}

export default Router
