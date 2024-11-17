"use client";
import { useOrderBook } from "@/hooks/use-orderblock";
import { useSymbolStore } from "@/store/useTradingStore";

interface OrderBookProps {
  orderBook: any; // Symbol (e.g., 'btcusdt')
}

const OrderBook: React.FC<OrderBookProps> = ({ orderBook }) => {
  return (
    <div className="order-book-container grid grid-cols-3 gap-4 p-6">
      <div className="order-book-column">
        <h3 className="text-xl font-bold mb-4">Best Asks</h3>
        <ul>
          {orderBook?.asks?.map(([price, quantity], index) => (
            <li key={index} className="flex justify-between py-2 px-4 border-b">
              {/* <span className="text-red-500">{price.toFixed(2)}</span>/ */}
              <span className="text-red-500">{quantity.toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-bold mb-4">Price</h3>
        <ul>
          {orderBook?.bids?.map(([price, quantity], index) => (
            <li key={index} className="flex justify-between py-2 px-4 border-b">
              <span>{price.toFixed(5)}</span>
              {/* <span>{quantity.toFixed(2)}</span> */}
            </li>
          ))}
        </ul>
      </div>

      <div className="order-book-column">
        <h3 className="text-xl font-bold mb-4">Best Bids</h3>
        <ul>
          {orderBook?.bids?.map(([price, quantity], index) => (
            <li key={index} className="flex justify-between py-2 px-4 border-b">
              {/* <span className="text-green-500">{price.toFixed(2)}</span> */}
              <span className="text-green-500">{quantity.toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OrderBook;
