import Start from "./pages/start/Start";
import { HashRouter, Route, Routes } from "react-router-dom";
import Admin from "./pages/admin/Admin";
import ProtectedRoutes from "./ProtectedRoutes";
import Login from "./pages/login/Login";

function App() {
  return (
    <div className="app">
      <HashRouter>
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/login" element={<Login />} />

          <Route element={<ProtectedRoutes />}>
            <Route path="/admin" element={<Admin />} />
          </Route>
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
