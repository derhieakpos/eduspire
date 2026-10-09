import './landing.css'
import { Link } from 'react-router'
import Logo from '../../assets/logo.PNG'

export function Landing () {
  return (
    <>
    <div className='landingContainer'>
     <div>
      <img src={Logo} className='logoPic' />
     </div>
     <div className='entryBtn'>
      <Link to='/signup'>
       <button>Sign Up</button>
      </Link>
      <Link to='/login'>
       <button>Login</button>
      </Link>
     </div>
    </div>
    </>
  )
}