// Configs and libs
import { useContext, useState, useEffect } from "react"
import SessionContext from "../lib/session"
import supabase from "../config/supabaseClient";

// Components
import ProtectedPage from "../components/ProtectedPage";
import ScanInput from "../components/Timer/ScanInput";
import SelectTask from "../components/Timer/SelectTask";
import Clock from "../components/Timer/Clock"; 
import Pause from "../components/Timer/Pause";
import End from "../components/Timer/End";


const StartTask = () => {
  const { session } = useContext(SessionContext);
  
  const [userUUID, setUserUUID] = useState(null)
  const [ticketNumber, setTicketNumber] = useState(null)
  const [taskType, setTaskType] = useState(null)
  const [task, setTask] = useState(null)

  
  useEffect(() => {
    console.log(userUUID)
    if(userUUID) {
      document.title = userUUID.name
    }
    if(userUUID && ticketNumber && taskType && !task) {
      const startTask = async (user_id, ticket_id, task_type_id) => {
        const { data, errors } = await supabase.from('tasks').insert({
          user_id,
          task_type_id,
          ticket_id,
          started: ((new Date()).toISOString()).toLocaleString('en-US'),
          is_complete: false
        }).select().single()
    
        if(errors) {
          console.log('Errors creating task', errors)
          return;
        }
        if(data) {
          setTask(data)
          return;
        }
    
      }
      startTask(userUUID.id, ticketNumber.id, taskType.id)
      return;
    }
  }, [userUUID, ticketNumber, taskType, task])

  if(!session) {
    return (
      <ProtectedPage />
    )
  }
  return (
    <div className="page startTask">
        {!userUUID && (<ScanInput table="users" setParent={setUserUUID} htmlForNameID="scanUserUUID" displayName="Scan User Id"/>)}

        {userUUID && 
        !ticketNumber && 
        (<ScanInput table="tickets" setParent={setTicketNumber} htmlForNameID="scanTicketNumber" displayName="Scan Ticket Number"/>)}

        {userUUID && ticketNumber && !taskType && (<SelectTask setParent={setTaskType}/>)}

        {task && (
          <>
            <Clock task={task} setTask={setTask} setTaskType={setTaskType} setUserUUID={setUserUUID} setTicketNumber={setTicketNumber}/>
            <div>
              <Pause task={task} setParent={setTask}/>
              <End  task={task} setParent={setTask}/>
            </div>
          </>
        )}
    </div>
  )
}

export default StartTask