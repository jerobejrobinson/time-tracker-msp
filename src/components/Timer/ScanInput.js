import supabase from "../../config/supabaseClient"
import { useEffect, useState} from 'react'
export default function ScanInput({displayName, htmlForNameID, setParent, table}) {
    const [localState, setLocalState] = useState(null)

    useEffect(() => {
        const getData = async () => {
            const {data, errors} = await supabase.from(table).select().eq('id', localState).single()
            if(errors) {
                console.log(errors)
                return;
            }
            if(data) {
                setParent(data)
                return;
            }
        }
        getData()
    }, [localState, setParent, table])
    return (
        <div className="timer ScanInput">
            <form>
                <label htmlFor={htmlForNameID}>{displayName}</label>
                <input htmlFor={htmlForNameID} name={htmlForNameID} id={htmlForNameID} onChange={(e) => setLocalState(e.target.value)}/>
            </form>
        </div>
    )
}