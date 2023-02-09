import { useState, useEffect } from 'react';
import supabase from '../config/supabaseClient';

const useFetchTasks = () => {
    const [ tasks, setTasks ] = useState(null);
    const [ fetchErrors, setFetchErrors ] = useState(null);

    useEffect(() => {
        const fetchTasks = async () => {
            const { data, error } = await supabase.from('tasks').select()
            if(error) {
                setFetchErrors(error)
                setTasks(null)
                return;
            }
            if(data) {
                setTasks(data);
                setFetchErrors(null);
                return;
            }
        }

        fetchTasks();
    }, [])

    return { data: tasks, error: fetchErrors}
}

export default useFetchTasks