import supabase from "../../config/supabaseClient"

export default function Pause({task, setParent}) {
    const pauseTimer = async (bool) => {
        const {data, errors} = await supabase.from('tasks').update({paused: bool}).eq('id', task.id).select().single()
        if(errors) {
            console.log('Errors pausing time', errors);
            return;
        }
        if(data) {
            console.log(data)
            setParent(data);
            return;
        }
    }
    return (
        <>
            {!task.paused && (<button onClick={() => pauseTimer(true)}>Pause Time</button>)}
            {task.paused && (<button onClick={() => pauseTimer(false)}>Resume Time</button>)}
        </>
    )
}