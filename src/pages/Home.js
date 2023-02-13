import useFetchTasks from "../hooks/useFetchTasks";
import useHtmlLoader from "../hooks/useHtmlLoader";
import SessionContext from "../lib/session";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
const Home = () => {
  const session = useContext(SessionContext);

  if(!session.data) {
    return (
      <Navigate to="/login" />
    )
  }
  return (
    <div className="page home">
      <h2>Current Tasks</h2>
      
    </div>
  )
}

export default Home