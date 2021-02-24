# Líquido💰: calcula tu sueldo líquido cuando trabajas para una empresa de USA de forma remota

[![Lighthouse](lighthouse.svg)](https://github.com/muZk/liquido)

Calculadora que te permite estimar cual será **tu sueldo líquido** REAL cuando trabajas desde Chile 🇨🇱 para una empresa de USA 🇺🇸.

Live en: https://remoto.netlify.app/

## Cómo se hace el cálculo

Cuando trabajas de manera remota desde CHILE para USA, ocurre lo siguiente:

- Te pagan en dólares.
- Eres trabajador independiente para el estado de Chile, aunque tengas contrato.
- Hay comisiones que le cobran a tu empleador por enviar la plata, y a ti por recibirla.
- Como trabajador independiente en Chile, mes a mes tienes que hacer tu boleta de honorarios, y pagar tú mismo la retención.
- Como trabajador independiente en Chile, año a año tienes que hacer tu "declaración de renta" donde pagas impuestos y cotizaciones.

Es decir, hay muchas cosas que afectan en tu sueldo líquido real. Esta calculadora se preocupa de entregarte un número realista de lo que vas a recibir con base a los siguientes supuestos:

- El valor dólar que te da el banco es el mismo que aparece en el SII (no siempre es así).
- Te pagan por transferencia internacional. El banco gringo te cobra `20 USD` y el Chileno `0`.
- Par los impuestos y cotizaciones, [ver aquí](https://github.com/muZk/impuestos#supuestos-para-el-c%C3%A1lculo).

## Finalmente... el cálculo:

```
  sueldoLiquidoMensual = (12 * ((INCOME - BANK_FEE) * USD_CLP) - RETENCION - DEUDA_SII) / 12
```

- `INCOME` = la cantidad de dólares que te mandan.
- `USD_CLP` = el valor dólar según SII
- `BANK_FEE` = comisión que cobra el banco gringo por recibir la plata (`20 USD`)
- `RETENCION` = la retención de las boletas que pagas mes a mes al SII.
- `DEUDA_SII` = lo que tendrás que pagarle al SII en la declaración de renta por impuestos y cotizaciones.

`RETENCION` y `DEUDA_SII` dependen del año. Si quieres saber cómo se calcula, te sugiero ver [este repositorio](https://github.com/muZk/impuestos) y [esta app](https://impuestos.netlify.app/). De hecho, "Liquido" utiliza la librería [tax-cl](https://github.com/muZk/tax-cl) para el cálculo.

## FAQ

### **_"¿Por qué recibir por banco si los bancos valen 💩?"_**

1. La comisión del banco gringo es entre `20` y `50 USD` fijos.
2. La comisión del banco chileno es entre 0 y 0.6% (dependiendo del banco).

Es decir, las comisiones son bajas comparadas con otras opciones.

Además, con banco puedes tener una cuenta en dólares, donde se te deposita tu sueldo automáticamente. Luego, puedes venderle los dólares al mismo banco.

### **_"¿Cómo hago la boleta si me pagan en USD y tengo que hacerla en CLP?"_**

Tienes que hacer la boleta, el RUT tiene que ser 44.444.444-4 (extranjeros sin RUT), y la dirección da lo mismo.

Luego, el monto de la boleta lo calculas así:

1. Obtén el valor del dólar [según el SII](https://www.sii.cl/valores_y_fechas/dolar/dolar2021.htm) para el día en que te llegó la plata.
2. El monto en dólares que te llegó, multiplícalo por el valor obtenido.
3. Haz la boleta de honorarios por ese monto. En la descripción, coloca "Equivalente a X USD" (donde `X` es lo que te llegó).
