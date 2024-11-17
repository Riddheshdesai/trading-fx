"use client";

import React, { useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import GaugeChart from "react-gauge-chart";

interface OrderbookImbalanceProps {
  orderBook: {
    bids: [number, number][];
    asks: [number, number][];
  };
}

const OrderbookImbalance: React.FC<OrderbookImbalanceProps> = ({
  orderBook,
}) => {
  const imbalance = useMemo(() => {
    const totalBids = orderBook?.bids.reduce(
      (sum, [_, quantity]) => sum + quantity,
      0
    );
    const totalAsks = orderBook?.asks.reduce(
      (sum, [_, quantity]) => sum + quantity,
      0
    );

    if (totalBids + totalAsks === 0) return 0;

    return ((totalBids - totalAsks) / (totalBids + totalAsks)) * 100;
  }, [orderBook]);

  const mappedPercentage = useMemo(() => {
    let mappedValue;

    if (imbalance <= 0) {
      mappedValue = (imbalance + 100) * 0.5;
    } else {
      mappedValue = 50 + imbalance * 0.5;
    }

    return mappedValue;
  }, [imbalance]);

  const formatTextValue = (value: number) => {
    const percentage = value * 100;
    return `${percentage.toFixed(2)}%`;
  };

  return (
    <Card className="col-span-12 lg:col-span-4">
      <CardHeader>
        <CardTitle>Orderbook Imbalance Indicator</CardTitle>
        <CardDescription>Live Orderbook Imbalance Indicator (Bids and Asks)</CardDescription>
      </CardHeader>
      <CardContent>
        <GaugeChart
          id="gauge-chart1"
          nrOfLevels={2}
          colors={["#E8260F", "#12E80F "]}
          percent={mappedPercentage / 100}
          textColor={"#000"}
          hideText={true}
        />
        <div className="flex items-center justify-center text-lg font-semibold">
          {imbalance.toFixed(0)}%
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderbookImbalance;
