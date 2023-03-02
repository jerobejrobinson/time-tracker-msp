import { useEffect, useState, useRef, useContext } from "react";
import { useParams } from "react-router-dom";
import supabase from "../../../config/supabaseClient";
import SessionContext from "../../../lib/session";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX, faCaretDown, faListCheck, faAddressCard, faFileInvoice, faCartPlus } from "@fortawesome/free-solid-svg-icons";
import TaskList from "../../../components/TicketPage/TaskList";
import CustomerInformation from "../../../components/TicketPage/CustomerInformation";
import PartsOrdered from "../../../components/TicketPage/PartOrdered";
import Billing from "../../../components/TicketPage/Billing";
import ProtectedPage from "../../../components/ProtectedPage";

import './styles.css'
import Breadcrumbs from "../../../components/Breadcrumbs";

export default function TicketPage() {
    const {session} = useContext(SessionContext)
    const { id } = useParams()
    const [ticket, setTicket] = useState(null)
    const [errors, setErrors] = useState(null)

    const taskContainer = useRef(null)
    const [displayTask, setDisplayTask] = useState(false)

    const customerContainer = useRef(null)
    const [displayCustomer, setDisplayCustomer] = useState(false)

    const partsOrderedContainer = useRef(null)
    const [displayPartsOrdered, setDisplayPartsOrdered] = useState(false)

    const billingContainer = useRef(null)
    const [displayBilling, setDisplayBilling] = useState(false)

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
    }, [id])
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
    if(errors) return <div className="page"><h3>Error</h3>{errors.message}</div>
    if(!ticket) return <div className="page">Loading...</div>
    return (
        <div className="page">
            <Breadcrumbs />
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
                <p className="caretContainer" onClick={() => {
                    billingContainer.current.classList.toggle('open')
                    setDisplayBilling(prev => !prev)
                }}>{displayBilling ? <FontAwesomeIcon icon={faX} /> : <FontAwesomeIcon icon={faCaretDown} />}</p>
            </div>
            <div className="toggle" ref={billingContainer}>
                {displayBilling && (<Billing />)}
            </div>
        </div>
    )
}

