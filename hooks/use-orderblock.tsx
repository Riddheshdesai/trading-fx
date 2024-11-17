import { useQuery, useQueryClient } from "@tanstack/react-query";

export function useOrderBook(symbol: string) {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ["orderBook", symbol],
    queryFn: () =>
      new Promise((resolve, reject) => {
        const ws = new WebSocket(
          `wss://stream.binance.com:9443/ws/${symbol}@depth`
        );
        ws.onopen = () => {
          console.log(`WebSocket connection established for ${symbol}`);
        };

        ws.onmessage = (event) => {
          const data = JSON.parse(event.data);
          const orderBookData = {
            bids: data.b
              .slice(0, 10)
              .map(([price, quantity]: string[]) => [
                parseFloat(price),
                parseFloat(quantity),
              ]),
            asks: data.a
              .slice(0, 10)
              .map(([price, quantity]: string[]) => [
                parseFloat(price),
                parseFloat(quantity),
              ]),
          };

          queryClient.setQueryData(["orderBook", symbol], orderBookData);
          resolve(orderBookData);
        };

        ws.onerror = (err) => reject(err);

        ws.onclose = () => {
          console.log(`WebSocket connection closed for ${symbol}`);
        };

        return ws;
      }),
    enabled: !!symbol,
  });
}
