import supabase from "../../config/supabaseClient"

export default function ScanInput({displayName, htmlForNameID, setParent, table}) {
    const getData = async (value) => {
        const {data, errors} = await supabase.from(table).select().eq('id', value).single()
        if(errors) {
            console.log('errors',errors)
            return;
        }
        if(data) {
            setParent(data)
            return;
        }
    }

    return (
        <div className="timer ScanInput">
            <form>
                <label htmlFor={htmlForNameID}>{displayName}</label>
                <input htmlFor={htmlForNameID} name={htmlForNameID} id={htmlForNameID} onChange={(e) => getData(e.target.value)}/>
            </form>
        </div>
    )
}