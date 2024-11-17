# Real-Time Cryptocurrency Orderbook and Market Indicators

![Customer Activity Dashboard](https://github.com/Riddheshdesai/trading-fx/blob/main/public/crypto-trading-dahboard.jpg)

## Overview

This application provides a real-time view of the BTC-USD cryptocurrency orderbook with associated market indicators, including the **Spread Indicator**, **Orderbook Imbalance**, and **Market Depth Chart**. The data is fetched via WebSockets from the Binance API, ensuring up-to-date information for trading analysis.

The app is built using **Next.js** and integrates various libraries to handle real-time data updates, charting, and responsive design.

## Features

- **Real-time Orderbook Display**: Shows the top 10 levels of best bids and asks for BTC-USD.
- **Spread Indicator**: A live graph that visualizes the spread between the best bid and ask prices over a rolling 1-minute period.
- **Orderbook Imbalance**: Displays the orderbook imbalance indicator to show market sentiment (buy vs. sell pressure).
- **Market Depth Chart**: Real-time line graph representing market depth, updating with each orderbook change.
- **Mobile Responsiveness**: The application adapts seamlessly to various screen sizes, from mobile devices to desktops.
- **Multiple Cryptocurrency Pairs**: Users can select different trading pairs (e.g., BTC-USD, ETH-USD, XRP-USD) via a dropdown list.
- **Color-Coded Visual Cues**: Significant changes in the orderbook or indicators are highlighted with color changes to provide visual clarity.

## Technologies Used

- **Next.js**: Framework for building server-side rendered React applications.
- **TanStack Query**: For efficient data fetching and caching, handling WebSocket connections and API calls.
- **WebSocket (Binance API)**: Fetches real-time orderbook data for the selected cryptocurrency pair (BTC-USD).
- **Tailwind CSS**: Utility-first CSS framework for styling the application.
- **ShadCN UI**: Component library for reusable UI elements.
- **ApexCharts**: A charting library used to render the **Spread Indicator** and **Market Depth Chart**.
- **React-Chartjs-2**: For creating the **Orderbook Imbalance** chart (if applicable).

## Functionality

### 1. **Orderbook Display**
The app displays the orderbook data for the **BTC-USD** trading pair. The orderbook shows:
- The top 10 bids (buy orders).
- The top 10 asks (sell orders).
The data updates in real-time every second via a WebSocket connection to the Binance API.

### 2. **Spread Indicator**
The **Spread Indicator** visualizes the difference between the best bid and ask prices. The spread is plotted on a graph, which is updated every time the orderbook is updated. The graph is a moving average over a 1-minute window.

### 3. **Orderbook Imbalance**
The **Orderbook Imbalance** indicator provides a view of the imbalance between the buy and sell orders in the market. This is calculated based on the ratio of buy orders to sell orders at the top of the orderbook.

### 4. **Market Depth Chart**
The **Market Depth Chart** is a line graph that represents the market depth at any given moment. It plots the cumulative order size at each price level for both bids and asks. This chart is updated in real-time with every orderbook update.

### 5. **Responsive Design**
The entire application is responsive and adjusts well across various screen sizes, from mobile devices to desktops. This ensures that the orderbook and charts are easy to interact with on all devices.

### 6. **Cryptocurrency Pair Selection**
Users can select from a list of available cryptocurrency pairs (e.g., BTC-USD, ETH-USD, XRP-USD) via a dropdown menu. Clicking on a pair triggers a WebSocket connection to fetch real-time data for the selected pair.

### 7. **Dynamic Data Loading**
Data is dynamically loaded based on user interaction. When a different trading pair is selected, the application fetches the corresponding orderbook data via the Binance WebSocket API and updates the visualizations.


## Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Riddheshdesai/trading-fx.git
   ```

2. Navigate to the project directory for Front-End Project Setup:

   ```bash
   cd trading-fx
   ```

3. Install the dependencies:

   ```bash
   npm install --legacy-peer-deps 
   ```
   OR

   ```bash
   npm install --force
   ```
   
3. Running the Application :

   ```bash
   npm run dev
   ```

Your application will be available at `http://localhost:3000`.

