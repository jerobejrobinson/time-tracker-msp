import { useContext } from 'react'
import SessionContext from '../../lib/session'

// Componets
import { Link } from 'react-router-dom'
import SignOut from '../UserUtils/SignOut'
export default function Navigation() {
    const {session} = useContext(SessionContext)
    
    return (
        <nav>
          <h1>MSP Time Tracker</h1>
          <Link to="/">Home</Link>
          {session && (<Link to="/create">Create Task</Link>)}
          {session && (<SignOut />)}
        </nav>
    )
}