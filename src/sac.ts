import insurenceCalc from './insurenceCalc';
import tables from './tables';
import sumInstallmentDue from './sumInstallmentDue';

const calcDebitBalance = function (currentInstallmentNumber: number, financedValue: number, amortization: number, gracePeriod: number) {
    return financedValue - ((currentInstallmentNumber - gracePeriod) * amortization);
}

const calcInterestRate = function (debitBalance: number, amortization: number, annualInterestRate: number) {
    return (debitBalance + amortization) * ((annualInterestRate / 12)/100);
}

const calcInstallment = function (amortization: number, interestRate: number, administrationTaxesRate: number, insurence: any) {
    return amortization + interestRate + administrationTaxesRate + insurence.insurenceValue;
}

const sac = function (options: any) {
    const {
        financedAmount,
        expenses,
        deadline,
        annualInterestRate,
        administrationTaxesRate,
        insurence,
        gracePeriod,
        firstInstallmentDue
    } = options;

    let newDeadLine = gracePeriod > 0 && gracePeriod < deadline ? deadline - gracePeriod : deadline;
    let installments = {};
    let financedValue = financedAmount + expenses;
    let amortization = 0;
    let installmentsTotal = 0;
    let amortizationTotal = 0;
    let interestRateTotal = 0;
    let summary = {};

    for (let index = 1; index <= deadline; index++) {
        if (gracePeriod > 0 && index > gracePeriod && gracePeriod < deadline) {
            amortization = financedValue / newDeadLine;
        } else if (gracePeriod === 0) {
            amortization = financedValue / deadline;
        }
        let debitBalance = calcDebitBalance(index, financedValue, amortization, gracePeriod);
        let interestRate = calcInterestRate(debitBalance, amortization, annualInterestRate);
        let insurenceResult = insurenceCalc(debitBalance + amortization, insurence.estateValue, insurence.mipTaxRate, insurence.dfiTaxRate);
        let installmentValue = calcInstallment(amortization, interestRate, administrationTaxesRate, insurenceResult);
        let amortizationResult = amortization;

        installmentsTotal = installmentsTotal + installmentValue;
        amortizationTotal = amortizationTotal + amortizationResult;
        interestRateTotal = interestRateTotal + interestRate;

        installments = {
            ...installments,
            [index]: {
                installment: index,
                amortization: amortizationResult,
                interestRate: interestRate,
                administrationTaxesRate: administrationTaxesRate,
                insurence: insurenceResult,
                installmentValue: installmentValue,
                installmentDue: sumInstallmentDue(firstInstallmentDue, index),
                debitBalance: debitBalance
            }
        }

        summary = {
            installments,
            deadline,
            installmentsTotal,
            amortizationTotal,
            financedValue,
            interestRateTotal,
            table: tables.SAC,
            annualInterestRate,
            administrationTaxesRate,
            gracePeriod,
        }
    }
    return summary;
}

export = sac;