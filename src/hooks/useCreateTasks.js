import { useEffect, useState } from "react"
import supabase from "../config/supabaseClient"

const useCreateTask = ({userId = null, taskType = null, ticketId = null, errors = null}) => {
    // const [userId, setUserId] = useState(null);
    // const [taskType, setTaskType] = useState(null);
    // const [ticketId, setTicketId] = useState(null);
    // const [createErrors, setCreateErrors] = useState(null);

    useEffect(() => {
        const createTask = async () => {
            const {data, error } = await supabase
                .from('tasks')
                .insert([{userId}])
                .single()
        }
    }, [])
}