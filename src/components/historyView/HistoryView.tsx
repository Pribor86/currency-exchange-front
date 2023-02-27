import React from 'react'
import Charts from "./chart";
import Form from "react-bootstrap/Form";
import {useAppSelector} from "../../store/hooks";
import {getCurrencyHistory} from "../../http";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../store/store";
import {setRates} from "../../store/actions";

export const HistoryView = () => {

    const dispatch = useDispatch<AppDispatch>();

    let currencyList = useAppSelector(state => state.currencies)

    const handleHistoryCurrency = (event: any) => {
        getCurrencyHistory(event).then((response: any) => {
            let rateList: any = []
            response.forEach((item: any) => {
                rateList.push(item.amount)
            })
            dispatch(setRates(rateList))
        })
    }

    return (
        <div className='history-view'>
            <h1>History View</h1>
            <Form.Select
                arial-label={'Choose currency'}
                onChange={(e: any) => {
                    handleHistoryCurrency(e.target.value)
                }}
            >
                {currencyList.map((currency: any, index: any) => {
                    return (
                        <option key={index.toString()} value={currency}>{currency}</option>
                    )
                })}
            </Form.Select>
            <Charts/>
        </div>
    )
}