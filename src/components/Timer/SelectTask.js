import supabase from "../../config/supabaseClient";

export default function SelectTask({setParent}) {
    const getTaskType = async (value) => {
        const { data, errors } = await supabase.from('task_types').select().eq('id', value).single()
        if(errors) {
            console.log('Error getting task type', errors);
            return;
        }
        if(data) {
            setParent(data);
            return;
        }
    }
    return (
        <div>
            <h3>Select Task</h3>
            <form>
                <select name="task" id="task" onChange={(e) => getTaskType(e.target.value)}>
                    <option value=""></option>
                    <option value="1">Teardown</option>
                    <option value="5">Clean Up</option>
                    <option value="4">Build</option>
                    <option value="3">Test</option>
                </select>
            </form>
        </div>
    )
}