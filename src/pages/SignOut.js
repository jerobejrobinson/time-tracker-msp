import supabase from "../config/supabaseClient";
export default function SignOut() {
    return (
        <button onClick={async () => {
            await supabase.auth.signOut()
        }}>
            Sign Outd
        </button>
    )
}