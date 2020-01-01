# IMOBI

Calculadora para sistemas de amortizações

 [SAC](#Sistema-de-amortização-constante-(SAC))
 [PRICE](#Sistema-frânces-de-amortização-(PRICE))

## Objeto de parâmetro para cálculo

| Atributo                | Tipo   | Descrição                                                     | requerimento |
|-------------------------|--------|---------------------------------------------------------------|--------------|
| table                   | string | tabela de cálculo                                             | obrigatório  |
| financedAmount          | number | Valor financiado                                              | obrigatório  |
| deadline                | number | Número de meses                                               | obrigatório  |
| annualInterestRate      | number | Taxa anual de juros                                           | obrigatório  |
| firstInstallmentDue     | Date   | Vencimento da primeira prestação                              | opcional     |
| gracePeriod             | number | Periodo de carencia                                           | opcional     |
| administrationTaxesRate | number | Taxa de administração                                         | opcional     |
| expenses                | number | Despesas                                                      | opcional     |
| insurence               | object | Objeto para cálculo do seguro                                 | opcional     |
| dfiTaxRate              | number | Alíquota para cálculo de Danos físicos ao imóvel (DFI)        | opcional     |
| mipTaxRate              | number | Alíquota para cálculo de Morte por invalidez permanente (MIP) | opcional     |
| estateValue             | number | Valor do imóvel para cálculo do seguro                        | opcional     |
| iof                     | object | Objeto com alíquotas para cálculo do IOF  (price em dev)      | opcional     |
| ratePerDay              | number | Alíquota diária                                               | opcional     |
| additionalFee           | number | Alíquota adicional                                            | opcional     |

## Sistema de amortização constante (SAC)

```js

import imobi from 'imobi';

const data = imobi.calculator({
    "table": "SAC",
    "financedAmount": 150000,
    "deadline": 5,
    "annualInterestRate": 0.72,
    "administrationTaxesRate": 25,
    "gracePeriod": 2,
    "firstInstallmentDue": new Date("2020-01-12"),
    "insurence": {
        "estateValue": 200000,
        "mipTaxRate": 0.0001737,
        "dfiTaxRate": 0.0001503,
    },
    "iof": {
        "ratePerDay": 0.0082,
        "additionalFee": 0.38
    },
    "expenses": 0
});

```

## Sistema frânces de amortização (PRICE)

```js

import imobi from 'imobi';

const data = imobi.calculator({
    "table": "PRICE",
    "financedAmount": 150000,
    "deadline": 5,
    "annualInterestRate": 0.72,
    "administrationTaxesRate": 25,
    "gracePeriod": 2,
    "firstInstallmentDue": new Date("2020-01-12"),
    "insurence": {
        "estateValue": 200000,
        "mipTaxRate": 0.0001737,
        "dfiTaxRate": 0.0001503,
    },
    "expenses": 0
});

```

## Objeto de resposta

| Atributo                | Tipo   | Descrição                                |
|-------------------------|--------|------------------------------------------|
| installments            | object | objeto com dados das prestações          |
| installment             | number | número da prestação                      |
| amortization            | number | valor da amortização                     |
| interestRate            | number | valor do juros                           |
| administrationTaxesRate | number | taxa de administração                    |
| insurence               | object | objeto com dados do seguro               |
| insurenceValue          | number | valor do seguro                          |
| mip                     | number | valor do MIP                             |
| dfi                     | number | valor do DFI                             |
| installmentValue        | number | valor da prestação                       |
| installmentDue          | number | vencimento do valor devido               |
| debitBalance            | number | valor do saldo devido                    |
| deadline                | number | prazo calculado                          |
| installmentsTotal       | number | total do saldo devido                    |
| amortizationTotal       | number | total de amortização                     |
| financedValue           | number | valor financiado + iof + despesas        |
| requestedValue          | number | valor financiado                         |
| interestRateTotal       | number | total de juros calculado                 |
| table                   | string | tabela utilizada para calculo            |
| annualInterestRate      | number | taxa anual de juros utilizada no cálculo |
| administrationTaxesRate | number | taxa de administração                    |
| gracePeriod             | number | periodo de carencia                      |
| cumulativeDaysForIof    | number | dias acumulados para IOF                 |
| iofTotal                | number | total do IOF                             |