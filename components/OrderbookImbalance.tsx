"use client";

import React, { useMemo } from "react";

interface OrderbookImbalanceProps {
  orderBook: {
    bids: [number, number][];
    asks: [number, number][];
  };
}

const OrderbookImbalance: React.FC<OrderbookImbalanceProps> = ({
  orderBook,
}) => {
  // Calculate imbalance
  const imbalance = useMemo(() => {
    const totalBids = orderBook?.bids.reduce(
      (sum, [_, quantity]) => sum + quantity,
      0
    );
    const totalAsks = orderBook?.asks.reduce(
      (sum, [_, quantity]) => sum + quantity,
      0
    );

    // Avoid division by zero
    if (totalBids + totalAsks === 0) return 0;

    // Calculate imbalance percentage
    return ((totalBids - totalAsks) / (totalBids + totalAsks)) * 100;
  }, [orderBook]);

  // Get the rotation angle based on the imbalance value
  const angle = (imbalance / 100) * 180 - 90; // -100 -> -90°, 100 -> 90°

  return (
    <div className="orderbook-imbalance text-center space-y-4">
      <h3 className="text-lg font-semibold">Orderbook Imbalance</h3>

      <div className="relative w-48 h-24 mx-auto">
        {/* Half-circle background with gradient */}
        <div
          className="absolute top-0 left-0 w-full h-full rounded-full bg-gradient-to-r from-red-500 via-white to-green-500"
          // style={{
          //   clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
          // }}
        />

        {/* Rotating arrow */}
        <div
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 transition-transform duration-500"
          style={{
            transform: `rotate(${angle}deg)`,
          }}
        >
          <div className="w-1 h-12 bg-black rounded-full" />
        </div>
      </div>

      <p className="text-sm">
        {imbalance > 0
          ? `Buy pressure: +${imbalance.toFixed(2)}%`
          : `Sell pressure: ${imbalance.toFixed(2)}%`}
      </p>
    </div>
  );
};

export default OrderbookImbalance;
