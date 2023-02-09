import { useState, useEffect } from 'react';
import supabase from '../config/supabaseClient';

const useFetchTaskTypes = () => {
    const [ taskTypes, setTaskTypes ] = useState(null);
    const [ fetchErrors, setFetchErrors ] = useState(null);

    useEffect(() => {
        const fetchTaskTypes = async () => {
            const { data, error } = await supabase.from('task_types').select()
            if(error) {
                setFetchErrors(error)
                setTaskTypes(null)
                return;
            }
            if(data) {
                setTaskTypes(data);
                setFetchErrors(null);
                return;
            }
        }

        fetchTaskTypes();
    }, [])

    return { data: taskTypes, error: fetchErrors}
}

export default useFetchTaskTypes