"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  LabelList,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useMemo, useState } from "react";

interface MarketDepthChartProps {
  orderBook: { bids: [number, number][]; asks: [number, number][] };
}

const MarketDepthChart: React.FC<MarketDepthChartProps> = ({ orderBook }) => {
  const [marketDepthData, setMarketDepthData] = useState<
    { x: number; bid: number; ask: number }[]
  >([]);

  if (!orderBook || !orderBook.bids || !orderBook.asks) {
    return <div>Loading...</div>;
  }

  const marketDepth = useMemo(() => {
    const bidMap = new Map<number, number>();
    orderBook.bids.forEach(([price, qty]) => {
      bidMap.set(price, qty);
    });

    const askMap = new Map<number, number>();
    orderBook.asks.forEach(([price, qty]) => {
      askMap.set(price, qty);
    });

    const mergedData = [];

    const allPrices = new Set([
      ...orderBook.bids.map(([price]) => price),
      ...orderBook.asks.map(([price]) => price),
    ]);

    allPrices.forEach((price) => {
      const bidQty = bidMap.get(price) || 0;
      const askQty = askMap.get(price) || 0;
      mergedData.push({ x: price, bid: bidQty, ask: askQty });
    });

    mergedData.sort((a, b) => a.x - b.x);

    return mergedData;
  }, [orderBook]);

  useEffect(() => {
    if (marketDepth?.length) {
      const formattedData = marketDepth.map((depthData) => ({
        x: depthData.x,
        bid: depthData.bid || 0,
        ask: depthData.ask || 0,
      }));

      setMarketDepthData(formattedData);
    }
  }, [marketDepth]);

  return (
    <Card className="col-span-12 lg:col-span-8">
      <CardHeader>
        <CardTitle>Market Depth Chart</CardTitle>
        <CardDescription>Live Market Depth (Bids and Asks)</CardDescription>
      </CardHeader>
      <CardContent>
        <LineChart
          data={marketDepthData}
          margin={{
            top: 20,
            left: 12,
            right: 12,
            bottom: 20,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="x"
            tickFormatter={(value) => value.toFixed(2)}
            tickLine={false}
            axisLine={false}
            tickMargin={8}
          />
          <YAxis tickLine={false} axisLine={false} tickMargin={8} />
          <Tooltip />
          <Line
            type="linear"
            dataKey="bid"
            stroke="green"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6 }}
          />
          <Line
            type="linear"
            dataKey="ask"
            stroke="red"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6 }}
          >
            <LabelList
              position="top"
              offset={12}
              className="fill-foreground"
              fontSize={12}
            />
          </Line>
        </LineChart>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Live market depth chart showing current bids and asks.
        </div>
      </CardFooter>
    </Card>
  );
};

export default MarketDepthChart;
