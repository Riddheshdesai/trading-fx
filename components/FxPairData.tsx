import { useOrderBook } from "@/hooks/use-orderblock";
import { useSymbolStore } from "@/store/useTradingStore";
import React from "react";
import OrderBook from "./Orderbook";
import DyanamicLineChart from "./DyanamicLineChart";
import MarketDepthChart from "./MarketDepthChart";
import OrderbookImbalance from "./OrderbookImbalance";

export default function FxPairData() {
  const { symbol } = useSymbolStore();
  const { data, isLoading, isError } = useOrderBook(symbol);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading order book data</div>;
  }
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Real-Time Order Book</h1>
      <OrderBook orderBook={data} />
      <DyanamicLineChart orderBook={data} />
      <MarketDepthChart orderBook={data} />
      {/* <SpreadIndicator orderBook={data} /> */}
      <OrderbookImbalance orderBook={data} />
    </div>
  );
}
