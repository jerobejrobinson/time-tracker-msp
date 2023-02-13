// import supabase from "../../../config/supabaseClient";
// import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import useFetchUserById from "../../../hooks/useFetchUserById";

export default function UserPage() {
    const {id} = useParams()
    const {data, error} = useFetchUserById(id);

    return (
        <div className="page userPage">
            {data && (
                <h3>{data.id} - {data.name}</h3>
            )}
        </div>
    )
}