import Start from "./pages/start/Start";
import { HashRouter, Route, Routes } from "react-router-dom";
import Admin from "./pages/admin/Admin";
import ProtectedRoutes from "./ProtectedRoutes";
import Login from "./pages/login/Login";
import NewBox from "./components/adminC/NewBox";
import NewTown from "./components/adminC/NewTown";
import NewSector from "./components/adminC/NewSector";
import NewUser from "./components/adminC/NewUser";
import NewPort from "./components/adminC/NewPort";

function App() {
  return (
    <div className="app">
      <HashRouter>
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/login" element={<Login />} />

          <Route element={<ProtectedRoutes />}>
            <Route path="/admin" element={<Admin />} />
            <Route path="/town" element={<NewTown />} />
            <Route path="/sector" element={<NewSector />} />
            <Route path="/box" element={<NewBox />} />
            <Route path="/user" element={<NewUser />} />
            <Route path="/portBad" element={<NewPort />} />
          </Route>
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
