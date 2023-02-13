import supabase from '../config/supabaseClient';
import { useState, useContext} from 'react';
import { Navigate } from 'react-router-dom';
import SessionContext from '../lib/session';

export default function Login() {
    const session = useContext(SessionContext)
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    // console.log(session)
    const handleLogin = async (e) => {
        e.preventDefault()
        console.log(password)
        console.log(email)
        const {data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        })
        if(error) {
            return {data: null, error: error.message}
        }
        if(data) {
            return {data: data, error: null}
        }
    }
    console.log(session)
    if(session && session.data.session && session.data.session.user.user_metadata.authLevel === process.env.REACT_APP_MSP_LEVEL ) {
        return (
            <Navigate to="/" />
        )
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