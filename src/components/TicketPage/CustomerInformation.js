import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import supabase from "../../config/supabaseClient"
import states from "../../lib/harddata/usaStatesArray"

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

    const handleAddCustomer = async (e) => {
        e.preventDefault()
        const [name, phone, address, city, state, zip, cell, csd_account_number] = e.target
        console.log(name)
        const {data: customer, error} = await supabase.from('customers').insert({
            name: name.value,
            phone: phone.value,
            address: address.value,
            city: city.value,
            state: state.value,
            zip: zip.value,
            cell: cell.value,
            csd_account_number: csd_account_number.value
        }).select().single()

        if(error) {
            console.log(error.message)
            return;
        }

        if(customer) {
            const { data: res, error } = await supabase
                .from('tickets')
                .update({customer_id: customer.id})
                .eq('id', id)
                .select(`
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
                `)
                .single()
            
            if(error) {
                console.log(error.message)
                return;
            }
            if(res) {
                setCustomer(res.customers)
                return;
            } 
        }
    }

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
        <form id="customer-information-form" style={{boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)", padding: '1rem', background: 'white'}} onSubmit={handleAddCustomer}>
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
                    {states.map((state, index) => <option key={`${state[0]}${index}`} value={state[1]}>{state[0]}</option>) }
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
            <button type="submit">
                Add Customer To Ticket
            </button>
        </form>
    )
}