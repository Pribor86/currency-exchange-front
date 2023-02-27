import * as actionTypes from './actionTypes';

const currencyReducers = (state = [], action: any) => {
    switch (action.type) {
        case actionTypes.CURRENCIES:
            return action.currencies;
        default:
            return state;
    }
}

export default currencyReducers;