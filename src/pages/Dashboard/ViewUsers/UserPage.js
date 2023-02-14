// import supabase from "../../../config/supabaseClient";
// import { useState, useEffect } from 'react';
import { useParams, Link } from "react-router-dom";
import useFetchUserById from "../../../hooks/useFetchUserById";
import { useEffect, useState } from "react";
import supabase from "../../../config/supabaseClient";
import TaskCard from "../../../components/TaskCard";
import Breadcrumbs from "../../../components/Breadcrumbs";
export default function UserPage() {
    const {id} = useParams()
    const { data } = useFetchUserById(id);
    const [tasks, setTasks] = useState(null)

    useEffect(() => {
        const getUserTasks = async () => {
            const { data, errors } = await supabase.from('tasks').select(`
                working_time,
                paused_time,
                is_complete,
                started,
                ended,
                tickets (
                    number,
                    part_number
                ),
                task_types (
                    type
                )
            `).eq('user_id', id)
            if(errors) {
                console.log('Errors getting user tasks', errors)
                return;
            }
            if(data) {
                console.log(data)
                setTasks(data)
                return;
            }
        }
        getUserTasks()
    }, [id])
    return (
        <div className="page userPage">
            <Breadcrumbs />
            <Link to="./../">{`<- Go Back`}</Link>
            {data && (
                <h3>{data.name}</h3>
            )}
            {tasks && (
                <>
                    <h3>Tasks</h3>
                    {tasks.map((task) => (
                        <TaskCard task={task} key={task.id}/>
                    ))}
                </>
            )}
        </div>
    )
}