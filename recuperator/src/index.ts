import WebSocket from "ws";

const ws = new WebSocket("wss://stream.binance.com:9443/ws/btcbusd@trade");

ws.on("message", (data: any) => {
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
  const { E, p, q } = JSON.parse(data);

  const date = new Date(E).toUTCString();
  const price = parseFloat(p).toFixed(2);
  const quantity = q;

  // {
  //   date: 'Fri, 19 May 2023 23:01:37 GMT',
  //   price: '26875.95',
  //   quantity: '0.00102000'
  // }
  console.log({ date, price, quantity });
});
