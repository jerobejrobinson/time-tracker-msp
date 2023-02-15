import { useEffect, useState, useRef } from 'react';
import supabase from "../../config/supabaseClient"

export default function Clock({task, setTask, setUserUUID, setTicketNumber, setTaskType}) {
    const channel = useRef(null)

    const [time, setTimer] = useState(0);
    const [timeStr, setTimeStr] = useState(null)

    const [pauseTime, setPauseTime] = useState(0)
    const [pauseTimeStr, setPauseTimeStr] = useState(null)

    const timer = (setClock, clock, setStr, bool) => {
        setClock(prev => prev + 1)
        setStr(new Date(clock * 1000).toISOString().substring(19, 11));
        channel.current.track({working_time: time, paused_time: pauseTime})
    }

    const resetState = () => {
        setTask(null)
        setUserUUID(null)
        setTicketNumber(null)
        setTaskType(null)
        channel.current && supabase.removeChannel(channel.current)
        return;
    }

    useEffect(() => {
        if(!channel.current) {
            channel.current = supabase.channel(task.id)
            channel.current.on('presence', {event: 'sync'}, () => {
                const roomState = channel.current.presenceState()
                console.log(roomState)
            })
            .subscribe(async (status) => {
                console.log('status: ', status)
                if(status === 'SUBSCRIBED') {
                    const res = await channel.current.track({working_time: time, paused_time: pauseTime});
                    console.log(res)
                }
            })
        }
    }, [])

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
            const mainInterval = setInterval(() => timer(setTimer, time, setTimeStr, true), 1000)
            return () => clearInterval(mainInterval)
        } else {
            const pauseInterval = setInterval(() => timer(setPauseTime, pauseTime, setPauseTimeStr, false), 1000)
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