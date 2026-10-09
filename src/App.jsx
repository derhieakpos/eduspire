import { Routes, Route } from 'react-router'
import { Landing } from './Pages/Landing/landing'
import { Signup } from './Pages/Signup/signup'
import { Login } from "./Pages/Login/login"
import { Dashboard } from "./Pages/Dashboard/dashboard"
import { Courses } from "./Pages/Courses/courses"
import { Assignment } from "./Pages/Assignment/assignment"
import { Result } from "./Pages/Result/result"
import { DashboardLayout } from './Layouts/DashboardLayout'
import './App.css'

function App () {
  return (
    <>
    <Routes>
      <Route path='/' element={<Landing/>}/>
      <Route path='signup' element={<Signup/>}/>
      <Route path="login" element={<Login />}/>
      <Route element={<DashboardLayout/>}>
        <Route path="dashboard" element={<Dashboard/>}/>
        <Route path="courses" element={<Courses/>}/>
        <Route path="assignment" element={<Assignment/>}/>
        <Route path="result" element={<Result/>}/> 
      </Route>
      
    </Routes>
    
    </>
  )
}

export default App