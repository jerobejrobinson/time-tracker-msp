import supabase from "../../config/supabaseClient"
import './styles.css'
export default function SignOut() {
    const signOut = async () => {
        await supabase.auth.signOut()
    }
    return (
        <button onClick={signOut}>
            Sign Out
        </button>
    )
}