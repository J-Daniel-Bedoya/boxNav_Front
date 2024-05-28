import Start from "./pages/start/Start";
import { HashRouter, Route, Routes } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";
import Login from "./pages/login/Login";
import { useSelector } from "react-redux";
import TownInfo from "./pages/viewInfoTown/TownInfo";
// import BoxDetails from "./pages/viewInfoTown/townDetails.jsx/BoxDetails";
// import SectorDetails from "./pages/viewInfoTown/townDetails.jsx/SectorDetails";
// import UserDetails from "./pages/viewInfoTown/townDetails.jsx/UserDetails";

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
            {/* <Route path="/start/town/:id/box/:id" element={<BoxDetails />} />
            <Route
              path="/start/town/:id/user/:id"
              element={<UserDetails />}
            />
            <Route
              path="/start/town/:id/sector/:id"
              element={<SectorDetails />}
            /> */}
          </Route>
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
