import { useState, useEffect } from "react";
import supabase from "../../config/supabaseClient";

export default function useGetSession() {
    const [session, setSession] = useState(null)
    const [errors, setErrors] = useState(null)
    supabase.auth.onAuthStateChange((event, session) => {
        if (event == 'SIGNED_IN') setSession({session})
    })
    supabase.auth.onAuthStateChange((event, session) => {
        if (event == 'SIGNED_OUT') setSession(null)
      })
    useEffect(() => {
        const getSession = async () => {
            const {data, error} = await supabase.auth.getSession();
            if(error) {
                setSession(null)
                setErrors(error)
                return { session, errors}
            }
            if(data) {
                setSession(data)
                setErrors(null)
                return { session, errors}
            }
        }
        getSession()
    }, [])

    
    return {session, errors}
}