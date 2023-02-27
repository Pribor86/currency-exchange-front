import * as actionTypes from './actionTypes';

const rateReducers = (state = [], action: any) => {
    switch (action.type) {
        case actionTypes.RATES:
            return action.rates;
        default:
            return state;
    }
}

export default rateReducers;