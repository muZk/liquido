
export const DEFAULT_USD_VALUE = 700;

export async function fetchUsdValue() {
  const date = new Date();
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
