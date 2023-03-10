import { useState, useEffect } from "react";
import supabase from "../../config/supabaseClient";

export default function useGetSession() {
    const [session, setSession] = useState({session: null})
    const [errors, setErrors] = useState(null)
    supabase.auth.onAuthStateChange((event, session) => {
        if (event === 'SIGNED_IN') setSession({session})
    })
    supabase.auth.onAuthStateChange((event, session) => {
        if (event === 'SIGNED_OUT') setSession(null)
      })
    useEffect(() => {
        const getSession = async () => {
            const {data, error} = await supabase.auth.getSession();
            if(error) {
                setSession(null)
                setErrors(error)
                return;
            }
            if(data) {
                setSession(data)
                setErrors(null)
                return;
            }
        }
        getSession()
    }, [])

    
    return {session, errors}
}