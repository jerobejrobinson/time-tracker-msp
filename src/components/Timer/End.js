import supabase from "../../config/supabaseClient"

export default function End({task, setParent}) {
    const endTask = async () => {
        const {data, errors} = await supabase.from('tasks').update({is_complete: true, ended: ((new Date()).toISOString()).toLocaleString('en-US')}).eq('id', task.id).select().single()
        if(errors) {
            console.log('Errors ending time', errors);
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
            <button onClick={endTask}>End Task</button>
        </>
    )
}