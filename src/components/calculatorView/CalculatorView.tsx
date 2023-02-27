import React, {useEffect} from 'react';
import '../../styles/calculator.scss';
import Form from "react-bootstrap/Form";
import {getCurrencyRate} from "../../http";

import {useAppSelector} from "../../store/hooks";

const rateString: string = 'Rate is ';

export const CalculatorView = () => {

    let currenciesConvertTo = useAppSelector(state => state.currencies)
    let currenciesConvertFrom = useAppSelector(state => state.currencies)

    const [amount, setAmount] = React.useState<number>(0);
    const [ccyExchangeResult, setCcyExchangeResult] = React.useState<number>(0);
    const [currencyFrom, setCurrencyFrom] = React.useState<string>('AUD');
    const [currencyTo, setCurrencyTo] = React.useState<string>('AUD');
    const [convertFromList, setConvertFromList] = React.useState<any>(currenciesConvertFrom);
    const [convertToList, setConvertToList] = React.useState<any>(currenciesConvertTo);
    const [rateFrom, setRateFrom] = React.useState<number>(0);
    const [rateTo, setRateTo] = React.useState<number>(0);
    const [rate, setRate] = React.useState<string>('');

    useEffect(() => {
        setConvertToList(currenciesConvertTo);
        setConvertFromList(currenciesConvertFrom);
    }, [currenciesConvertTo, currenciesConvertFrom])
    const handleConvertFrom = (event: any) => {
        getCurrencyRate(event).then((response) => {
            setRateFrom(response[0].amount)
            setCurrencyFrom(response[0].currency)
        })
    }

    const handleConvertTo = (event: any) => {
        getCurrencyRate(event).then((response) => {
            setRateTo(response[0].amount)
            setCurrencyTo(response[0].currency)
        })
    }

    const handleExchange = () => {
            let result = amount * (rateTo / rateFrom)
            setCcyExchangeResult(result)

        let rate = (rateTo / rateFrom).toFixed(5)
            setRate(rate)
    }

    const handleInput = (event: any) => {
        setAmount(event)
        handleExchange()
    }

    useEffect(() => {
        handleExchange()
    })

    return (
        <div className='calculator-view'>
            <h1>Calculator View</h1>
            <div className='calculator-view__row'>
                <Form.Select
                    arial-label={'Choose currency'}
                    onChange={(e: any) => {
                        handleConvertFrom(e.target.value)
                    }}
                >
                    {convertFromList.map((currency: any, index: any) => {
                        return (
                            <option key={index.toString()} value={currency}>{currency}</option>
                        )
                    })}
                </Form.Select>
                <div className={'calculator-view__arrow'}>→</div>
                <Form.Select
                    arial-label={'Choose currency'}
                    onChange={(e: any) => {
                        handleConvertTo(e.target.value)
                    }}
                >
                    {convertToList.map((currency: any, index: any) => {
                        return (
                            <option key={index.toString()} value={currency}>{currency}</option>
                        )
                    })}
                </Form.Select>

            </div>
            <div className='calculator-view__row'>
                <Form.Control type='number' placeholder='Enter amount' value={amount} onChange={(e: any) => {
                    handleInput(e.target.value)
                }}/>
                <div className={'calculator-view__arrow'}>→</div>
                <Form.Control type='number' disabled={true} placeholder={ccyExchangeResult.toString()}/>
            </div>
            <div className='calculator-view__row'>
                <div className={'currency-from'}>{rateString}{rate} </div>
            </div>
        </div>
    )
}