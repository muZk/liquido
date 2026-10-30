
// Promedio 2025 de los promedios mensuales publicados por el SII
// https://www.sii.cl/valores_y_fechas/dolar/dolar2025.htm
export const DEFAULT_USD_VALUE = 951.25;
export const DEFAULT_USD_YEAR = 2025;

const apiKeySbif = process.env.REACT_APP_SBIF_API_KEY;

const principalApi = {
  url: 'https://mindicador.cl/api/dolar/',
  origin: 'SII', //Servicio de impuestos internos
};

const secondaryApi = {
  url: `https://api.sbif.cl/api-sbifv3/recursos_api/dolar?apikey=${apiKeySbif}&formato=json`,
  origin: 'SBIF', //Servicio de bancos e instituciones financieras
};

export async function fetchUsdValue() {
  let date = new Date();
  if (date.getDay() === 6) {
    date = new Date(date - 24 * 60 * 60 * 1000);
  } else if (date.getDay() === 0) {
    date = new Date(date - 48 * 60 * 60 * 1000);
  }

  const month = date.getMonth() + 1;
  const today = `${date.getDate()}-${month < 10 ? `0${month}` : month}-${date.getFullYear()}`;
  try {
    const result = await fetch(`${principalApi.url}${today}`);
    const json = await result.json();
    return {
      value: json.serie[0].valor,
      origin: principalApi.origin,
    }
  } catch (e) {
    try {
      const resultApi = await fetch(secondaryApi.url)
      const json = await resultApi.json();
      return {
        value: parseFloat(json.Dolares[0].Valor.replace('.', '').replace(',', '.')), // viene como "1.000,76"
        origin: secondaryApi.origin,
      }
    } catch (e) {
      return fetchPastYearAverage();
    }
  }
}

async function fetchPastYearAverage() {
  const year = new Date().getFullYear() - 1;
  try {
    const result = await fetch(`${principalApi.url}${year}`);
    const { serie } = await result.json();
    return {
      value: serie.reduce((sum, { valor }) => sum + valor, 0) / serie.length,
      origin: 'average',
      year,
    }
  } catch (e) {
    return {
      value: DEFAULT_USD_VALUE,
      origin: 'average',
      year: DEFAULT_USD_YEAR,
    }
  }
}
