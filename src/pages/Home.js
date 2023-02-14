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
  return (
    <div className="page home">
      <h2>Msp Time Tracker</h2>
      
    </div>
  )
}

export default Home