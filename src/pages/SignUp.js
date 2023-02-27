import supabase from "../config/supabaseClient";
import { useState } from 'react';

export default function SignUp() {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [passwordVerify, setPasswordVerify] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { data, error} = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    authLevel: "mspTech" 
                }
            }
        })

        if(error) {
            console.log(error.message)
            return;
        }
        if(data) {
            console.log(data);
            return;
        }
    }

    return (
        <div className="page signUp" style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
            <form onSubmit={(e) => handleSubmit(e)}  style={{
                boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)", 
                padding: '1rem', 
                background: 'white',
                display: 'grid', 
                gridTemplateColumns: '1fr 1fr 1fr',
                width: '50%'
            }}>   
                <label htmlFor="emailSignUp">Enter Email: </label>
                <input type="email" htmlFor="emailSignUp" id="emailSignUp" onChange={(e) => setEmail(e.target.value)} style={{gridColumn: `2/4`}} />
                <label htmlFor="passwordSignUp">Enter password: </label>
                <input type="password" htmlFor="passwordSignUp" id="passwordSignUp" onChange={(e) => setPassword(e.target.value)} style={{gridColumn: `2/4`}}/>
                <label htmlFor="passwordVerifySignUp">Enter Password Again: </label>
                <input type="password" htmlFor="passwordVerifySignUp" id="passwordVerifySignUp" onChange={(e) => setPasswordVerify(e.target.value)} style={{gridColumn: `2/4`}}/>
                <button type="submit" style={{gridColumn: `1/4`, marginTop: '1rem'}}>Sign Up</button>
            </form>
        </div>
    )
}