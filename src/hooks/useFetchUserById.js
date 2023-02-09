import supabase from "../config/supabaseClient";
import { useEffect, useState } from "react";
const useFetchUserById = (id) => {
    const [user, setUser] = useState(null)
    const [fetchErrors, setFetchErrors] = useState(null)

    useEffect(() => {
        const getUser = async () => {
            const { data, error } = await supabase
                .from('users')
                .select()
                .filter('id', 'eq', id)
                .single()

            if(error) {
                console.log('error getting user.')
                console.log(error.message)
                setFetchErrors(error)
                setUser(null)
                return;
            }

            if(data) {
                console.log(`found user ${id}`)
                console.log(data)
                setUser(data)
                setFetchErrors(null)
                return;
            }
        }

        getUser()
    }, [])

    return { data: user, errors: fetchErrors}
}

export default useFetchUserById