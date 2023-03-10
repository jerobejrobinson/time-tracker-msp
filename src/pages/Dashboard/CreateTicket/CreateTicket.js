import supabase from "../../../config/supabaseClient";
import { useEffect, useState, useContext } from "react";
import SessionContext from "../../../lib/session";

import { PDFDownloadLink } from '@react-pdf/renderer';
import WorkOrder from "../../../components/PDF/WorkOrder";
import ProtectedPage from "../../../components/ProtectedPage";
import Breadcrumbs from "../../../components/Breadcrumbs";

export default function CreateTicket() {
    const {session} = useContext(SessionContext)
    const [quanity, setQuanity] = useState(null)
    const [location, setLocation] = useState(null)
    const [lastTicketId, setLastTicketId] = useState(null)
    const [ticketArr, setTicketArr] = useState(null)

    useEffect(() => {
        console.log(lastTicketId)
        if(lastTicketId) return;
        const getLastTicket = async () => {
            const { data, errors } = await supabase.from('tickets').select('id').order('id', {ascending: false}).limit(1)
            if(errors) {
                console.log("Errors getting last ticket")
                return;
            }
            if(data) {
                setLastTicketId(data[0].id)
                return;
            }
        }
        getLastTicket()
    }, [lastTicketId])

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(quanity)
        console.log(location)
        console.log(lastTicketId)
        if(!quanity || !location || !lastTicketId) return;
        const arr = [];
        let x = 1;
        while(x <= quanity) {
            arr.push({
                id: lastTicketId + x,
                created_at: ((new Date()).toISOString()).toLocaleString('en-US'),
                number: lastTicketId + x,
                warehouse: location
            })
            x++;
        }
        if(arr.length != quanity) {
            console.log('error')
            return;
        }
        const insertTickets = async () => {
            const arr2 = []
            const { data, errors } = await supabase.from('tickets').insert(arr).select('id')
            if(errors) {
                console.log('Errors adding tickets to database', errors);
                return;
            }
            if(data) {
                data.forEach(item => {
                    arr2.push(item.id)
                })
                if(data.length !== arr2.length) return;
                setTicketArr(arr2)
                setLastTicketId(null)
                return;
            }
        }
        insertTickets()
    }
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
    return (
        <div className="page">
            <Breadcrumbs />
            <h3>create new tickets</h3>
            <form style={{boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)", padding: '1rem', background: 'white', marginBottom: '1rem'}}>
                <label htmlFor="woQuanity">Enter Quanity Needed: </label>
                <input type="number" htmlFor="woQuanity" id="woQuanity" onChange={(e) => setQuanity(e.target.value)}/>
                <p>Select Fuel Shop Location: </p>
                <div onChange={(e) => setLocation(e.target.value)}>
                    <input type="radio" id="wh300" name="warehouse" value="300"/>
                    <label htmlFor="wh300">300</label>
                    <input type="radio" id="wh301" name="warehouse" value="301"/>
                    <label htmlFor="wh301">301</label>
                    <input type="radio" id="wh302" name="warehouse" value="302" />
                    <label htmlFor="wh302">302</label>
                </div>
                <br />
                <button type="button" onClick={handleSubmit}>Submit</button>
            </form>
            {ticketArr && (
                <div style={{
                    boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)", padding: '1rem', background: 'white', marginBottom: '1rem'}
                }>
                    <PDFDownloadLink document={<WorkOrder codes={ticketArr} location={location}/>} fileName={`"fuel-shop-repair-order-forms | ${((new Date()).toISOString()).toLocaleString('en-US')}.pdf`}>
                        {({ blob, url, loading, error }) =>
                            loading ? 'Loading document...' : 'Download now!'
                        }
                    </PDFDownloadLink>
                </div>
            )}
        </div>
    )
}