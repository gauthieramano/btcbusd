import WebSocket from "ws";

const ws = new WebSocket("wss://stream.binance.com:9443/ws/btcbusd@trade");

ws.on("message", (data: any) => {
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
