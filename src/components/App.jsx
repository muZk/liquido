import { useState, useEffect, Suspense, lazy } from "react";
import { configurarDeclaracion } from "tax-cl";
import Emoji from "./Emoji";
import Loading from "./Loading";
import HeaderBar from "./HeaderBar";
import { DEFAULT_USD_VALUE, DEFAULT_USD_YEAR, fetchUsdValue } from "../core/api";
import { getDefaultYear } from "../core/calculator";

const Result = lazy(() => import("./Result"));

function App() {
  const [year, setYear] = useState(() => getDefaultYear());
  const [income, setIncome] = useState(4000);
  const [showResults, setShowResults] = useState(false);
  const [usd, setUsd] = useState(
    {
      value: DEFAULT_USD_VALUE,
      origin: 'average',
      year: DEFAULT_USD_YEAR,
    }
  );
  const [customUsd, setCustomUsd] = useState("");
  const effectiveUsd = customUsd > 0 ? { value: Number(customUsd), origin: 'manual' } : usd;

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const incomeParam = parseInt(queryParams.get("income"));
    const yearParam = parseInt(queryParams.get("year"));
    setCustomUsd(queryParams.get("usd") || "");

    if (incomeParam) {
      setIncome(incomeParam);
      setShowResults(true);
    }

    if (yearParam) {
      setYear(yearParam);
    }
  }, []);

  useEffect(() => {
    configurarDeclaracion(year);
  }, [year]);

  useEffect(() => {
    fetchUsdValue().then(setUsd);
  }, []);

  const onChange = (event) => {
    const parsed = event.target.value;
    if (parsed === "") {
      setShowResults(false);
      setIncome("");
      return;
    }
    const value = parseInt(parsed, 10);
    setIncome(isNaN(value) ? income : value);
  };

  return (
    <>
      <HeaderBar />
      <section className="hero">
        <h1>
          Líquido
          <Emoji value="💰" />
        </h1>
        <h2>
          Calcula tu sueldo LÍQUIDO en Chile <Emoji value="🇨🇱" /> trabajando remoto para USA <Emoji value="🇺🇸" />
        </h2>
        <p>
          <label htmlFor="income">
            Solo ingresa tu sueldo mensual en <strong>DÓLARES</strong> y calcularemos tu líquido mensual descontando impuestos y cotizaciones.
          </label>
        </p>
        <div className="inputs">
          <input
            id="income"
            type="number"
            value={income}
            onChange={onChange}
          />
          <button onClick={() => setShowResults(true)} type="submit">
            <Emoji value="✨" /> Calcular
          </button>
        </div>
        <p>
          <label htmlFor="usd">
            Valor dólar (opcional, para probar escenarios):
          </label>
        </p>
        <div className="inputs">
          <input
            id="usd"
            type="number"
            min="0"
            step="0.01"
            placeholder={usd.value.toFixed(2)}
            value={customUsd}
            onChange={(event) => setCustomUsd(event.target.value)}
          />
        </div>
      </section>
      {showResults && (
        <Suspense fallback={<Loading />}>
          <Result income={income} usd={effectiveUsd} />
        </Suspense>
      )}
      <footer>
        <section>
          <p>
            Un proyecto de{" "}
            <a
              href="https://trabajoremoto.cl/?utm_campaign=blog-launch&utm_source=liquido&utm_medium=tools"
              target="_blank"
              rel="noopener noreferrer"
            >
              TrabajoRemoto.cl
            </a>
            {" "}
            <Emoji value="❤️" />
          </p>
          <p>
            Source Code in{" "}
            <a
              href="https://github.com/muZk/liquido"
              target="_blank"
              rel="noopener noreferrer"
            >
              Github
            </a>
          </p>
        </section>
      </footer>
    </>
  );
}

export default App;
