import SessionContext from "../lib/session";
import { useContext } from "react";
import { Link } from "react-router-dom";
const Home = () => {
  const session = useContext(SessionContext);

  if(!session || !session.session) {
    return (
      <div className="page protected">
        <p>This page is protected. Login to continue.</p>
        <Link to="/login">Login Page</Link>
      </div>
    )
  }
  return (
    <div className="page home">
      <h2>Msp Time Tracker</h2>
      
    </div>
  )
}

export default Home