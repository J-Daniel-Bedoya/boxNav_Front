import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getTownThunk } from "../../store/slices/town.slice";
import MenuTown from "../../components/startC/MenuTown";
import CardBox from "./CardBox";

const TownInfo = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [view, setView] = useState(false);

  const town = useSelector((state) => state.town.boxes);

  const sortedTown = Array.isArray(town)
    ? town.slice().sort((a, b) => {
        if (a.numberBox !== undefined && b.numberBox !== undefined) {
          return a.numberBox - b.numberBox;
        }
        return 0;
      })
    : [];
  useEffect(() => {
    dispatch(getTownThunk(id));
  }, [id, dispatch]);

  return (
    <div className="townInfo">
      <header className="townInfo__header">
        <nav>
          <div className="logo"></div>
          {/* Mostrar el icono de hamburguesa solo en dispositivos pequeños */}
          <div className="menu">
            <div onClick={() => setView(!view)}>
              <i className="fa-solid fa-bars"></i>
            </div>
          </div>
          {/* Mostrar la lista de navegación en dispositivos medianos y grandes */}
          <ul className="navList">
            <li>
              <button>Ver por Cajas</button>
            </li>
            <li>
              <button>Ver por Usuarios</button>
            </li>
            <li>
              <button>Ver por Sectores</button>
            </li>
          </ul>
        </nav>
      </header>
      {view && <MenuTown view={view} setView={setView} />}
      <div className="townInfo__content">
        <h2>Cajas</h2>
        <div className="townInfo__content--tablet">
          <table>
            <thead>
              <tr>
                <th>Caja</th>
                <th>Puertos</th>
                <th>Usuarios</th>
                {/* <th>Sector</th> */}
              </tr>
            </thead>
            <tbody>
              {sortedTown?.map((box) => (
                <CardBox key={box.id} box={box} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TownInfo;
