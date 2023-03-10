import { useEffect, useRef } from 'react';
import supabase from "../../config/supabaseClient"
import { clearInterval, setInterval } from 'worker-timers';

export default function Clock({task, setTask, setUserUUID, setTicketNumber, setTaskType}) {
    
    const channel = useRef(null)

    const working_time = useRef(0)
    const paused_time = useRef(0)
    const wStrRef = useRef(null)
    const pStrRef = useRef(null)

    const timer = (bool, task) => {
        if(bool) {
            working_time.current += 1
            if(working_time.current % 150 === 0) {
                (async () => {
                    await supabase.from('tasks').update({paused_time: paused_time.current, working_time: working_time.current}).eq('id', task.id)
                })()
            }
            wStrRef.current.textContent = new Date(working_time.current * 1000).toISOString().substring(19, 11)
        } else {
            paused_time.current += 1
            if(paused_time.current % 150 === 0) {
                (async () => {
                    await supabase.from('tasks').update({paused_time: paused_time.current, working_time: working_time.current}).eq('id', task.id)
                })()
            }
            pStrRef.current.textContent = new Date(paused_time.current * 1000).toISOString().substring(19, 11)
        }
        channel.current.track({working_time: working_time.current, paused_time: paused_time.current})
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
            .subscribe()
        }
    }, [])

    useEffect(() => {
        console.log('useEffect')
        window.addEventListener("beforeunload", (ev) => {  
            ev.preventDefault();
            return;
        });
        
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
            endTask(paused_time.current, working_time.current)
            return;
        }
        if(!task.paused) {
            const mainInterval = setInterval(() => timer(true, task), 1000)
            return () => {
                clearInterval(mainInterval)
            }
        } else {
            const pauseInterval = setInterval(() => timer(false, task), 1000)
            return () => {
                clearInterval(pauseInterval)
                window.removeEventListener("beforeunload", (ev) => {  
                    ev.preventDefault();
                });
            }
        }
    })

    return (
        <div>
            {!task.paused && (<p style={{fontSize: '2rem', fontWeight: '700'}} ref={wStrRef}></p>)}
            {task.paused && (<p style={{fontSize: '2rem', fontWeight: '700'}} ref={pStrRef}></p>)}
        </div>
    )
}