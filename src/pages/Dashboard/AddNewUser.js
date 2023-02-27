import supabase from "../../config/supabaseClient";
import { useContext, useEffect, useState } from "react"
import SessionContext from "../../lib/session";

import ProtectedPage from "../../components/ProtectedPage";
import { Link } from "react-router-dom"

import Breadcrumbs from "../../components/Breadcrumbs"
export default function AddNewUser() {
    const {session} = useContext(SessionContext)
    const [ name, setName ] = useState('');
    const [ user, setUser] = useState(null);
    const [ fetchErrors, setFetchErrors ] = useState(null);

    const handleAddUser = async (e) => {
        e.preventDefault()
        const { data, error } = await supabase
            .from('users')
            .insert([{name}])
            .select()
        
        if(error) {
            console.log(error)
            setUser(null)
            setFetchErrors(error)
            return;
        }

        if(data) {
            console.log(data)
            setUser(data);
            setFetchErrors(null)
            return;
        }
    }
    if(!session) {
        return (
            <ProtectedPage />
        )
    }
    if(session && session.user.user_metadata.authLevel !== process.env.REACT_APP_MSP_LEVEL_ONE) {
        return (
            <ProtectedPage loggedIn={true} />
        )
    }
    return (
        <div className="page addNewUser">
            <Breadcrumbs />
            <h2>Create New Tech</h2>
            <form style={{
                boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)", 
                padding: '1rem', 
                background: 'white', 
                marginBottom: '1rem', 
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr 1fr'
            }}>
                <label htmlFor="userName">Enter Full Name: </label>
                <input type="text" name="userName" id="username" onChange={(e) => setName(e.target.value)} style={{gridColumn: '1/2'}}/>
                <button onClick={handleAddUser} style={{gridColumn: '1/2' , marginTop: '.5rem'}}>Add User</button>
            </form>
            {fetchErrors && ( <div className="fetchErrors">{fetchErrors.message}</div>)}
            {user && user.map((user) => (
                <div className="card users" key={user.id} style={{boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)", padding: '1rem', background: 'white', marginBottom: '1rem'}}>
                    <h3>{user.name}</h3>
                    <Link to={`/dashboard/view-techs/${user.id}`}>go to tech page and print new badge</Link>
                </div>
            ))}
        </div>
    )
}