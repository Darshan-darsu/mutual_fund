import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import Login from "./login/LoginPage";
import DashBoard from "./dashboard/Dashboard";
import Portfolio from "./portfolio/Portfolio";
import Register from "./register/registerPage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/portfolio" element={<Portfolio />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
