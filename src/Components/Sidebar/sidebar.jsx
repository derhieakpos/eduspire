import { Link } from 'react-router'
import './sidebar.css'
import Logo from '../../assets/logo.PNG'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

library.add(fas, far, fab)

export function Sidebar () {
  return (
    <>
     <aside>
      <img src={Logo} className='sideLogo'/>
      <nav>
          <Link to="/dashboard" className='navLink'>
          <FontAwesomeIcon icon="fa-solid fa-house" className='icons'/>
          <p>Home</p>
          </Link>
          <Link to="/courses" className='navLink'>
          <FontAwesomeIcon icon="fa-solid fa-graduation-cap" className='icons'/>
          <p>Courses</p>
          </Link>
          <Link to="/assignment" className='navLink'>
          <FontAwesomeIcon icon="fa-solid fa-list-check" className='icons'/>
          <p>Assignment</p>
          </Link>   
          <Link to="/result" className='navLink'>
          <FontAwesomeIcon icon="fa-solid fa-square-poll-vertical" className='icons'/>
          <p>Result</p>
          </Link>
      </nav>
     </aside>
    </>
  )
}