import SessionContext from ".";
import { useEffect, useState } from 'react'
import useGetSession from './useGetSession'
export default function SessionProvider({children}) {
    // const [session, setSession] = useState(null);
    const {session} = useGetSession()
    useEffect(() => {
        console.log('Provider')
        console.log(session)
        // setSession(getSession())
    }, [session])
    return (
        <SessionContext.Provider value={session}>
            {children}
        </SessionContext.Provider>
    )
}