import React, { useMemo, useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js";
import "chartjs-adapter-date-fns"; // Date adapter for time scale

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale // Register TimeScale explicitly
);

interface SpreadIndicatorProps {
  orderBook: { bids: [number, number][]; asks: [number, number][] };
}

const SpreadIndicator: React.FC<SpreadIndicatorProps> = ({ orderBook }) => {
  const [spreadData, setSpreadData] = useState<{ x: number; y: number }[]>([]);

  const spread = useMemo(() => {
    const highestBid = orderBook?.bids.length ? orderBook.bids[0][0] : 0;
    const lowestAsk = orderBook?.asks.length ? orderBook.asks[0][0] : 0;
    return highestBid && lowestAsk ? lowestAsk - highestBid : 0;
  }, [orderBook]);
  
  console.log("Spread:", spread);
  console.log("Spread Data:", orderBook);


  useEffect(() => {
    const now = Date.now();
    setSpreadData((prev) => {
      const updated = [...prev, { x: now, y: spread }];
      return updated.length > 60 ? updated.slice(1) : updated; // Keep last 60 data points
    });
  }, [spread]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 1000 },
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Spread Indicator (Last 1 Minute)",
      },
    },
    scales: {
      x: {
        type: "time",
        time: {
          unit: "second",
          tooltipFormat: "HH:mm:ss",
        },
        title: { display: true, text: "Time (Last 60 seconds)" },
      },
      y: {
        title: { display: true, text: "Spread Value" },
        beginAtZero: true,
      },
    },
  };

  const data = {
    datasets: [
      {
        label: "Spread",
        data: spreadData.map(({ x, y }) => ({ x, y })),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  return (
    <div style={{ height: "400px", width: "100%" }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default SpreadIndicator;
