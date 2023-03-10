import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navigation from "./components/Navigation"
import SessionProvider from "./lib/session/Provider"

// pages
import Home from "./pages/Home"
import StartTask from "./pages/StartTask"
import Dashboard from "./pages/Dashboard"
import AddNewUser from "./pages/Dashboard/AddNewUser"
import ViewUsers from "./pages/Dashboard/ViewUsers"
import UserPage from "./pages/Dashboard/ViewUsers/UserPage"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import CreateTicket from "./pages/Dashboard/CreateTicket"
import ViewTickets from "./pages/Dashboard/ViewTickets"
import TicketPage from "./pages/Dashboard/ViewTickets/TicketPage"
import { CookiesProvider } from "react-cookie"

function App() {
  return (
    <CookiesProvider>
      <BrowserRouter>
        <SessionProvider>
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/start-task" element={<StartTask />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/add-new-tech" element={<AddNewUser />} />
            <Route path="/dashboard/view-techs" element={<ViewUsers />} />
            <Route path="/dashboard/view-techs/:id" element={<UserPage />} />
            <Route path="/dashboard/new-tickets" element={<CreateTicket />} />
            <Route path="/dashboard/view-tickets" element={<ViewTickets />} />
            <Route path="/dashboard/view-tickets/:id" element={<TicketPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </SessionProvider>
      </BrowserRouter>
    </CookiesProvider>
  );
}

export default App;
