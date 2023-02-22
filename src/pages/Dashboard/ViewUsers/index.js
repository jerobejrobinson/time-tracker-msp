import supabase from "../../../config/supabaseClient";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import Breadcrumbs from "../../../components/Breadcrumbs";

import './styles.css'

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
            <Breadcrumbs />
            <h2>All Users</h2>
            {fetchErrors && ( <div className="fetchErrors">{fetchErrors.message}</div>)}
            {users && users.map((user) => (
                <div className="card users" key={user.id} style={{
                    boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)", 
                    padding: '1rem', 
                    background: 'white', 
                    marginBottom: '1rem',
                    display: 'grid',
                    gridTemplateColumns: '8fr 2fr',
                    width: '33%'
                }}>
                    <h3>{user.name}</h3>
                    <Link to={`./${user.id}`} style={{color: 'var(--primary)', textAlign: 'right'}}><FontAwesomeIcon icon={faRightToBracket} /></Link>
                </div>
            ))}
        </div>
    )
}