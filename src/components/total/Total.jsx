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
    <div className="total">
      <div className="total__header">
        <h3>Inforación</h3>
      </div>
      <table className="total__table">
        <tbody>
          <tr>
            <td>
              <td>Clientes:</td>
              <td>
                <b>{town.numberUsers}</b>
              </td>
            </td>
            {services.map((service) => (
              <td key={service.id}>
                <td>{service.serviceName}:</td>
                <td>
                  <b>{service?.numberUsers}</b>
                </td>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Total;
