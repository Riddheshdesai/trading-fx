"use client";

import { TrendingUp } from "lucide-react";
import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
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
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useEffect, useMemo, useState } from "react";

interface SpreadIndicatorProps {
  orderBook: { bids: [number, number][]; asks: [number, number][] };
}

const DyanamicLineChart: React.FC<SpreadIndicatorProps> = ({ orderBook }) => {
  const [spreadData, setSpreadData] = useState<{ x: number; y: number }[]>([]);

  const spread = useMemo(() => {
    const highestBid = orderBook?.bids.length ? orderBook.bids[0][0] : 0;
    const lowestAsk = orderBook?.asks.length ? orderBook.asks[0][0] : 0;
    return highestBid && lowestAsk ? lowestAsk - highestBid : 0;
  }, [orderBook]);

  useEffect(() => {
    const now = Date.now();
    setSpreadData((prev) => {
      const updated = [...prev, { x: now, y: spread }];
      return updated.length > 60 ? updated.slice(1) : updated;
    });
  }, [spread]);

  const chartConfig = {
    desktop: {
      label: "Market Depth",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;

  return (
    <Card className="col-span-12 lg:col-span-8">
      <CardHeader>
        <CardTitle>Market Spread Line Chart</CardTitle>
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
              tickFormatter={(value) => new Date(value).toLocaleTimeString()}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis
              orientation="left"
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
            ></Line>
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default DyanamicLineChart;
