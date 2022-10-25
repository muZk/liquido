import React from "react";
import { formatAmount } from "../core/numbers";

export default function Assumptions({ assumptions }) {
  const { usd } = assumptions;

  const getUsdDetails = () => {
    if (usd.origin === 'SII') {
      return  <a href="https://www.sii.cl/valores_y_fechas/dolar/dolar2021.htm" target="_blank" rel="noreferrer">valor dólar hoy según SII</a>
    } else if (usd.origin === 'SBIF') {
      return <span>Valor entregado por <a href="https://www.sbif.cl" target="_blank" rel="noreferrer">CMF Bancos</a></span>
    } else {
      return 'Valor promedio del dólar durante el año 2022'
    }
  }

  return (
    <>
      <h2>Supuestos para el cálculo:</h2>
      <ul>
        <li>
          Valor Dólar: <code>{formatAmount(usd.value)}</code>{" "}
          ({getUsdDetails()})
        </li>
        <li>
          Te pagan en dólares, y te transfieren mediante{" "}
          <a href="https://transferwise.com/es/help/articles/2553074/pagando-mediante-swift" target="_blank" rel="noreferrer">transferencia bancaria internacional SWIFT</a>.
        </li>
        <li>
          Tu banco no te cobra comisión por recibir los dólares.
        </li>
        <li>
          El valor dolar que te da tu banco es el mismo que lo que dice el SII. En la práctica no es así, y
          puede pasar cualquier cosa, te puede dar más, o te puede dar menos.
        </li>
      </ul>
    </>
  );
}
