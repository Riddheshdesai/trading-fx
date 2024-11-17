"use client";
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useSymbolStore } from "@/store/useTradingStore";

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

export default function AppSidebar() {
  const { setSymbol } = useSymbolStore();
  return (
    <Sidebar className="px-4">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xl text-[#000] my-2 flex justify-between">
            Forex Pairs
          </SidebarGroupLabel>
          <SidebarGroupContent className="px-4">
            <SidebarMenu>
              {Object.keys(tradingPairs).map((item) => (
                <SidebarMenuItem
                  key={tradingPairs[item]}
                  className="cursor-pointer"
                  onClick={() => setSymbol(item)}
                >
                  <SidebarMenuButton asChild>
                    <span>{tradingPairs[item]}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
