import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getServicesThunk } from "../../store/slices/service.slice";

const iconMapping = {
  Internet: "fas fa-wifi",
  TV: "fas fa-tv",
  Combo: "fas fa-box",
  default: "fas fa-concierge-bell",
};

const Total = () => {
  const town = useSelector((state) => state.town);
  const services = useSelector((state) => state.service);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getServicesThunk());
  }, [dispatch]);

  return (
    <div className="total">
      <div className="total__header">
        <h2>Información Total</h2>
      </div>
      <table className="total__table">
        <thead>
          <tr>
            <th>
              <i className="fas fa-info-circle"></i> Tipo
            </th>
            <th>
              <i className="fas fa-users"></i> Total
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Número de Clientes</td>
            <td>
              <b>{town.numberUsers}</b>
            </td>
          </tr>
          {services.map((service) => (
            <tr key={service.id}>
              <td>
                <i
                  className={
                    iconMapping[service.serviceName] || iconMapping.default
                  }
                ></i>{" "}
                Total de {service.serviceName}
              </td>
              <td>
                <b>{service?.numberUsers}</b>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Total;
