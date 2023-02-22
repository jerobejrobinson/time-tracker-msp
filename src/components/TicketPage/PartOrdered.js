import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import supabase from "../../config/supabaseClient"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash, faPlusCircle } from "@fortawesome/free-solid-svg-icons"

export default function PartsOrdered() {
    const {id} = useParams()
    const [partsOrdered, setPartsOrdered] = useState(null)

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        const { data, error } = await supabase.from('part_orders').select().eq('ticket_id', id)
        if(error) {
            console.log(error)
            return
        }
        if(data) {
            setPartsOrdered(data)
            return
        }
    }

    const handleAddParts = async (e) => {
        e.preventDefault()
        const part_number = document.getElementById('poNumber').value
        const quanity = document.getElementById('poQty').value
        const description = document.getElementById('poDesc').value
        const amount = document.getElementById('poCost').value

        if(!part_number || !quanity || !description || !amount) return;
        const { data, error } = await supabase.from('part_orders').insert([{ ticket_id: id, quanity, part_number, amount, description  }]).select()
        if(error) {
            console.log(error)
            return
        }
        if(data) {
            console.log(data)
            getData()
            document.getElementById('poNumber').value = ""
            document.getElementById('poQty').value = ""
            document.getElementById('poDesc').value = ""
            document.getElementById('poCost').value = ""
        }
    }
    
    const handleDeleteParts = async (id) => {
      
        const { data, error } = await supabase
        .from('part_orders')
        .delete()
        .eq('id', id).select()
        if(error) {
            console.log(error)
            return
        }
        if(data) {
            getData()
        }

    }
    return (
        <div style={{width: '100%'}}>
            <p>Add Parts</p>
            <div id="add-parts"  style={{display: 'grid', gridTemplateColumns: '1fr 2fr 4fr 1fr 1fr',boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)", padding: '1rem', background: 'white'}}>
                <label htmlFor="poQty">Quanity: </label>
                <label htmlFor="poNumber">Part Number: </label>
                <label htmlFor="poDesc">Description: </label>
                <label htmlFor="poCost">Amount: </label>
                <p></p>
                <input type="text" name="poQty" id="poQty"/>
                <input type="text" name="poNumber" id="poNumber" />
                <input type="text" name="poDesc" id="poDesc" />
                <input type="text" name="poCost" id="poCost" />
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