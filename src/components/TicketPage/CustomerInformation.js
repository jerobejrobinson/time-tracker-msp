import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import supabase from "../../config/supabaseClient"

export default function CustomerInformation() {
    const { id } = useParams()
    const [customer, setCustomer] = useState(null)

    useEffect(() => {
        const getData = async () => {
            const { data: customer, errors } = await supabase.from('tickets').select(`
                customers (
                    name,
                    address,
                    phone,
                    city,
                    state,
                    zip,
                    cell,
                    csd_account_number
                )
            `).eq('id', id).single();

            if(errors) {
                console.log(errors.message)
                return
            }
            if(customer) {
                console.log(customer)
                setCustomer(customer.customers)
                return
            }
        }
        getData()
    }, [])
    if(customer) return (
        <div style={{boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)", padding: '1rem', background: 'white', width: '100%'}}>
            <p>Name: {customer.name}</p>
            <p>Phone: {customer.phone}</p>
            <p>Cell: {customer.cell}</p>
            <p>Address: {customer.address}</p>
            <p>City: {customer.city}</p>
            <p>State: {customer.state}</p>
            <p>Zip: {customer.zip}</p>
        </div>
    )
    return (
        <div id="customer-information-form" style={{boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)", padding: '1rem', background: 'white'}}>
            <div id="cNameContainer">
                <label htmlFor="cName">Name: </label><br />
                <input type="text" name="cName" id="cName" />
            </div>
            <div id="cPhoneContainer">
                <label htmlFor="cPhone">Phone: </label><br />
                <input type="text" name="cPhone" id="cPhone" />
            </div>
            <div id="cAddressContainer">
                <label htmlFor="cAddress">Address: </label><br />
                <input type="text" name="cAddress" id="cAddress" />
            </div>
            <div id="cCityContainer">
                <label htmlFor="cCity">City: </label><br />
                <input type="text" name="cCity" id="cCity"/>
            </div>
            <div id="cStateContainer">
                <label htmlFor="cState">State: </label><br />
                <select name="cState" id="cState">
                    <option value="MS">Mississippii</option>
                    <option value="TN">Tennessee</option>
                </select>
            </div>
            <div id="cZipContainer">
                <label htmlFor="cZip">Zip: </label><br />
                <input type="number" name="cZip" id="cZip" />
            </div>
            <div id="cCellContainer">
                <label htmlFor="cCell">Cell: </label><br />
                <input type="text" name="cCell" id="cCell" />
            </div>
            <div id="cCsdContainer">
                <label htmlFor="cCsd">CSD Account Number: </label><br />
                <input type="text" name="cCsd" id="cCsd" />
            </div>
            <button>
                Add Customer To Ticket
            </button>
        </div>
    )
}