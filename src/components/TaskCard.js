import supabase from '../config/supabaseClient'
import { useState, useEffect } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBusinessTime } from '@fortawesome/free-solid-svg-icons'

import './TaskCard.css'

export default function TaskCard({task, key = null, alt}) {
    const [updatedTask, setUpdatedTask] = useState(task)
    const [endTimeClick, setEndTimeClick] = useState(false)

    useEffect(() => {
        console.log(Date.parse(((new Date()).toISOString()).toLocaleString('en-US')) - Date.parse(updatedTask.started))
        console.log()
    })
    const handleEndTask = async () => {
        const {data, error} = await supabase.from('tasks')
        .update({admin_ended: true, is_complete: true, ended: ((new Date()).toISOString()).toLocaleString('en-US')})
        .eq('id', task.id)
        .select(
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
        )`)
        .single()
        if(error) {
            console.log(error.message)
            return;
        }
        if(data) {
            console.log(data)
            setUpdatedTask(prev => {
                    return {...data}
                }
            )
            return;
        }
    }
    // useEffect(() => {
    //     console.log(endTimeClick)
    //     console.log(task)
    //     console.log(updatedTask)
        
    //     handleEndTask()
    // }, [endTimeClick])

    if(!alt) return (
        <div className="taskCard">
            <p>Start Time: {new Date(task.started).toLocaleString()}</p>
            <p>End Time: {new Date(task.ended).toLocaleString()}</p>
            <p>Labor Time: {new Date(task.working_time * 1000).toISOString().substring(19, 11)}</p>
            <p>Time Spent Paused: {new Date(task.paused_time * 1000).toISOString().substring(19, 11)}</p>
            <p>PO Number: {task.tickets.number}</p>
            <p>Part Number: {task.tickets.part_number}</p>
            <p>Task Type: {task.task_types.type}</p>
        </div>
    )

    return (
        <div className="taskCardAlt">
            <p id="taskCardAltUsername">Tech: {updatedTask.users.name}</p>
            <p>Start Time: <br /> {new Date(updatedTask.started).toLocaleString()}</p>
            <p>End Time:  <br /> {updatedTask.ended == null ? "n/a" : new Date(updatedTask.ended).toLocaleString()}</p>
            <p>Labor Time:  <br /> {new Date(updatedTask.working_time * 1000).toISOString().substring(19, 11)}</p>
            <p>Time Spent Paused:  <br /> {new Date(updatedTask.paused_time * 1000).toISOString().substring(19, 11)}</p>
            <p>Task Type:  <br /> {updatedTask.task_types.type}</p>
            {updatedTask.is_complete === false && (
                <div style={{flexBasis: '100%', display: 'flex', justifyContent: "space-between", alignItems: 'center'}}>
                    <p>Task is not completed or it was not ended properly <i style={{color: 'var(--primary)'}}>red button</i> to end task. <br /><span style={{fontWeight: '700'}}>Note:</span> This action will result in a inaccurate labor time & end time.</p>
                    <button 
                        className='btn-red' 
                        style={{height: '50%'}}
                        onClick={() => handleEndTask()}
                    >
                        <FontAwesomeIcon icon={faBusinessTime} />
                    </button>
                </div>
            )}
        </div>
    )
}