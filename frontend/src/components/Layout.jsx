import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

const Layout = () => {
  return (
    <div className="relative min-h-screen">
      <Navbar />
      <div className="relative z-10 pt-16 min-h-[calc(100vh-64px)]">
        <Outlet />
      </div>
    </div>
  )
}

export default Layout