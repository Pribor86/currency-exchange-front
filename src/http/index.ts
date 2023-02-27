import axios, {AxiosResponse} from 'axios'

async function getCurrencies() {
    const response: AxiosResponse = await axios.get('http://localhost:8080/api/v1/exchange/get-currencies');
    return response.data;

}

async function getCurrencyRate(currency: string) {
    const response: AxiosResponse = await axios.get('http://localhost:8080/api/v1/exchange/get/' + currency);
    return response.data;
}

async function getCurrencyHistory(currency: string) {
    const response: AxiosResponse = await axios.get('http://localhost:8080/api/v1/exchange/get-all/' + currency);
    return response.data;
}


export {getCurrencies, getCurrencyRate, getCurrencyHistory};