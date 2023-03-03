import { useEffect, useState, useRef, useContext } from "react";
import { useParams } from "react-router-dom";
import supabase from "../../../config/supabaseClient";
import SessionContext from "../../../lib/session";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX, faCaretDown, faListCheck, faAddressCard, faFileInvoice, faCartPlus, faDownload } from "@fortawesome/free-solid-svg-icons";
import TaskList from "../../../components/TicketPage/TaskList";
import CustomerInformation from "../../../components/TicketPage/CustomerInformation";
import PartsOrdered from "../../../components/TicketPage/PartOrdered";
import Billing from "../../../components/TicketPage/Billing";
import ProtectedPage from "../../../components/ProtectedPage";
import { PDFDownloadLink, } from "@react-pdf/renderer";
import WorkOrder from "../../../components/PDF/WorkOrder";

import './styles.css'
import Breadcrumbs from "../../../components/Breadcrumbs";

export default function TicketPage() {
    const {session} = useContext(SessionContext)
    const { id } = useParams()
    const [ticket, setTicket] = useState(null)
    const [errors, setErrors] = useState(null)
    const [handleDownload, setHandleDownload] = useState(false)

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

    useEffect(() => {

    }, [])
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
        <div className="page" style={{overflowX: 'hidden'}}>
            <div style={{display: 'flex', justifyContent: "space-between", flexWrap: 'wrap', position: 'relative'}}>
                <Breadcrumbs />
                <button 
                    className="btn-red" 
                    style={{marginBottom: '1rem', fontWeight: '500', letterSpacing: '3px'}}
                    onClick={() => {
                        setHandleDownload(prev => !prev)
                    }}
                >
                    <FontAwesomeIcon icon={faDownload} />
                </button>
                <div 
                    style={{
                        flexBasis: '100%', 
                        textAlign: 'right',
                        marginBottom: '1rem',
                        boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)", 
                        padding: '1rem', 
                        background: 'white',
                        width: '20%',
                        position: 'absolute',
                        right: handleDownload ? '80px' : '-700px',
                        top: '-15px',
                        transition: 'all .5s',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}
                >
                    {handleDownload && (
                        <PDFDownloadLink 
                            document={
                                <WorkOrder 
                                    codes={[id]} 
                                    location={ticket.warehouse} 
                                    id={ticket.id}
                                />
                            } 
                            fileName={`"fuel-shop-repair-order-form | ${((new Date()).toISOString()).toLocaleString('en-US')}.pdf`}
                            style={{color: 'var(--primary)'}}
                        >
                            {({ blob, url, loading, error }) =>
                                loading ? 'Loading document...' : 'Download'
                            }
                        </PDFDownloadLink>
                    )}
                    <FontAwesomeIcon icon={faX} style={{color: 'var(--primary)', cursor: 'pointer'}} onClick={() => setHandleDownload(prev => !prev)}/>
                </div>
            </div>
            <div className="module" style={{flexWrap: 'wrap'}}>
                {/*  */}
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

