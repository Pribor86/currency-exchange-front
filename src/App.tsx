import React, {useEffect} from 'react';
import './App.css';
import {getCurrencies} from './http'
import {Header} from "./components/Header";
import {SideMenu} from "./components/SideMenu";
import {CalculatorView} from "./components/calculatorView/CalculatorView";
import {HistoryView} from "./components/historyView/HistoryView";

//redux
import {useDispatch} from "react-redux";
import {AppDispatch} from "./store/store";
import {setCurrencies} from "./store/actions";

function App() {
    const dispatch = useDispatch<AppDispatch>();

    const [view, setView] = React.useState('calculator');

    useEffect(() => {
            getCurrencies().then(
                (response) => {
                    let tempListCurrencies: any = [];
                    response.forEach((item: any) => {
                        tempListCurrencies.push(item.ccy)
                    })
                    dispatch(setCurrencies(tempListCurrencies))
                }
            )
        }, [dispatch]
    )

    return (
        <div className="App">
            <div id='header'>
                <Header/>
            </div>
            <div id='wrapper'>
                <div id='menu'>
                    <SideMenu
                        setView={setView}
                    />
                </div>
                <div id='content'>
                    {view === 'calculator' && <CalculatorView/>}
                    {view === 'history' && <HistoryView/>}
                </div>
            </div>
        </div>
    );
}

export default App;
