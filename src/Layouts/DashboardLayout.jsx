import { Sidebar } from "../Components/Sidebar/sidebar";
import { Outlet } from "react-router";
import './DashboardLayout.css'

export function DashboardLayout () {
  return (
    <div className="layout">
    <Sidebar/>
    <main>
      <Outlet/>
    </main>
    </div>
   
  )
}