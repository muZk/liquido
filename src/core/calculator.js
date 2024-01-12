import { calcular, obtenerConfiguracion, configurarDeclaracion } from "tax-cl";

configurarDeclaracion(getDefaultYear());

export function getDefaultYear() {
  // Antes de junio, te importa la operación renta actual.
  // Después de junio, te importa la operación renta del próximo año.
  if (new Date().getMonth() < 6) {
    return new Date().getFullYear();
  }

  return new Date().getFullYear() + 1
}

export function setYear(year) {
  configurarDeclaracion(year || getDefaultYear());
}

export function getTakeHomeSalary(usdMonthlyIncome, usdToClp) {
  const { RETENCION, COBERTURA_PARCIAL } = obtenerConfiguracion();
  const clpMonthlyIncome = usdMonthlyIncome * usdToClp.value;
  const taxes = calcular(clpMonthlyIncome);
  const { deuda: debt, retencion } = taxes;
  const takeHome = 12 * clpMonthlyIncome - retencion - debt;
  return {
    income: usdMonthlyIncome,
    incomeClp: clpMonthlyIncome,
    value: takeHome / 12,
    assumptions: {
      usd: usdToClp,
      RETENCION,
      COBERTURA_PARCIAL,
      ...taxes,
    },
  };
}

export function getTakeHomeSalaryPartial(usdMonthlyIncome, usdToClp) {
  const { RETENCION, COBERTURA_PARCIAL } = obtenerConfiguracion();
  const clpMonthlyIncome = usdMonthlyIncome * usdToClp.value;
  const taxes = calcular(clpMonthlyIncome);
  const { deudaModalidadParcial: debt, retencion } = taxes;
  const takeHome = 12 * clpMonthlyIncome - retencion - debt;
  return {
    income: usdMonthlyIncome,
    value: takeHome / 12,
    assumptions: {
      usd: usdToClp,
      RETENCION,
      COBERTURA_PARCIAL,
      ...taxes,
    },
  };
}
