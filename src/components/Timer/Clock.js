import { useEffect } from 'react';
import { useState } from 'react';
import supabase from "../../config/supabaseClient"

export default function Clock({task, setTask, setUserUUID, setTicketNumber, setTaskType}) {
    const [time, setTimer] = useState(0);
    const [timeStr, setTimeStr] = useState(null)

    const [pauseTime, setPauseTime] = useState(0)
    const [pauseTimeStr, setPauseTimeStr] = useState(null)

    const timer = (setClock, clock, setStr) => {
        setClock(prev => prev + 1)
        setStr(new Date(clock * 1000).toISOString().substring(19, 11));
    }

    const resetState = () => {
        setTask(null)
        setUserUUID(null)
        setTicketNumber(null)
        setTaskType(null)
        return;
    }
    useEffect(() => {
        if(task.is_complete) {
            const endTask = async (pt, wt) => {
                const {data, errors} = await supabase.from('tasks').update({paused_time: pt, working_time: wt}).eq('id', task.id).select().single()
                if(errors) {
                    console.log('Errors recording task times', errors);
                    return;
                }
                if(data) {
                    console.log(data)
                    resetState()
                    return;
                }
            }
            endTask(pauseTime, time)
            return;
        }
        if(!task.paused) {
            const mainInterval = setInterval(() => timer(setTimer, time, setTimeStr), 1000)
            return () => clearInterval(mainInterval)
        } else {
            const pauseInterval = setInterval(() => timer(setPauseTime, pauseTime, setPauseTimeStr), 1000)
            return () => clearInterval(pauseInterval)
        }
        
    })

    return (
        <div>
            {!task.paused && (<h1>{timeStr}</h1>)}
            {task.paused && (<h1>{pauseTimeStr}</h1>)}
        </div>
    )
}