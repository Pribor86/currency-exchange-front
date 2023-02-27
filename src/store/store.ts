import {combineReducers, Store} from "redux";
import {configureStore} from "@reduxjs/toolkit";
import currencyReducers from "./currency-reducers";
import {CurrencyAction, DispatchType} from "../type";
import thunk from "redux-thunk";
import rateReducers from "./rate-reducer";

const rootReducer = combineReducers({
    currencies: currencyReducers,
    rates: rateReducers
});

const store: Store<RootState, CurrencyAction> & {
    dispatch: DispatchType;
} = configureStore({
    reducer: rootReducer,
    middleware: [thunk]
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export default store;