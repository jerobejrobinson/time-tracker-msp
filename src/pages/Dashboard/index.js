import { useEffect, useState, useContext } from "react"
import { Link } from "react-router-dom"
import Breadcrumbs from "../../components/Breadcrumbs"
import ProtectedPage from "../../components/ProtectedPage"
import supabase from "../../config/supabaseClient"
import SessionContext from "../../lib/session"

export default function Dashboard() {
    const {session} = useContext(SessionContext)
    const [tasks, setTasks] = useState(null)
    const [realtime, setRealtime] = useState({})
    useEffect(() => {
        const getAllUncompletedTasks = async () => {
            const { data, errors } = await supabase.from('tasks').select(`
                id,
                is_complete,
                tickets (
                    number,
                    part_number
                ),
                users (
                    name
                ),
                task_types (
                    type
                )
            `).eq('is_complete', false)
            if(errors) {
                console.log('Errors getting uncompleted tasks', errors)
                return;
            }
            if(data) {
                setTasks(data);
                return
            }
        }
        getAllUncompletedTasks()
    }, [])

    useEffect(() => {
        if(tasks) {
            tasks.map(task => {
                task.working_time = 0;
                task.paused_time = 0;

                const channel = supabase.channel(task.id)
                channel.on('presence', {event: 'sync'}, () => {
                    const data = channel.presenceState()
                    if(Object.keys(data).length === 0) {
                        return;
                    } else {
                        task.working_time = data[Object.keys(data)[0]][0].working_time
                        task.paused_time = data[Object.keys(data)[0]][0].paused_time

                        setRealtime(prev => {
                            if(prev[task.id] === undefined) {
                                prev[task.id] = {
                                    working_time: task.working_time,
                                    paused_time: task.paused_tome
                                }
                            } else {
                                prev[task.id].working_time = task.working_time
                                prev[task.id].paused_time = task.paused_time
                            }

                            return {...prev}
                        })
                    }
                }).subscribe()
            })
        }
    }, [tasks])

    useEffect(() => {
        // console.log(realtime)
    }, [realtime])

    if(!session) {
        return (
            <ProtectedPage />
        )
    }
    if(session && session.user.user_metadata.authLevel !== process.env.REACT_APP_MSP_LEVEL_1) {
        return (
            <ProtectedPage loggedIn={true} />
        )
    }
    return (
        <div className="page dashboard">
            <Breadcrumbs />
            <h1>Dashboard</h1>
            <h2>Actions</h2>
            <Link to='./view-techs'>View All Techs</Link>
            <br />
            <Link to='./add-new-tech'>Add New Tech</Link>
            <br />
            <Link to='./new-tickets'>Set Up New Tickets</Link>
            <br />
            <Link to='./view-tickets'>View Tickets</Link>
            <br />
            <Link to='./edit-ticket'>Edit Ticket</Link>


            <h3>Current Tasks</h3>
            {tasks && tasks.map(task => (
                <div key={task.id}>
                    <h4>{task.users.name}</h4>
                    {realtime && realtime[task.id] && (
                        <>
                            <p>Working Time: {new Date(realtime[task.id].working_time * 1000).toISOString().substring(19, 11)}</p>
                            <p>Paused Time: {new Date(realtime[task.id].paused_time * 1000).toISOString().substring(19, 11)}</p>
                        </>
                    )}
                    <p>Ticket Number: {task.tickets.number}</p>
                    <p>Part Number: {task.tickets.part_number}</p>
                    <p>Task Type: {task.task_types.type}</p>
                </div>
            ))}
        </div>
    )
}