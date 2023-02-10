import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import SessionProvider from "./lib/session/Provider"

// pages
import Home from "./pages/Home"
import Create from "./pages/Create"
import Update from "./pages/Update"
import Dashboard from "./pages/Dashboard"
import AddNewUser from "./pages/Dashboard/AddNewUser"
import ViewUsers from "./pages/Dashboard/ViewUsers"
import UserPage from "./pages/Dashboard/ViewUsers/UserPage"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import SignOut from "./pages/SignOut"
function App() {
  return (
    <BrowserRouter>
      <SessionProvider>
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
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signout" element={<SignOut />} />
        </Routes>
      </SessionProvider>
    </BrowserRouter>
  );
}

export default App;
