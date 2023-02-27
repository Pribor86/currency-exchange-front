import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import {Line} from 'react-chartjs-2';
import ccyRatesList from '../../mockData/3monthRates/EUR-AUD.json';
import {useAppSelector} from "../../store/hooks";


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Currency exchange rates history',
        },
    },
};

const labels = ccyRatesList.map((item: any) => item.Dt);

let datasetLabel = ''
ccyRatesList[0].CcyAmt.forEach((item: any) => {
    if (datasetLabel.length > 0) {
        datasetLabel += ' - '
    }
    datasetLabel += item.Ccy
});

export default function Charts() {

    let rateList = useAppSelector(state => state.rates)

    let data = {
        labels: labels,
        datasets: [
            {
                label: datasetLabel,
                data: rateList,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ]
    }

    return <Line options={options} data={data}/>;
}
