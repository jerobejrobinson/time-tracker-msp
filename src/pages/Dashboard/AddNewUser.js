import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import Breadcrumbs from "../../components/Breadcrumbs"
import supabase from "../../config/supabaseClient";
export default function AddNewUser() {
    const [ name, setName ] = useState('');
    const [ user, setUser] = useState(null);
    const [ fetchErrors, setFetchErrors ] = useState(null);

    const handleAddUser = async (e) => {
        e.preventDefault()
        console.log('test')
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

    return (
        <div className="page addNewUser">
            <Breadcrumbs />
            <h2>Create New User</h2>
            <form>
                <label htmlFor="userName">Full Name: </label>
                <input type="text" name="userName" id="username" onChange={(e) => setName(e.target.value)}/>
                <button onClick={handleAddUser}>Add User</button>
            </form>
            {fetchErrors && ( <div className="fetchErrors">{fetchErrors.message}</div>)}
            {user && user.map((user) => (
                <div className="card users" key={user.id}>
                    <h3>{user.name}</h3>
                    <Link to={`/dashboard/view-users/${user.id}`}>go to user page</Link>
                </div>
            ))}
        </div>
    )
}