import { Link } from "react-router-dom"
export default function ProtectedPage({loggedIn}) {
  if(loggedIn) {
    return (
      <div className="page protected">
        <p>This page has restricted access.</p>
      </div>
    )
  }
  return (
      <div className="page protected">
        <p>This page is protected. Login to continue.</p>
        <Link to="/login">Login Page</Link>
      </div>
    )
}