import React from "react";
import { formatAmount } from "../core/numbers";
import Amount from "./Amount";
import Assumptions from "./Assumptions";
import Emoji from "./Emoji";

function Detail({ annualIncome, retention, debt, takeHome }) {
  if (debt > 0) {
    return (
      <>
        <ul>
          <li>
            La retención de las boletas (que pagas mes a mes) es <Amount danger value={retention} />
          </li>
          <li>
            Para la declaración de renta, tendrás una deuda de <Amount danger value={debt} />
          </li>
        </ul>
        <p>
          Entonces, tu sueldo líquido anual es igual a{" "}
          <code>
            {formatAmount(annualIncome)} - {formatAmount(retention)} -{" "}
            {formatAmount(debt)} = {formatAmount(12 * takeHome.value)}
          </code>
        </p>
        <p>
          Finalmente, tu sueldo líquido mensual es <Amount success value={takeHome.value} />
        </p>
      </>
    );
  }

  return (
    <>
      <ul>
        <li>
          La retención de las boletas (que pagas mes a mes) es <Amount danger value={retention} />
        </li>
        <li>
          Para la declaración de renta, tendrás saldo a favor de <Amount success value={-debt} />
        </li>
      </ul>
      <p>
        Entonces, tu sueldo líquido anual es igual a{" "}
        <code>
          {formatAmount(annualIncome)} - {formatAmount(retention)} +{" "}
          {formatAmount(-debt)} = {formatAmount(12 * takeHome.value)}
        </code>
      </p>
      <p>
        Finalmente, tu sueldo líquido mensual es <Amount success value={takeHome.value} />
      </p>
    </>
  );
}

export default function Details({ takeHome, takeHomePartial }) {
  const {
    income,
    assumptions: {
      usd,
      retencion,
      deudaModalidadParcial,
      deuda,
      sueldoAnual,
      RETENCION,
      COBERTURA_PARCIAL,
    },
  } = takeHome;

  const sueldoMensual =  Math.floor(sueldoAnual/12);

  return (
    <div className="dark">
      <section>
        <h2>
          Detalle del cálculo <Emoji value="✍️" />
        </h2>
        <p>
          Para el estado de Chile eres INDEPENDIENTE (autónomo). Eso quiere decir que mes a mes tienes que hacer
          una boleta y pagar al SII la retención del <code>{RETENCION * 100}%</code>.
        </p>
        <blockquote>
          Esta retención se usa para pagar impuestos y obligaciones legales
          tales como AFP y salud (Fonasa o Isapre) en la "operación renta".
        </blockquote>
        <p>
          En la declaración anual de renta tienes que pagar las cotizaciones 
          obligatorias de SALUD y JUBILACIÓN, cuyos montos dependen de cuánto ganas.
          Puedes ver el detalle <a href={`https://impuestos.netlify.com/?income=${sueldoMensual}`} target="_blank" rel="noreferrer">aquí</a>
        </p>
        <h3>Ahora si... el cálculo</h3>
        <p>
          Te mandan mensualmente <code>USD{formatAmount(income)}</code>, sobre esto hay que calcular el líquido.
        </p>
        <p>
          Tu <strong>ingreso bruto anual</strong> en pesos chilenos es
          <code>{formatAmount(sueldoAnual)}</code> (valor dólar = <code>{formatAmount(usd.value)}</code>)
        </p>
        <Detail
          retention={retencion}
          debt={deuda}
          annualIncome={sueldoAnual}
          takeHome={takeHome}
        />
        <h3>Modalidad parcial</h3>
        <p>
          En la modalidad parcial, cotizas por una fracción de
          tu sueldo (<code>{100 * COBERTURA_PARCIAL}%</code>).
        </p>
        <p>Con esta modalidad los números quedan así:</p>
        <Detail
          retention={retencion}
          debt={deudaModalidadParcial}
          annualIncome={sueldoAnual}
          takeHome={takeHomePartial}
        />
        <Assumptions assumptions={takeHome.assumptions} />
      </section>
    </div>
  );
}
