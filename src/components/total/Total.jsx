import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getServicesThunk } from "../../store/slices/service.slice";

const Total = () => {
  const town = useSelector((state) => state.town);
  const services = useSelector((state) => state.service);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getServicesThunk());
  }, []);

  return (
    <div>
      <p>
        Numbero de Clientes: <b>{town.numberUsers}</b>
      </p>
      {services.map((service) => (
        <p>
          Total de {service.serviceName}: <b>{service?.numberUsers}</b>
        </p>
      ))}
    </div>
  );
};

export default Total;
