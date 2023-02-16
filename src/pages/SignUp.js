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
        <div className="page signUp">
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label htmlFor="emailSignUp">Email: </label>
                    <input type="email" htmlFor="emailSignUp" id="emailSignUp" onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="passwordSignUp">password: </label>
                    <input type="password" htmlFor="passwordSignUp" id="passwordSignUp" onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="passwordVerifySignUp">password: </label>
                    <input type="password" htmlFor="passwordVerifySignUp" id="passwordVerifySignUp" onChange={(e) => setPasswordVerify(e.target.value)}/>
                </div>
                <div>
                    <button type="submit">Create Login</button>
                </div>
            </form>
        </div>
    )
}