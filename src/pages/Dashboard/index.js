import { useEffect, useState, useRef } from "react"
import { Link } from "react-router-dom"
import Breadcrumbs from "../../components/Breadcrumbs"
import supabase from "../../config/supabaseClient"
export default function Dashboard() {
    const [tasks, setTasks] = useState(null)
    const [realtime, setRealtime] = useState([])
    useEffect(() => {
        // const getAllChannels = async () => {
        //     // const channels = await supabase.getChannels();
        //     console.dir(supabase)
        // }
        // getAllChannels()
        console.log('calllllllS')
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
                )
            `).eq('is_complete', false)
            if(errors) {
                console.log('Errors getting uncompleted tasks', errors)
                return;
            }
            if(data) {
                console.log(data)
                setTasks(data);
                return
            }
        }
        getAllUncompletedTasks()
    }, [])

    useEffect(() => {
        if(tasks) {
            let arr = []
            tasks.map(task => {
                
                const channel = supabase.channel(task.id)
                channel.on('presence', {event: 'sync'}, () => {
                    const data = channel.presenceState()
                    console.log({...data[Object.keys(data)[0]][0]})
                })
                .subscribe()

                
            })
        }
    }, [tasks])
    return (
        <div className="page dashboard">
            <Breadcrumbs />
            <h1>Dashboard</h1>
            <h2>Actions</h2>
            <Link to='./add-new-user'>Add New User</Link>
            <Link to='./view-users'>View All Users</Link>
        </div>
    )
}