import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getServicesThunk } from "../../store/slices/service.slice";

const Total = () => {
  const town = useSelector((state) => state.town);
  const services = useSelector((state) => state.service);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getServicesThunk());
  }, [dispatch]);

  return (
    <div className="card-total">
      <div className="card-total__header">
        <h3>Información</h3>
      </div>
      <div className="card-total__content">
        <div className="card-total__content--info-item">
          <span className="info-label">Clientes:</span>
          <span className="info-value">
            <b>{town.numberUsers}</b>
          </span>
        </div>
        {services?.map((service) => (
          <div className="card-total__content--info-item" key={service.id}>
            <span className="info-label">{service.serviceName}:</span>
            <span className="info-value">
              <b>{service.numberUsers}</b>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Total;
