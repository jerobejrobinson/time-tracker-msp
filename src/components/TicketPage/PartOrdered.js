import { useState, useEffect } from "react"
import { json, useParams } from "react-router-dom"
import supabase from "../../config/supabaseClient"
import deletePartOrderByid from "../../lib/querys/part_orders/deletePartOrderById"
import getAllByTicket_id from "../../lib/querys/part_orders/getAllByTicket_id"
import { useCookies } from 'react-cookie'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash, faPlusCircle } from "@fortawesome/free-solid-svg-icons"

export default function PartsOrdered() {
    const [cookies, setCookie] = useCookies(['access_token', 'refresh_token'])
    const {id} = useParams()
    const [partsOrdered, setPartsOrdered] = useState(null)

    useEffect(() => {
        getAllByTicket_id(id, setPartsOrdered)
    }, [id])

    const handleAddParts = async (e) => {
        e.preventDefault()
        const part_number = document.getElementById('poNumber').value
        const quanity = document.getElementById('poQty').value
        const description = document.getElementById('poDesc').value

        if(!part_number || !quanity ) return;
        const { response } = await fetch('http://localhost:5000/api/getproductpricing?' + new URLSearchParams({
            product: part_number,
            quantity: quanity
        }), {
            method: 'GET',
            headers: {
                "Authorization": "Bearer " + cookies.access_token
            }
        }).then(res => res.json()).then(data => data)
        console.log(response)
        if(response?.basePrice === 0) return;
        const amount = Math.floor(response?.price * response?.stockingQuantityOrdered)

        const { data, error } = await supabase.from('part_orders').insert([{ ticket_id: id, quanity, part_number, amount, description  }]).select()
        if(error) {
            console.log(error)
            return
        }
        if(data) {
            getAllByTicket_id(id, setPartsOrdered)
            document.getElementById('poNumber').value = ""
            document.getElementById('poQty').value = ""
            document.getElementById('poDesc').value =" "
        }
    }
    
    const handleDeleteParts = async (part_id) => {
        const { data, error } = await deletePartOrderByid(part_id)
        if(error) {
            console.log(error)
            return;
        }
        if(data) {
            getAllByTicket_id(id, setPartsOrdered)
            return;
        }
    }
    return (
        <div style={{width: '100%'}}>
            <p>Add Parts</p>
            <div id="add-parts"  style={{display: 'grid', gridTemplateColumns: '1fr 2fr 4fr 1fr 1fr',boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)", padding: '1rem', background: 'white'}}>
                <label htmlFor="poQty">Quanity: </label>
                <label htmlFor="poNumber">Part Number: </label>
                <label htmlFor="poDesc">Description: </label>
                <p></p>
                <p></p>
                <input type="text" name="poQty" id="poQty"/>
                <input type="text" name="poNumber" id="poNumber" />
                <input type="text" name="poDesc" id="poDesc" />
                <p></p>
                <p onClick={handleAddParts} style={{cursor: 'pointer', color: 'var(--primary)', textAlign: 'center'}}><FontAwesomeIcon icon={faPlusCircle} /></p>
            </div>
            <p>Parts Ordered</p>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 2fr 4fr 1fr 1fr', boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)", padding: '1rem', background: 'white', fontWeight: 700}} >
                <p>Quanity</p>
                <p>Part Number</p>
                <p>Description</p>
                <p>Amount</p>
            </div>
            <div className="partsOrderedContainer">
                {partsOrdered && partsOrdered.map(part => (
                    <div key={part.id} style={{display: 'grid', gridTemplateColumns: '1fr 2fr 4fr 1fr 1fr',  boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)", padding: '1rem', background: 'white'}} >
                        <p>{part.quanity}</p>
                        <p>{part.part_number}</p>
                        <p>{part.description}</p>
                        <p>${part.amount}</p>
                        <p style={{color: 'var(--primary)', textAlign: 'center', cursor: 'pointer'}} onClick={() => handleDeleteParts(part.id)}><FontAwesomeIcon icon={faTrash} /></p>
                    </div>
                ))}
            </div>
        </div>
    )
}