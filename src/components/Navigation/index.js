import { useContext } from 'react'
import SessionContext from '../../lib/session'
import './styles.css'
// Componets
import { Link } from 'react-router-dom'
import SignOut from '../UserUtils/SignOut'
export default function Navigation() {
    const {session} = useContext(SessionContext)
    console.log(process.env.REACT_APP_MSP_LEVEL)
    return (
        <nav>
          <h1>MSP Time Tracker</h1>
          <div>
            {/* <Link to="/">Home</Link> */}
            {session && session.user.user_metadata.authLevel === process.env.REACT_APP_MSP_LEVEL_TWO && (<Link to="/start-task">start-task</Link>)}
            {session && session.user.user_metadata.authLevel === process.env.REACT_APP_MSP_LEVEL_ONE && (<Link to="/dashboard">Dashboard</Link>)}
            {session && (<SignOut />)}
          </div>
        </nav>
    )
}