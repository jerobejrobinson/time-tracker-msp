import { useContext, useState, useEffect } from "react"
import SessionContext from "../lib/session"
import ProtectedPage from "../components/ProtectedPage";
// import ScanUserUUID from "../components/Timer/ScanUserUUID";
import ScanInput from "../components/Timer/ScanInput";
// Custom Hooks
const Create = () => {
  const { session } = useContext(SessionContext);
  const [userUUID, setUserUUID] = useState(null)
  const [ticketNumber, setTicketNumber] = useState(null)

  useEffect(() => {
    console.log('user uuid',userUUID)
    console.log('ticket number',ticketNumber)

  }, [userUUID, ticketNumber])
  // const [userUUID]
  if(!session) {
    return (
      <ProtectedPage />
    )
  }
  return (
    <div className="page create">
      {!userUUID && (<ScanInput table="users" setParent={setUserUUID} htmlForNameID="scanUserUUID" displayName="Scan User Id:"/>)}
      {userUUID && !ticketNumber && (<ScanInput table="tickets" setParent={setTicketNumber} htmlForNameID="scanTicketNumber" displayName="Scan Ticket Number:"/>)}
    </div>
  )
}

export default Create