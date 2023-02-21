import './TaskCard.css'
export default function TaskCard({task, key, alt}) {



    if(!alt) return (
        <div key={key} className="taskCard">
            <p>Start Time: {new Date(task.started).toLocaleString()}</p>
            <p>End Time: {new Date(task.ended).toLocaleString()}</p>
            <p>Labor Time: {new Date(task.working_time * 1000).toISOString().substring(19, 11)}</p>
            <p>Time Spent Paused: {new Date(task.paused_time * 1000).toISOString().substring(19, 11)}</p>
            <p>PO Number: {task.tickets.number}</p>
            <p>Part Number: {task.tickets.part_number}</p>
            <p>Task Type: {task.task_types.type}</p>
        </div>
    )

    return (
        <div key={key} className="taskCardAlt">
            <p id="taskCardAltUsername">Tech: {task.users.name}</p>
            <p>Start Time: <br /> {new Date(task.started).toLocaleString()}</p>
            <p>End Time:  <br /> {new Date(task.ended).toLocaleString()}</p>
            <p>Labor Time:  <br /> {new Date(task.working_time * 1000).toISOString().substring(19, 11)}</p>
            <p>Time Spent Paused:  <br /> {new Date(task.paused_time * 1000).toISOString().substring(19, 11)}</p>
            <p>Task Type:  <br /> {task.task_types.type}</p>
        </div>
    )
}