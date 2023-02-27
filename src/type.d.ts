import CurrencyNameI from "./components/interfaces/CurrencyNameI";
import RateI from "./components/interfaces/RateI";

type CurrencyState = {
    currencies: CurrencyNameI[];
}

type CurrencyAction = {
    type: string;
    currencies: CurrencyNameI[];
}

type RateState = {
    rates: RateI[];
}

type RateAction = {
    type: string;
    rates: RateI[];
}





type DispatchType = (args: CurrencyAction | RateAction) => CurrencyAction | RateAction;