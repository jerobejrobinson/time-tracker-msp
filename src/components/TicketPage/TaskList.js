import supabase from "../../config/supabaseClient"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

import TaskCard from "../TaskCard"

export default function TaskList() {
    const [tasklist, setTaskList] = useState(null)
    const [errors, setErrors] = useState(null)
    const { id } = useParams()
    useEffect(() => {
        const getData = async () => {
            const { data, errors } = await supabase.from('tasks').select(
                `
                id,
                working_time,
                paused_time,
                is_complete,
                admin_ended,
                started,
                ended,
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
                `
            ).eq('ticket_id', id);
            if(errors) {
                console.log('error getting ticket data', errors)
                setErrors(errors)
                return
            }
            if(data) {
                console.log(data)
                setTaskList(data)
                return;
            }

        }
        getData()
    }, [id])

    if(errors) return <div>Errors getting data</div>
    if(!tasklist) return <div>No Task Started</div>
    return (
        <div style={{width: '100%'}}>
            {tasklist.map((task) => <TaskCard task={task} key={task.id} alt/>)}
        </div>
    )
}