import supabase from "../config/supabaseClient";
import { useEffect, useState } from "react";
const useFetchTicketByNumber = (number) => {
    const [ticket, setTicket] = useState(null)
    const [fetchErrors, setFetchErrors] = useState(null)

    useEffect(() => {
        const getTicket = async () => {
            const { data, error } = await supabase
                .from('tickets')
                .select()
                .filter('number', 'eq', number)
                .single()

            if(error) {
                console.log('error getting ticket.')
                console.log(error.message)
                setFetchErrors(error)
                setTicket(null)
                return;
            }

            if(data) {
                console.log(`found ticket ${number}`)
                console.log(data)
                setTicket(data)
                setFetchErrors(null)
                return;
            }
        }

        getTicket()
    }, [ticket, fetchErrors, number])

    return { data: ticket, errors: fetchErrors}
}

export default useFetchTicketByNumber