import supabase from "../../config/supabaseClient"
import { useRef, useEffect, useState } from "react"
import './styles.css'

export default function ScanInput({displayName, htmlForNameID, setParent, table}) {
    const input = useRef(null)
    const [enterPartNumber, setEnterPartNumber] = useState(false)
    const [partNumber, setPartNumber] = useState(null)
    const [ticketId, setTicketId] = useState(null)

    const getData = async (value) => {
        const {data, errors} = await supabase.from(table).select().eq('id', value).single()
        if(errors) {
            console.log('errors',errors)
            return;
        }
        if(data) {
            if(table === 'tickets') {
                if(!data.part_number) {
                    console.log(data)
                    setTicketId(data.id)
                    setEnterPartNumber(true)
                    return;
                } else {
                    setParent(data)
                    return;
                }
            } else {
                setParent(data)
                return;
            }
        }
    }
    const handleAddPartNumber = async (e, value) => {
        e.preventDefault()
        const {data, errors} = await supabase.from(table).update({part_number: partNumber}).eq('id', ticketId).select().single()
        if(errors) {
            console.log('errors',errors)
            return;
        }
        if(data) {
            setParent(data)
            return;
        }
    }
    
    useEffect(() => {
        if(input.current) {
          input.current.focus()
        }
    }, [])
    return (
        <div className="timer ScanInput">
            <form>
                <label htmlFor={htmlForNameID}>{displayName}</label>
                <input htmlFor={htmlForNameID} name={htmlForNameID} id={htmlForNameID} onChange={(e) => getData(e.target.value)} ref={input}/>
            </form>
            {enterPartNumber && ticketId && (
                <div >
                    <label htmlFor="partNumber">Add part number to ticket </label>
                    <input type="text" name="partNumber" id="partNumber" onChange={(e) => setPartNumber(e.target.value)}/>
                    <button type="button" onClick={handleAddPartNumber}>save part number</button>
                </div>
            )}
        </div>
    )
}