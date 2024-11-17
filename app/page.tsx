"use client";

import DefaultLayout from "@/components/DefaultLayout";
import FxPairData from "@/components/FxPairData";

export default function Home() {
  return (
    <>
      <DefaultLayout>
        {/* <div className="p-10">hahah</div> */}
        <FxPairData />
      </DefaultLayout>
    </>
  );
}
