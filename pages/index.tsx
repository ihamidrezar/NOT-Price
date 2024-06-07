import { Inter } from "next/font/google";
import axios from "axios";
import React, { useEffect, useState } from "react";
import numeral from "numeral";

const inter = Inter({ subsets: ["latin"] });
type dataType = {
  status: string;
  lastUpdate: string;
  lastTradePrice: number;
  bids?: [string, string][];
  asks?: [string, string][];
};
interface PageProps {
  data: dataType;
}
const usdCurrencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 5,
  maximumFractionDigits: 5,
});
export default function Home({ data }: PageProps) {
  const [notPrice, setNotPrice] = useState<
    { irt: dataType; usdt: dataType } | undefined
  >();

  const [irtCalculatedValue, setIrtCalculatedValue] = useState(0);
  const [irtInputValue, setIrtInputValue] = useState("");

  const [usdCalculatedValue, setusdCalculatedValue] = useState(0);
  const [usdInputValue, setUsdInputValue] = useState("");

  useEffect(() => {
    const f = async () => {
      try {
        const notIRT: dataType = (await axios.get("/api/notIRT")).data;
        const notUSDT: dataType = (await axios.get("/api/notUSDT")).data;
        setNotPrice({
          irt: notIRT,
          usdt: notUSDT,
        });
        // console.log(notIRT);
        // console.log(notUSDT);
      } catch (error) {
        setNotPrice(undefined);
        // console.log(error);
      }
    };
    f();
  }, []);
  const handleChangeIRTCalculation = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (notPrice?.irt.lastTradePrice) {
      const inputValue = parseFloat(e.target.value.replace(/,/g, ""));
      const lastTradePrice = parseFloat(notPrice.irt.lastTradePrice as any);

      if (!isNaN(inputValue) && !isNaN(lastTradePrice)) {
        const value = inputValue * lastTradePrice;
        setIrtCalculatedValue(value);
      } else {
        setIrtCalculatedValue(0);
      }

      const formattedInputValue = e.target.value
        .replace(/\D/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      setIrtInputValue(formattedInputValue);
    }
  };
  const handleChangeUSDCalculation = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (notPrice?.usdt.lastTradePrice) {
      const inputValue = parseFloat(e.target.value.replace(/,/g, ""));
      const lastTradePrice = parseFloat(notPrice.usdt.lastTradePrice as any);

      if (!isNaN(inputValue) && !isNaN(lastTradePrice)) {
        const value = inputValue * lastTradePrice;
        setusdCalculatedValue(value);
      } else {
        setusdCalculatedValue(0);
      }

      const formattedInputValue = e.target.value
        .replace(/\D/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      setUsdInputValue(formattedInputValue);
    }
  };

  const formatNumber = (number: number): string => {
    const adjustedNumber = number / 10;

    return numeral(adjustedNumber).format("0,0.0");
  };
  const formatUSDNumber = (number: number): string => {
    const adjustedNumber = number;

    return numeral(adjustedNumber).format("0,0.00");
  };

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div className="flex flex-wrap items-center justify-center gap-10">
        {notPrice === undefined ? (
          <>
            <div className="animate-pulse aspect-square w-[350px] h-[360px] bg-slate-700  rounded-lg p-4"></div>
            <div className="animate-pulse aspect-square w-[350px] h-[360px] bg-slate-700  rounded-lg p-4"></div>
          </>
        ) : (
          <>
            <div className="aspect-square w-[350px] h-[360px] bg-white ring-[2px] ring-gray-300 rounded-lg p-4">
              <div className="flex items-center justify-center">
                <div className=" items-center flex -space-x-2.5 rtl:space-x-reverse cursor-pointer ">
                  <img
                    src="https://nobitex.ir/nobitex-cdn/crypto/not.svg"
                    className="size-14 bg-cover"
                    alt=""
                  />
                  <img
                    src="https://nobitex.ir/_nuxt/img/rls.fa78faa.svg"
                    className="size-14 bg-cover"
                    alt=""
                  />
                </div>
              </div>
              <h3 className="flex items-center justify-center text-black/70 font-semibold mt-8 text-xl">
                NOT IRT
              </h3>
              <h6 className="flex items-center justify-center text-black/70 font-semibold mt-8 text-lg">
                <span className="text-xs">تومان</span>
                {notPrice?.irt?.lastTradePrice
                  ? formatNumber(notPrice?.irt?.lastTradePrice)
                  : ""}
              </h6>
              <div className="flex items-center justify-center text-black/70 font-semibold mt-8 text-base">
                Calculate :
              </div>
              <div className="flex items-center text-black/70 justify-center mt-4">
                <input
                  onChange={handleChangeIRTCalculation}
                  className="w-[140px] border-none outline-none ring-1 ring-gray-400 bg-white rounded-[4px] py-1 px-1 "
                  type="text"
                  value={irtInputValue.toLocaleString()}
                />
                {/* <div className="mx-2">*</div> */}
                <div>
                  {typeof notPrice?.irt?.lastTradePrice === "number"
                    ? formatNumber(notPrice?.irt?.lastTradePrice)
                    : ""}
                </div>
              </div>
              <div className="text-black/70 flex flex-col items-center justify-center">
                <div className="mx-2">=</div>
                <div className="flex items-center gap-1">
                  <span className="text-xs -ml-7">تومان</span>
                  <span>{formatNumber(irtCalculatedValue)}</span>
                </div>
              </div>
            </div>
            <div className="aspect-square w-[350px] h-[360px] bg-white ring-[2px] ring-gray-300 rounded-lg p-4">
              <div className="flex items-center justify-center">
                <div className=" items-center flex -space-x-2.5 rtl:space-x-reverse cursor-pointer ">
                  <img
                    src="https://nobitex.ir/nobitex-cdn/crypto/not.svg"
                    className="size-14 bg-cover"
                    alt=""
                  />
                  <img
                    src="https://nobitex.ir/_nuxt/img/usdt.2d18fca.svg"
                    className="size-14 bg-cover"
                    alt=""
                  />
                </div>
              </div>
              <h3 className="flex items-center justify-center text-black/70 font-semibold mt-8 text-xl">
                NOT USDT
              </h3>
              <h6 className="flex items-center justify-center text-black/70 font-semibold mt-8 text-lg">
                {/* {notPrice?.irt.lastTradePrice} */}
                {notPrice?.usdt?.lastTradePrice
                  ? usdCurrencyFormatter.format(notPrice?.usdt?.lastTradePrice)
                  : ""}
              </h6>
              <div className="flex items-center justify-center text-black/70 font-semibold mt-8 text-base">
                Calculate :
              </div>
              <div className="flex items-center text-black/70 justify-center mt-4">
                <input
                  onChange={handleChangeUSDCalculation}
                  className="w-[140px] border-none outline-none ring-1 ring-gray-400 bg-white rounded-[4px] py-1 px-1 "
                  type="text"
                  value={usdInputValue.toLocaleString()}
                />
                {/* <div className="mx-2">*</div> */}
                <div>
                  {typeof notPrice?.irt?.lastTradePrice === "number"
                    ? usdCurrencyFormatter.format(
                        notPrice?.usdt?.lastTradePrice
                      )
                    : ""}
                </div>
              </div>
              <div className="text-black/70 flex flex-col items-center justify-center">
                <div className="mx-2">=</div>
                <div>${formatUSDNumber(usdCalculatedValue)}</div>
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}

// export const getServerSideProps = async () => {
//   let data;
//   try {
//     const res = await axios.get("https://api.nobitex.ir/v2/orderbook/NOTUSDT");
//     data = res;
//   } catch (error) {
//     console.log(error);
//   }
//   return {
//     props: {
//       data,
//     },
//   };
// };
