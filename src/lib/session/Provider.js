import SessionContext from ".";
import { useEffect } from 'react'
import useGetSession from './useGetSession'
export default function SessionProvider({children}) {
    const {session} = useGetSession()
    useEffect(() => {
        console.log('Provider')
        console.log(session)
    }, [session])
    return (
        <SessionContext.Provider value={session}>
            {children}
        </SessionContext.Provider>
    )
}