import { calcular, obtenerConfiguracion, configurarDeclaracion } from "tax-cl";

configurarDeclaracion(Math.min(new Date().getFullYear() + 1), 2022);

const { RETENCION, COBERTURA_PARCIAL } = obtenerConfiguracion();

export function getTakeHomeSalary(usdMonthlyIncome, usdToClp) {
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
