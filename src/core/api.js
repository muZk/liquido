
export const DEFAULT_USD_VALUE = 850;

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
    const result = await fetch(`https://mindicador.cl/api/dolar/${today}`);
    const json = await result.json();
    return json.serie[0].valor;
  } catch (e) {
    return DEFAULT_USD_VALUE;
  }
}
