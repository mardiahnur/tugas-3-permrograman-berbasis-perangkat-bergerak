import axios from 'axios';

export async function fetchTickers() {
  const resp = await axios.get('https://api.coinlore.net/api/tickers/');
  return resp.data.data;  // format API coinlore
}
