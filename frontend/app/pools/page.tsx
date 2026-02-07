"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useGetAllGroups } from "@/hooks/useGetAllGroup";
import { formatUnits } from "viem";
import { decodeAdditionalInfo, convertIpfsUrl } from "@/utils/helper";
import LoadingSpinner from "@/components/Loaders/LoadingSpinner";

export default function Pools() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [flippedCards, setFlippedCards] = useState<{ [key: number]: boolean }>(
    {},
  );

  const { groups, hasGroups, groupCount, isLoading, error, refetch } =
    useGetAllGroups();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 p-4">
        Error loading groups: {error.message}
      </div>
    );
  }

  console.log(groups);

  const handleCardClick = (poolId: number) => {
    router.push(`/pools/${poolId}`);
  };

  return (
    <div className="min-h-screen bg-white">
      <main className="">
        <div className="mb-5 sm:mb-6 md:mb-8">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-[#252B36] mb-1">
            Bloom
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-gray-700">
            Everything here grows. Find your place.
          </p>
        </div>

        <div className="flex justify-between items-center flex-col lg:flex-row md:flex-row">
          {groups.map((info) => {
            const description = decodeAdditionalInfo(info.additionalInfo);
            const imageUrl = convertIpfsUrl(info.uri);
            const goalInUSDC = formatUnits(info.totalDepositGoal, 6);

            return (
              <div key={info.group} className="w-full lg:w-[32%] md:w-[32%] rounded-xl border border-[#252B36]/20">
                <div className="">
                  <div className="relative h-40 lg:h-44 w-full">
                    <Image
                      src={imageUrl}
                      alt={info.name}
                      fill
                      className="object-cover rounded-bl-[70px] rounded-tr-xl rounded-tl-xl"
                    />
                  </div>

                  <div className="p-4 sm:p-5 w-full">
                    <h3 className="font-bold text-[18px] text-[#252B36] mb-2 sm:mb-3">
                      {info.name}
                    </h3>
                    <p className="text-[#7D7C7C] text-[13px] mb-3 sm:mb-4 text-justify">
                      {description}
                    </p>

                    <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-gray-200 w-full">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-600 text-[12px]">
                          Target:
                        </span>
                        <span className="font-bold text-gray-900 text-[14px]">
                          {goalInUSDC}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Image
                          src="/triangleImage.png"
                          alt="Triangle"
                          width={30}
                          height={30}
                          className="w-5 h-5 sm:w-3 sm:h-3"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Back Side */}
                {/* <div className="flip-card-back">
                  <div className="mb-6">
                    <p className="text-[#7D7C7C] mb-2 text-[13px]">
                      Winner count: {pool.winnerCount}
                    </p>
                    <p className="text-[#252B36] font-light text-[20px]">
                      {pool.currentWinners}/{pool.totalWinners}
                    </p>
                  </div>
                  <div className="mb-6">
                    <p className="text-[#7D7C7C] text-[13px]">
                      Members: {pool.members} / {pool.totalMembers}
                    </p>
                  </div>
                  <h3 className="text-[#252B36] text-[18px] font-bold mb-4">
                    {pool.title}
                  </h3>
                  <p className="text-[#7D7C7C] text-[12px] mb-6 max-w-xs">
                    {pool.description}
                  </p>
                  <div className="w-full space-y-3 border-t border-gray-700 pt-6">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-[13px]">Target:</span>
                      <span className="text-black font-bold text-[13px]">
                        {pool.target.toLocaleString()} USDC
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-[13px]">
                        Balance:
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-black font-bold text-[13px]">
                          {pool.balance.toLocaleString()} USDC
                        </span>
                        <Image
                          src="/triangleImage.png"
                          alt="Triangle"
                          width={10}
                          height={10}
                          className="w-2 h-2"
                        />
                      </div>
                    </div>
                  </div>

                  {/* View Full Details Button on Back */}
               
                {/* </div>  */}
              </div>
            );
          })}
        </div>

        {/* Pagination */}
        {/* <div className="flex items-center justify-center sm:justify-end gap-2 flex-wrap w-full">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-3 sm:px-4 py-2 bg-[#252B36] text-white rounded-lg text-xs sm:text-sm font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          {[1, 2, 3, 4].map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                currentPage === page
                  ? "bg-[#FFC000] text-[#252B36]"
                  : "bg-[#252B36] text-white hover:bg-gray-800"
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(Math.min(4, currentPage + 1))}
            disabled={currentPage === 4}
            className="px-3 sm:px-4 py-2 bg-[#252B36] text-white rounded-lg text-xs sm:text-sm font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div> */}
      </main>
    </div>
  );
}
