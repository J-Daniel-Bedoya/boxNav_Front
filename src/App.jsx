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
import { useSelector } from "react-redux";

function App() {
  const option = useSelector((state) => state.options);
  return (
    <div className="app">
      <HashRouter>
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/login" element={<Login />} />

          <Route element={<ProtectedRoutes />}>
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/town" element={<NewTown option={option} />} />
            <Route
              path="/admin/sector"
              element={<NewSector option={option} />}
            />
            <Route path="/admin/box" element={<NewBox option={option} />} />
            <Route path="/admin/user" element={<NewUser option={option} />} />
            <Route
              path="/admin/portBad"
              element={<NewPort option={option} />}
            />
          </Route>
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
