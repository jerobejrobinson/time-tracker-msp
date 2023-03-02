import { useParams} from "react-router-dom";
import useFetchUserById from "../../../hooks/useFetchUserById";
import supabase from "../../../config/supabaseClient";
import { useState, useEffect, useContext } from "react";
import SessionContext from "../../../lib/session";

import ProtectedPage from "../../../components/ProtectedPage";
import TaskCard from "../../../components/TaskCard";
import Breadcrumbs from "../../../components/Breadcrumbs";

import './styles.css'

export default function UserPage() {
    const {session} = useContext(SessionContext)
    const {id} = useParams()
    const { data } = useFetchUserById(id);
    const [tasks, setTasks] = useState(null)

    useEffect(() => {
        const getUserTasks = async () => {
            const { data, errors } = await supabase.from('tasks').select(`
                working_time,
                paused_time,
                is_complete,
                started,
                ended,
                tickets (
                    number,
                    part_number
                ),
                task_types (
                    type
                )
            `).eq('user_id', id)
            if(errors) {
                console.log('Errors getting user tasks', errors)
                return;
            }
            if(data) {
                console.log(data)
                setTasks(data)
                return;
            }
        }
        getUserTasks()
    }, [id])
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
        <div className="page userPage">
            <Breadcrumbs />
            {data && (<h3>{data.name}</h3>)}
            <h3>Badge</h3>
            {data && (<img src={`http://bwipjs-api.metafloor.com/?bcid=code128&text=${id}&parsefnc&alttext=${data.name}`} alt="" />)}
            {tasks && (
                <>
                    <h3>Tasks</h3>
                    <div className="userTasklist">
                        {tasks.map((task) => (
                            <TaskCard task={task} key={task.id}/>
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}