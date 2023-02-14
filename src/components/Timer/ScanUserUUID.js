import supabase from "../../config/supabaseClient"
import { useEffect, useState} from 'react'
export default function ScanUserUUID({setUserUUID}) {
    const [localState, setLocalState] = useState(null)

    useEffect(() => {
        const getUserUUID = async () => {
            const {data, errors} = await supabase.from('users').select().eq('id', localState).single()
            if(errors) {
                console.log(errors)
                return;
            }
            if(data) {
                setUserUUID(data)
                return;
            }
        }
        getUserUUID()
    }, [localState, setUserUUID])
    return (
        <div className="timer ScanUserUUID">
            <form>
                <label htmlFor="scanUserUUID">Scan User Id:</label>
                <input htmlFor="scanUserUUID" name="scanUserUUID" id="scanUserUUID" onChange={(e) => setLocalState(e.target.value)}/>
            </form>
        </div>
    )
}