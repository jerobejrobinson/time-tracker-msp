import './styles.css'
export default function RealtimeTaskCards({tasks, realtime}) {
    return (
        <div className='realtimeContainer'>
            {tasks && tasks.map(task => (
                <div key={task.id} className="liveTaskCard">
                    <h4>{task.users.name}</h4>
                    {realtime && realtime[task.id] && realtime[task.id].working_time >= 0 && realtime[task.id].paused_time >= 0 && (
                        <>
                            <p>Working Time: {new Date(realtime[task.id].working_time * 1000).toISOString().substring(19, 11)}</p>
                            <p>Paused Time: {new Date(realtime[task.id].paused_time * 1000).toISOString().substring(19, 11)}</p>
                        </>
                    )}
                    <p>Ticket Number: {task.tickets.number}</p>
                    <p>Part Number: {task.tickets.part_number}</p>
                    <p>Task Type: {task.task_types.type}</p>
                </div>
            ))}
        </div>
    )
}