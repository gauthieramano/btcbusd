let ws;

const lows = [...new Array(6)].fill(200000);
const highs = [...new Array(6)].fill(0);
let prevIndex = 0;
let time = 0;
let wsIndex = 0;

const pad4 = (value: number) => value.toString().padStart(4, " ");
const pad7 = (value: string) => value.padStart(7, " ");
const format = (value: number) => pad7(new Intl.NumberFormat().format(value));

const initWs = () => {
  ws = new WebSocket("wss://stream.binance.com:9443/ws/btcusdc@trade");

  wsIndex++;

  ws.onclose = () => {
    console.log("----------\n\nBTCFDUSD WS closed\n\n----------");

    initWs();
  };

  ws.onmessage = (event) => {
    /**
     * ```json
     * {
     *   "e": "trade",     // Event type
     *   "E": 123456789,   // Event time
     *   "s": "BNBBTC",    // Symbol
     *   "t": 12345,       // Trade ID
     *   "p": "0.001",     // Price
     *   "q": "100",       // Quantity
     *   "b": 88,          // Buyer order ID
     *   "a": 50,          // Seller order ID
     *   "T": 123456785,   // Trade time
     *   "m": true,        // Is the buyer the market maker?
     *   "M": true         // Ignore
     * }
     * ```
     */
    // const { E, p, q } = JSON.parse(event.data);

    // const date = new Date(E).toUTCString();
    // const price = parseFloat(p).toFixed(0);
    // const quantity = q;

    // {
    //   date: 'Fri, 19 May 2023 23:01:37 GMT',
    //   price: '26875.95',
    //   quantity: '0.00102000'
    // }

    //console.log({ date, price, quantity });

    const { E, p } = JSON.parse(event.data);

    const price = parseInt(p);
    const index = Math.floor((E % 60000) / 10000);
    const isNewIndex = prevIndex !== index;

    if (isNewIndex) {
      prevIndex = index;
    }

    if (isNewIndex || price < lows[index]) {
      lows[index] = price;
    }
    if (isNewIndex || price > highs[index]) {
      highs[index] = price;
    }

    if (E > time) {
      time = E + 1000;

      const low = Math.min(...lows);
      const high = Math.max(...highs);

      const prices = [
        wsIndex,
        `${format(high)} -${pad4(high - price)}`,
        format(price),
        `${format(low)} -${pad4(price - low)}`,
      ].join(" \n");

      console.log(prices);
    }
  };
};

initWs();
