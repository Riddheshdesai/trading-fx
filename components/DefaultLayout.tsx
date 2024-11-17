"use client";
import React, { useState } from "react";
import DefaultSidebar from "./DefaultSidebar";
import { Menu } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();
  return (
    <>
      <div className="flex h-screen overflow-hidden bg-[#fcf7fc]">
        <DefaultSidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        {isMobile && (
          <div
            className="p-1 mt-4 pl-4 cursor-pointer"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu />
          </div>
        )}

        <div className="flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          {/* <span>test data</span> */}
          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              {children}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
