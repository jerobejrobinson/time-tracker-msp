import { BrowserRouter, Routes, Route, Link } from "react-router-dom"

// pages
import Home from "./pages/Home"
import Create from "./pages/Create"
import Update from "./pages/Update"
import Dashboard from "./pages/Dashboard"
import AddNewUser from "./pages/Dashboard/AddNewUser"
import ViewUsers from "./pages/Dashboard/ViewUsers"
import UserPage from "./pages/Dashboard/ViewUsers/UserPage"

function App() {
  return (
    <BrowserRouter>
      <nav>
        <h1>MSP Time Tracker</h1>
        <Link to="/">Home</Link>
        <Link to="/create">Create Task</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/:id" element={<Update />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/add-new-user" element={<AddNewUser />} />
        <Route path="/dashboard/view-users" element={<ViewUsers />} />
        <Route path="/dashboard/view-users/:id" element={<UserPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
