import supabase from "../../../config/supabaseClient";
/**
 * Returns a Object containing data and error as keys. Data should be an array containing one object.
 * @param {String} part_id - pass the id from the part_ordered table.
 */
export default async function deletePartOrderByid (part_id) {
    const { data, error } = await supabase
    .from('part_orders')
    .delete()
    .eq('id', part_id)
    .select()

    if(error) {
        return {error, data: null};
    }
    if(data) {
        console.log('delete', data)
        return {data, error: null};
    }
}