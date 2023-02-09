import { Link } from "react-router-dom"
export default function Dashboard() {
    return (
        <div className="page dashboard">
            <h1>Dashboard</h1>
            <h2>Actions</h2>
            <Link to='./add-new-user'>Add New User</Link>
            <Link to='./view-users'>View All Users</Link>
        </div>
    )
}