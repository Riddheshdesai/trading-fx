"use client";

import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis, LabelList } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { useEffect, useMemo, useState } from "react";

interface SpreadIndicatorProps {
  orderBook: { bids: [number, number][]; asks: [number, number][] };
}

const DyanamicLineChart: React.FC<SpreadIndicatorProps> = ({ orderBook }) => {
  const [spreadData, setSpreadData] = useState<{ x: number; y: number }[]>([]);

  // Calculate the spread value (difference between highest bid and lowest ask)
  const spread = useMemo(() => {
    const highestBid = orderBook?.bids.length ? orderBook.bids[0][0] : 0;
    const lowestAsk = orderBook?.asks.length ? orderBook.asks[0][0] : 0;
    return highestBid && lowestAsk ? lowestAsk - highestBid : 0;
  }, [orderBook]);

  // Update the chart data in real-time
  useEffect(() => {
    const now = Date.now();
    setSpreadData((prev) => {
      const updated = [...prev, { x: now, y: spread }];
      return updated.length > 60 ? updated.slice(1) : updated; // Keep the last 60 data points
    });
  }, [spread]);

  // Custom chart configuration
  const chartConfig = {
    desktop: {
      label: "Market Depth",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Market Depth Line Chart</CardTitle>
        <CardDescription>Live Market Data (Spread)</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            data={spreadData}
            margin={{
              top: 20,
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="x"
              tickFormatter={(value) => new Date(value).toLocaleTimeString()} // Format x-axis as time
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis
              orientation="left" // Position the Y-axis on the left
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Line
              type="natural"
              dataKey="y"
              stroke="var(--color-desktop)"
              strokeWidth={2}
              dot={false}
              activeDot={{
                r: 6,
              }}
            >
              {/* <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              /> */}
            </Line>
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing the current market spread for the last 60 seconds.
        </div>
      </CardFooter>
    </Card>
  );
};

export default DyanamicLineChart;
