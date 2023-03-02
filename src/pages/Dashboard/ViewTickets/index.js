import supabase from "../../../config/supabaseClient"
import { useEffect, useState, useContext } from "react"
import { Link } from "react-router-dom"
import SessionContext from "../../../lib/session"

import ProtectedPage from "../../../components/ProtectedPage"
import Breadcrumbs from "../../../components/Breadcrumbs"

export default function ViewTickets() {
    const {session} = useContext(SessionContext)
    const [tickets, setTickets] = useState(null)

    useEffect(() => {
        console.log(tickets)
        const getData = async () => {
            const {data, error} = await supabase.from("tickets").select()
            if(error) {
                console.log(error, error._message)
                return
            }
            if(data) {
                setTickets(data)
                return;
            }
        }
        if(!tickets) {
            getData()
        }
    }, [tickets])
    if(!session) {
        return (
            <ProtectedPage />
        )
    }
    if(session && session.user.user_metadata.authLevel !== process.env.REACT_APP_MSP_LEVEL_ONE) {
        return (
            <ProtectedPage loggedIn={true} />
        )
    }
    if(!tickets) return <div className="page ViewTickets"><p>Loading...</p></div>
    return (
        <div className="page ViewTickets">
            <Breadcrumbs />
            <h3>Tickets</h3>
            {tickets.map((item) => (
                <Link key={item.id} to={`./${item.id}`} style={{textDecoration: 'none', color: 'black'}}>
                    <div style={{backgroundColor: '#fff', padding: '1rem', margin: '1rem 0 1rem 0', display: 'flex', justifyContent: 'space-between', textDecoration: 'none'}}>
                        <p>Ticket Number: {item.number}</p>
                        <p>Created at: {item.created_at.substring(0, 10)}</p>
                        <p>Part Number: {item.part_number}</p>
                        <p>Warehouse: {item.warehouse}</p>
                    </div>
                </Link>
            ))}
        </div>
    )
}