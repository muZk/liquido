// Promedio de los valores diarios de 2025 (https://mindicador.cl/api/dolar/2025).
// Solo se usa si ninguna API responde, así que no es crítico actualizarlo cada año.
export const DEFAULT_USD_VALUE = 951.64;
export const DEFAULT_USD_YEAR = 2025;

const apiKeySbif = process.env.REACT_APP_SBIF_API_KEY;

// Dólar observado del Banco Central. Ambas responden con el mismo formato, si una se cae probamos la otra.
const indicadoresApis = [
  'https://mindicador.cl/api/dolar',
  'https://findic.cl/api/dolar',
];

const secondaryApi = {
  url: `https://api.sbif.cl/api-sbifv3/recursos_api/dolar?apikey=${apiKeySbif}&formato=json`,
  origin: 'SBIF', //Servicio de bancos e instituciones financieras
};

async function fetchSerie(path = '') {
  for (const url of indicadoresApis) {
    try {
      const result = await fetch(`${url}${path}`);
      const { serie } = await result.json();
      if (serie.length) return serie;
    } catch {}
  }
  throw new Error('Ninguna API entregó el valor del dólar');
}

export async function fetchUsdValue() {
  try {
    // Sin fecha entrega los últimos días hábiles, el primero es el más reciente (cubre fines de semana y feriados)
    const serie = await fetchSerie();
    return {
      value: serie[0].valor,
      origin: 'SII', //Servicio de impuestos internos
    }
  } catch {}

  try {
    const resultApi = await fetch(secondaryApi.url)
    const json = await resultApi.json();
    return {
      value: parseFloat(json.Dolares[0].Valor.replace('.', '').replace(',', '.')), // viene como "1.000,76"
      origin: secondaryApi.origin,
    }
  } catch {}

  return fetchPastYearAverage();
}

async function fetchPastYearAverage() {
  const year = new Date().getFullYear() - 1;
  try {
    const serie = await fetchSerie(`/${year}`);
    return {
      value: serie.reduce((sum, { valor }) => sum + valor, 0) / serie.length,
      origin: 'average',
      year,
    }
  } catch {
    return {
      value: DEFAULT_USD_VALUE,
      origin: 'average',
      year: DEFAULT_USD_YEAR,
    }
  }
}
