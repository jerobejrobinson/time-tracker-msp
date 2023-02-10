import SessionContext from ".";
import { useState, useEffect } from 'react'
import supabase from "../../config/supabaseClient";
export default function SessionProvider({children}) {
    const [session, setSession] = useState(null);
    useEffect(() => {
        const getSession = async () => {
        const { data, error } = await supabase.auth.getSession();
        if(error) {
            console.log(error.message);
            return ;
        }
        if(data) {                
            setSession({data: data, error: null});
            return;
        }
    }
    getSession()
    }, [])
    useEffect(() => {
        console.log(session)
        console.log('session state has changed')
    }, [session])
    
    return (
        <SessionContext.Provider value={session}>
            {children}
        </SessionContext.Provider>
    )
}