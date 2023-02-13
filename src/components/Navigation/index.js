import { useContext, useEffect } from 'react'
import SessionContext from '../../lib/session'

// Componets
import { Link } from 'react-router-dom'
import SignOut from '../UserUtils/SignOut'
export default function Navigation() {
    const {session, setSession} = useContext(SessionContext)
    // const session = useContext(SessionContext)
    // console.log(session)
    useEffect(() => {
        console.log('session navigation:')
        console.log(session)
    })
    return (
        <nav>
          <h1>MSP Time Tracker</h1>
          <Link to="/">Home</Link>
          <Link to="/create">Create Task</Link>
          {!session && (<Link to="/login">Login</Link>)}
          {session && session.data.session && (<SignOut />)}
        </nav>
    )
}