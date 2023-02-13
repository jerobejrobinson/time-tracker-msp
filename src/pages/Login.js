import supabase from '../config/supabaseClient';
import { useState, useContext} from 'react';
import { Navigate } from 'react-router-dom';
import SessionContext from '../lib/session';

export default function Login() {
    const session = useContext(SessionContext);
    const [ localSession, setLocalSession ] = useState(null)
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
        <div className="page login">
            <form onSubmit={async (e) => handleLogin(e)}>
                <div>
                    <label htmlFor="emailInput">Email:</label>
                    <input type="text" htmlFor="emailInput" id="emailInput" onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="passwordInput">Password:</label>
                    <input type="password" htmlFor="passwordInput" id="passwordInput" onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div>
                    <button type='submit'>Login</button>
                </div>
            </form>
        </div>
    )
}