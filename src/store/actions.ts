import * as actionTypes from './actionTypes';

export const setCurrencies = (currencies: any) => {
    return {
        type: actionTypes.CURRENCIES,
        currencies: currencies
    }
}

export const setRates = (rates: any) => {
    return {
        type: actionTypes.RATES,
        rates: rates
    }
}