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
import { useMemo, useState } from "react";

interface MarketDepthChartProps {
  orderBook: { bids: [number, number][]; asks: [number, number][] };
}

const MarketDepthChart: React.FC<MarketDepthChartProps> = ({ orderBook }) => {
  const [marketDepthData, setMarketDepthData] = useState<
  { x: number; bid: number; ask: number }[]
  >([]);
  
  if (!orderBook) return <div>loading</div>;
  // Prepare market depth data based on the order book
  const marketDepth = useMemo(() => {
    const bidData = orderBook?.bids.map(([price, qty]) => ({
      x: price,
      bid: qty,
    }));
    const askData = orderBook?.asks.map(([price, qty]) => ({
      x: price,
      ask: qty,
    }));

    // Merge bids and asks, sort by price (ascending order)
    const mergedData = [...bidData, ...askData]
      .filter((data) => data.bid > 0 || data.ask > 0) // Filter out points where both bid and ask are zero
      .sort((a, b) => a.x - b.x);

    return mergedData;
  }, [orderBook]);

  // Update marketDepthData state when marketDepth changes
  useMemo(() => {
    if (marketDepth?.length) {
      setMarketDepthData(
        marketDepth.map((depthData) => ({
          x: depthData.x,
          bid: depthData.bid || 0, // Ensure bid data exists
          ask: depthData.ask || 0, // Ensure ask data exists
        }))
      );
    }
  }, [marketDepth]);

  return (
    <Card>
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
            tickFormatter={(value) => value.toFixed(2)} // Format X-axis to show price levels
            tickLine={false}
            axisLine={false}
            tickMargin={8}
          />
          <YAxis tickLine={false} axisLine={false} tickMargin={8} />
          <Tooltip />
          <Line
            type="linear"
            dataKey="bid"
            stroke="green" // Color for bids
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6 }}
          />
          <Line
            type="linear"
            dataKey="ask"
            stroke="red" // Color for asks
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
