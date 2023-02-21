import supabase from "../../../config/supabaseClient"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"


export default function ViewTickets() {
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
        getData()
    }, [])

    if(!tickets) return <div className="oage ViewTickets"><p>Loading...</p></div>
    return (
        <div className="page ViewTickets">
            <h3>Tickets</h3>
            {tickets.map((item) => (
                <Link key={item.id} to={`./${item.id}`} style={{textDecoration: 'none', color: 'black'}}>
                    <div  style={{backgroundColor: '#fff', padding: '1rem', margin: '1rem 0 1rem 0', display: 'flex', justifyContent: 'space-between', textDecoration: 'none'}}>
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