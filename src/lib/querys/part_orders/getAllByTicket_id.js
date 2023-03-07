import supabase from "../../../config/supabaseClient";
/**
 * @param {String} id - pass the ticket id here. { id } = useParams() or pass id into component
 * @param {String} setState - pass a setState function
 */
export default async function getAllByTicket_id (id, setState) {
    const { data, error } = await supabase
    .from('part_orders')
    .select()
    .eq('ticket_id', id)
    
    if(error) {
        console.log(error)
        return;
    }
    if(data) {
        setState(data)
    }
}