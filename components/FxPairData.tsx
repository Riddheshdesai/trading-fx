"use client";

import { useOrderBook } from "@/hooks/use-orderblock";
import { useSymbolStore } from "@/store/useTradingStore";
import React from "react";
import OrderBook from "./Orderbook";
import DyanamicLineChart from "./DyanamicLineChart";
import OrderbookImbalance from "./OrderbookImbalance";
import Loader from "./Loader";
import MarketDepth from "./MarketDepth";

export default function FxPairData() {
  const { symbol } = useSymbolStore();
  const { data, isLoading, isError } = useOrderBook(symbol);

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  if (isError) {
    return <div>Error loading order book data</div>;
  }
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
      <OrderBook orderBook={data} />
      <DyanamicLineChart orderBook={data} />
      <OrderbookImbalance orderBook={data} />
      <MarketDepth orderBook={data} />
    </div>
  );
}
