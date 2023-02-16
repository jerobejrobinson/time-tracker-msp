import SessionContext from "../lib/session";
import { useContext } from "react";
import ProtectedPage from "../components/ProtectedPage";

const Home = () => {
  const { session } = useContext(SessionContext);

  if(!session) {
    return (
      <ProtectedPage />
    )
  }
  if(session && session.user.user_metadata.authLevel !== process.env.REACT_APP_MSP_LEVEL_ONE) {
    return (
        <ProtectedPage loggedIn={true} />
    )
  }
  return (
    <div className="page home">
      <h2>Msp Time Tracker</h2>
      
    </div>
  )
}

export default Home