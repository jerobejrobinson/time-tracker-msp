import supabase from '../config/supabaseClient';
import { useState, useContext} from 'react';
import SessionContext from '../lib/session';

export default function Login() {
    const {session} = useContext(SessionContext);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const handleLogin = async (e) => {
        e.preventDefault()
        console.log(password)
        console.log(email)
        const {data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        })
        // Toast notifaction of error
        if(error) {
            console.log(error)
            return;
        }
    }
    return (
        <div className="page login" style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
            <form onSubmit={async (e) => handleLogin(e)}  style={{
                boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)", 
                padding: '1rem', 
                background: 'white',
                display: 'grid', 
                gridTemplateColumns: '1fr 1fr',
                width: '50%'
            }}>
                <h1 style={{gridColumn: '1/4', textAlign: 'center', marginBottom: '1rem'}}>Login</h1>
                <div>
                    <label htmlFor="emailInput">Email:</label>
                    <br />
                    <input type="text" htmlFor="emailInput" id="emailInput" onChange={(e) => setEmail(e.target.value)} style={{width: '90%'}}/>
                </div>
                <div>
                    <label htmlFor="passwordInput">Password:</label>
                    <br />
                    <input type="password" htmlFor="passwordInput" id="passwordInput" onChange={(e) => setPassword(e.target.value)}  style={{width: '94%'}}/>
                </div>
                <div style={{gridColumn: '1/4'}}>
                    <button type='submit' style={{width: '100%', marginTop: '1rem'}}>Login</button>
                </div>
            </form>
        </div>
    )
}