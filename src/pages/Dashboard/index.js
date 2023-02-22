import { useEffect, useState, useContext } from "react"
import { Link } from "react-router-dom"
import supabase from "../../config/supabaseClient"
import SessionContext from "../../lib/session"

import ProtectedPage from "../../components/ProtectedPage"
import RealtimeTaskCards from "../../components/RealtimeTaskCards"

import './styles.css'

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
            tasks.forEach(task => {
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
    if(session && session.user.user_metadata.authLevel !== process.env.REACT_APP_MSP_LEVEL_ONE) {
        return (
            <ProtectedPage loggedIn={true} />
        )
    }
    return (
        <div className="page dashboard">
            <h2>Actions</h2>
            <div className="dashboardActions" style={{boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)", padding: '1rem', background: 'white', marginBottom: '1rem'}}>
                <Link to='./view-techs'>
                    <button>View All Techs</button>
                </Link>
                <Link to='./add-new-tech'>
                    <button>Add New Tech</button>
                </Link>
                <Link to='./new-tickets'>
                    <button>Set Up New Tickets</button>
                </Link>                
                <Link to='./view-tickets'>
                    <button>View Tickets</button>
                </Link>                
            </div>


            <h3>Current Tasks</h3>
            {realtime && (<RealtimeTaskCards tasks={tasks} realtime={realtime} />)}
        </div>
    )
}