"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useSymbolStore } from "@/store/useTradingStore";
import { useIsMobile } from "@/hooks/use-mobile";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const tradingPairs = {
  btcusdt: "BTC/USDT",
  ethusdt: "ETH/USDT",
  bnbusdt: "BNB/USDT",
  xrpusdt: "XRP/USDT",
  adabusdt: "ADA/USDT",
  solusdt: "SOL/USDT",
  dotusdt: "DOT/USDT",
  maticusdt: "MATIC/USDT",
  linkusdt: "LINK/USDT",
  ltcusdt: "LTC/USDT",
  trxusdt: "TRX/USDT",
  avaxusdt: "AVAX/USDT",
  dogeusdt: "DOGE/USDT",
  shibusdt: "SHIBA/USDT",
  uniusdt: "UNI/USDT",
};

const DefaultSidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const pathname = usePathname();
  const { symbol, setSymbol } = useSymbolStore();
  const isMobile = useIsMobile();

  return (
    <aside
      className={`absolute left-0 top-0 z-[999] flex h-screen w-72.5 flex-col overflow-y-hidden border-r border-stroke bg-[#520074] text-[#fcf3ff] lg:static lg:translate-x-0 ${
        sidebarOpen
          ? "translate-x-0 duration-300 ease-linear"
          : "-translate-x-full"
      }`}
    >
      <div className="flex items-center justify-start gap-1 px-10 pl-1 py-4 lg:py-5 xl:py-6 align-middle">
        <Image
          width={50}
          height={20}
          src={"/images/fintech-logo.svg"}
          alt="Logo"
          priority
        />
        <header className="text-2xl font-semibold">Fx Trding</header>
      </div>
      <h3 className="px-4 lg:px-6 font-medium text-[#f2ceff] text-lg">
        Crypto Pairs
      </h3>

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav className="mt-1 px-4 lg:px-6">
          <ul className="p-4">
            {Object.keys(tradingPairs).map((Pair) => {
              return (
                <li
                  key={tradingPairs[Pair]}
                  className={`py-2 font-light text-[16px] text-[#e8a7ff] cursor-pointer hover:text-[#f8e4ff] ${
                    symbol === Pair ? "text-[#FFFFFF] font-semibold" : "text-[#e8a7ff]"
                  } `}
                  onClick={() => {
                    setSymbol(Pair);
                    isMobile && setSidebarOpen(false);
                  }}
                >
                  {tradingPairs[Pair]}
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default DefaultSidebar;
