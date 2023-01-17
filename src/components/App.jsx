import { useState, useEffect, Suspense, lazy } from "react";
import Emoji from "./Emoji";
import Loading from "./Loading";
import { DEFAULT_USD_VALUE, fetchUsdValue } from "../core/api";

const Result = lazy(() => import("./Result"));

function App() {
  const [income, setIncome] = useState(4000);
  const [showResults, setShowResults] = useState(false);
  const [usd, setUsd] = useState(
    {
      valor: DEFAULT_USD_VALUE,
      origin: 'default',
    }
  );

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const incomeParam = parseInt(queryParams.get("income"));
    if (incomeParam) {
      setIncome(incomeParam);
      setShowResults(true);
    }
  }, []);

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
      </section>
      {showResults && (
        <Suspense fallback={<Loading />}>
          <Result income={income} usd={usd} />
        </Suspense>
      )}
      <footer>
        <section>
          <p>
            Un proyecto de{" "}
            <a
              href="https://trabajoremoto.cl"
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
