import supabase from '../../config/supabaseClient';
import { useEffect, useState } from 'react';
import { Document, Page, Image, Text} from '@react-pdf/renderer';

// Create Document Component
/**
 * 
 * @param {Array} codes An array of strings that will be used in a map function to generate barcodes.
 * @param {String} location A string that will retrieve the proper location image values accepted (300, 301, 302).
 * @returns 
 */
const WorkOrder = ({codes, location, id}) => {
    const [ customer, setCustomer ] = useState(null)
    const [ partNumber, setPartNumber ] = useState(null)

    useEffect(() => {
        const getData = async () => {
            const { data: {customers, part_number}, errors } = await supabase.from('tickets').select(`
                part_number,
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
            
            if(customers) {
                setCustomer({...customers})
            }
            if(part_number) {
                setPartNumber(part_number)
            }
            
        }
        getData()
    }, [])

    return (
        <Document>
            {codes.map(code => (
                <Page size={{width: 1275, height: 1650}} key={code}>
                    <Image src="/template.jpg" />
                    <Image src={"/" + location + ".png"} style={{width: '175px', height: '85px', top: '22px', left: '86px', position: 'absolute'}}/>
                    <Image src={`http://bwipjs-api.metafloor.com/?bcid=code128&text=${code}&parsefnc&alttext=${code}`} style={{width: '128px', height: '113px', top: '17px', left: '1015px', position: 'absolute'}}/>
                    {customer && (
                        <>
                            <Text style={{position: 'absolute', top: '198px', left: '131px', fontSize: '20px'}}>
                                {customer.name}
                            </Text>
                            <Text style={{position: 'absolute', top: '198px', left: '644px', fontSize: '20px'}}>
                                {customer.csd_account_number}
                            </Text>
                            <Text style={{position: 'absolute', top: '230px', left: '160px', fontSize: '20px'}}>
                                {customer.address}
                            </Text>
                            <Text style={{position: 'absolute', top: '230px', left: '625px', fontSize: '20px'}}>
                                {customer.city} {customer.state} {customer.zip}
                            </Text>
                            <Text style={{position: 'absolute', top: '269px', left: '141px', fontSize: '20px'}}>
                                {customer.phone}
                            </Text>
                            <Text style={{position: 'absolute', top: '269px', left: '565px', fontSize: '20px'}}>
                                {customer.cell}
                            </Text>
                        </>
                    )}
                    {partNumber && (
                        <>
                            <Text style={{position: 'absolute', top: '270px', left: '977px', fontSize: '20px'}}>
                                {partNumber}
                            </Text>
                        </>
                    )}
                </Page>
            ))} 
        </Document>
    )
}

export default WorkOrder