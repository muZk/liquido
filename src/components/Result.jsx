import React from "react";
import { formatAmount } from "../core/numbers";
import { getTakeHomeSalary, getTakeHomeSalaryPartial } from "../core/calculator";
import Details from './Details';

export default function Result({ income, usd }) {
  const takeHome = getTakeHomeSalary(income, usd);
  const takeHomePartial = getTakeHomeSalaryPartial(income, usd);
  return (
    <>
      <div className="light">
        <section className="result">
          Tu sueldo líquido REAL* es ~<strong>${formatAmount(takeHome.value)} CLP</strong>
          <hr/>
          <small>
            ~<strong>${formatAmount(takeHomePartial.value)} CLP</strong> si eliges una cotización parcial.
          </small>
        </section>
        <div className="text-center">
          <small>*: considerando las cotizaciones (AFP, Salud) e impuestos.</small>
        </div>
      </div>
      <Details
        takeHome={takeHome}
        takeHomePartial={takeHomePartial}
      />
    </>
  );
}
