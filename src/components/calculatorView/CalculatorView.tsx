import React, {useEffect} from 'react';
import '../../styles/calculator.scss';
import Form from "react-bootstrap/Form";
import ccyRatesList from '../../mockData/CcyRates/EUR.json';
import {getCurrencyRate} from "../../http";

import {useAppSelector} from "../../store/hooks";

let ccyNameList: any = ['EUR'];

ccyRatesList.forEach((item: any) => item.CcyAmt.forEach((item: any) => {
    if (item.Ccy !== 'EUR') {
        ccyNameList.push(item.Ccy)
    }
}))

export const CalculatorView = () => {

    let currenciesConvertTo = useAppSelector(state => state.currencies)
    let currenciesConvertFrom = useAppSelector(state => state.currencies)

    const [amount, setAmount] = React.useState<number>(0);
    const [ccyExchangeResult, setCcyExchangeResult] = React.useState<number>(0);
    const [convertFrom, setConvertFrom] = React.useState<string>('AUD');
    const [convertTo, setConvertTo] = React.useState<string>('AUD');
    const [convertFromList, setConvertFromList] = React.useState<any>(currenciesConvertFrom);
    const [convertToList, setConvertToList] = React.useState<any>(currenciesConvertTo);
    const [rateFrom, setRateFrom] = React.useState<number>(0);
    const [rateTo, setRateTo] = React.useState<number>(0);

    useEffect(() => {
        setConvertToList(currenciesConvertTo);
        setConvertFromList(currenciesConvertFrom);
    }, [currenciesConvertTo, currenciesConvertFrom])
    const handleConvertFrom = (event: any) => {
        setConvertFrom(event)
        getCurrencyRate(event).then((response) => {
            setRateFrom(response[0].amount)
        })
    }

    const handleConvertTo = (event: any) => {
        setConvertTo(event)
        getCurrencyRate(event).then((response) => {
            setRateTo(response[0].amount)
        })
    }

    const handleExchange = () => {
        if (amount && convertFrom === 'EUR') {
            const result = amount * rateTo
            setCcyExchangeResult(result)
        } else {
            let result = amount * (rateTo / rateFrom)
            setCcyExchangeResult(result)
        }
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
                <Form.Control type='number' disabled={true} placeholder={ccyExchangeResult.toString()}/>
            </div>
        </div>
    )
}