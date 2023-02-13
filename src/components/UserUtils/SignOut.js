import supabase from "../../config/supabaseClient"

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