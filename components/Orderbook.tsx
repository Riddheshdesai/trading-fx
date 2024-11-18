"use client";
import { Card } from "./ui/card";

interface OrderBookProps {
  orderBook: any;
}

const OrderBook: React.FC<OrderBookProps> = ({ orderBook }) => {
  return (
    <Card className="col-span-12 lg:col-span-4">
      <div className="order-book-container grid grid-cols-3 lg:gap-1 xl xl:gap-4 p-2 xl:px-2 2xl:px-6 py-6">
        <div className="order-book-column">
          <h3 className="text-[16] mb-2 font-semibold">Best Asks</h3>
          <ul>
            {orderBook?.asks?.map(([price, quantity], index) => (
              <li
                key={index}
                className="flex justify-between py-2 px-2 lg:px-2 xl:px-4 border-b"
              >
                <span className="text-red-500">{quantity.toFixed(2)}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-[16] mb-2 px-4 text-start font-semibold">
            Price
          </h3>
          <ul>
            {orderBook?.bids?.map(([price, quantity], index) => (
              <li
                key={index}
                className="flex justify-between py-2 px-2 lg:px-2 xl:px-4 border-b"
              >
                <span>{price.toFixed(2)}</span>
                {/* <span>{quantity.toFixed(2)}</span> */}
              </li>
            ))}
          </ul>
        </div>

        <div className="order-book-column">
          <h3 className="text-[16] mb-2 font-semibold">Best Bids</h3>
          <ul>
            {orderBook?.bids?.map(([price, quantity], index) => (
              <li
                key={index}
                className="flex justify-between py-2 px-2 lg:px-2 xl:px-4 border-b"
              >
                {/* <span className="text-green-500">{price.toFixed(2)}</span> */}
                <span className="text-green-500">{quantity.toFixed(2)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  );
};

export default OrderBook;
