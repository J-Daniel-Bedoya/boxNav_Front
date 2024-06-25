import Start from "./pages/start/Start";
import { HashRouter, Route, Routes } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";
import Login from "./pages/login/Login";
import { useSelector } from "react-redux";
import TownInfo from "./pages/viewInfoTown/TownInfo";

function App() {
  const option = useSelector((state) => state.options);
  return (
    <div className="app">
      <HashRouter>
        <Routes>
          <Route path="/" element={<Login />} />

          <Route element={<ProtectedRoutes />}>
            <Route path="/start" element={<Start />} />
            <Route path="/start/town/:id" element={<TownInfo />} />
          </Route>
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
