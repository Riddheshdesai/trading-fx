
import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";


interface DataPoint {
  x: number;
  y: number; 
}

interface MarketDepthChartProps {
  orderBook: { bids: [number, number][]; asks: [number, number][] };
}

const MarketDepth: React.FC<MarketDepthChartProps> = ({ orderBook }) => {
  console.log("orderBook", orderBook);

  const options: Highcharts.Options = {
    chart: {
      type: "area",
      zooming: {
        type: "xy",
      },
    },
    title: {
      text: "Market Depth",
    },
    xAxis: {
      minPadding: 0,
      maxPadding: 0,
      plotLines: [
        {
          color: "#888",
          value: 0.1523,
          width: 1,
          label: {
            text: "Actual price",
            rotation: 90,
          },
        },
      ],
      title: {
        text: "Price",
      },
    },
    yAxis: [
      {
        lineWidth: 1,
        gridLineWidth: 1,
        title: null,
        tickWidth: 1,
        tickLength: 5,
        tickPosition: "inside",
        labels: {
          align: "left",
          x: 8,
        },
      },
      {
        opposite: true,
        linkedTo: 0,
        lineWidth: 1,
        gridLineWidth: 0,
        title: null,
        tickWidth: 1,
        tickLength: 5,
        tickPosition: "inside",
        labels: {
          align: "right",
          x: -8,
        },
      },
    ],
    legend: {
      enabled: false,
    },
    plotOptions: {
      area: {
        fillOpacity: 0.2,
        lineWidth: 1,
        step: "center",
      },
    },
    tooltip: {
      headerFormat:
        '<span style="font-size=10px;">Price: {point.key}</span><br/>',
      valueDecimals: 2,
    },
    series: [
      {
        name: "Bids",
        color: "#03a7a8",
        data: orderBook?.bids ?? [],
      },
      {
        name: "Asks",
        data: orderBook?.asks ?? [],
        color: "#fc5857",
      },
    ],
  };

  return (
    <Card className="col-span-12 lg:col-span-8">
      <CardHeader>
        <CardTitle>Market Depth Chart</CardTitle>
        <CardDescription>Live Market Depth (Bids and Asks)</CardDescription>
      </CardHeader>
      <CardContent>
        <HighchartsReact highcharts={Highcharts} options={options} />
      </CardContent>
    </Card>
  );
};

export default MarketDepth;
