import supabase from "../../../config/supabaseClient";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function ViewUsers() {
    const [users, setUsers] = useState(null);
    const [ fetchErrors, setFetchErrors] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            const { data, errors } = await supabase.from('users').select();
            if(errors) {
                setFetchErrors(errors)
                setUsers(null)
                return;
            }

            if(data) {
                setFetchErrors(null);
                setUsers(data);
                return;
            }
        }

        fetchUsers()
    }, [])
    return (
        <div className="page viewUsers">
            <h2>All Users</h2>
            {fetchErrors && ( <div className="fetchErrors">{fetchErrors.message}</div>)}
            {users && users.map((user) => (
                <div className="card users" key={user.id}>
                    <h3>{user.name}</h3>
                    <Link to={`./${user.id}`}>go to user page</Link>
                </div>
            ))}
        </div>
    )
}