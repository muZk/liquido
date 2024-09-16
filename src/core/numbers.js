const CLPFormat = new Intl.NumberFormat("es", {
  style: "currency",
  currency: "CLP",
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

export function formatAmount(number) {
  return  `$${CLPFormat.format(number.toFixed(2)).replace("CLP", "").trim()}`;
}
