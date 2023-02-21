import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import supabase from "../../../config/supabaseClient";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX, faCaretDown, faListCheck, faAddressCard, faFileInvoice, faCartPlus } from "@fortawesome/free-solid-svg-icons";
import TaskList from "../../../components/TicketPage/TaskList";
import CustomerInformation from "../../../components/TicketPage/CustomerInformation";

import './styles.css'
import PartsOrdered from "../../../components/TicketPage/PartOrdered";

export default function TicketPage() {
    const { id } = useParams()
    const [ticket, setTicket] = useState(null)
    const [errors, setErrors] = useState(null)

    const taskContainer = useRef(null)
    const [displayTask, setDisplayTask] = useState(false)

    const customerContainer = useRef(null)
    const [displayCustomer, setDisplayCustomer] = useState(false)

    const partsOrderedContainer = useRef(null)
    const [displayPartsOrdered, setDisplayPartsOrdered] = useState(false)

    useEffect(() => {
        const getData = async () => {
            const { data, error } = await supabase.from('tickets').select().eq('id', id).single()
            if(error) {
                console.log('error getting ticket data', error)
                setErrors(error)
                return
            }
            if(data) {
                setTicket(data)
                return;
            }
        }
        getData();
    }, [])

    if(errors) return <div className="page"><h3>Error</h3>{errors.message}</div>
    if(!ticket) return <div className="page">Loading...</div>
    return (
        <div className="page">
            <div className="module">
                <p style={{fontWeight: 700}}>Ticket Number: {ticket.number}</p>
                <p>Part Number: {ticket.part_number}</p>
                <p>Warehouse: {ticket.warehouse}</p>
            </div>

            {/* Tasks -----------------------------------------------------------------------------------------*/}
            <div className="module">
                <p><FontAwesomeIcon icon={faListCheck} /> Tasks</p>
                <p  className="caretContainer"  onClick={() => {
                    taskContainer.current.classList.toggle('open')
                    setDisplayTask(prev => !prev)
                }}>{displayTask ? <FontAwesomeIcon icon={faX} /> : <FontAwesomeIcon icon={faCaretDown} />}</p>
            </div>
            <div className="toggle" ref={taskContainer} >
                {displayTask && (<TaskList />)}
            </div>

            {/* customer information ----------------------------------------------------------------------------------*/}
            <div className="module">
                <p><FontAwesomeIcon icon={faAddressCard} /> Customer Information</p>
                <p className="caretContainer" onClick={() => {
                    customerContainer.current.classList.toggle('open')
                    setDisplayCustomer(prev => !prev)
                }}>{displayCustomer ? <FontAwesomeIcon icon={faX} /> : <FontAwesomeIcon icon={faCaretDown} />}</p>
            </div>
            <div className="toggle" ref={customerContainer}>
                {displayCustomer && (<CustomerInformation />)}
            </div>

            {/* Parts ordered --------------------------------------------------------------------------------------------*/}
            <div className="module">
                <p><FontAwesomeIcon icon={faCartPlus} /> Parts</p>
                <p className="caretContainer" onClick={() => {
                    partsOrderedContainer.current.classList.toggle('open')
                    setDisplayPartsOrdered(prev => !prev)
                }}>{displayPartsOrdered ? <FontAwesomeIcon icon={faX} /> : <FontAwesomeIcon icon={faCaretDown} />}</p>
            </div>
            <div className="toggle" ref={partsOrderedContainer}>
                {displayPartsOrdered && (<PartsOrdered />)}
            </div>

            {/* Billing ------------------------------------------------------------------------------------------------------*/}
            <div className="module">
                <p><FontAwesomeIcon icon={faFileInvoice} /> Billing</p>
                <p className="caretContainer" >{displayTask ? <FontAwesomeIcon icon={faX} /> : <FontAwesomeIcon icon={faCaretDown} />}</p>
            </div>
        </div>
    )
}

