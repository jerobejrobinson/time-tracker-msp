import SessionContext from ".";
import { useEffect, useState } from 'react'
import useGetSession from './useGetSession'
export default function SessionProvider({children}) {
    const [session, setSession] = useState(null);
    const getSession = useGetSession()
    useEffect(() => {
        getSession().then(data => setSession(data))
    }, [])
    return (
        <SessionContext.Provider value={{session: session, setSession}}>
            {children}
        </SessionContext.Provider>
    )
}