export default function TaskCard({task, key}) {
    return (
        <div key={key} className="taskCard">
            <p>Start Time: </p>{new Date(task.started).toLocaleString()}
            <p>End Time: </p>{new Date(task.ended).toLocaleString()}
            <p>Labor Time: </p>{new Date(task.working_time * 1000).toISOString().substring(19, 11)}
            <p>Time Spent Paused: </p>{new Date(task.paused_time * 1000).toISOString().substring(19, 11)}
            <p>PO Number: </p>{task.tickets.number}
            <p>Part Number: </p>{task.tickets.part_number}
            <p>Task Type: </p>{task.task_types.type}
        </div>
    )
}