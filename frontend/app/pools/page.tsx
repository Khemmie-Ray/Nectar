"use client";

import Image from "next/image";
import { Search, Plus } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppKitAccount } from "@reown/appkit/react";

export default function Pools() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [flippedCards, setFlippedCards] = useState<{ [key: number]: boolean }>(
    {},
  );
  const { isConnected } = useAppKitAccount();

  if (!isConnected) {
    return null;
  }

  const pools = [
    {
      id: 1,
      image: "/flowerOne.png",
      title: "OASIS",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      target: 20000,
      winnerCount: 3,
      currentWinners: 3,
      totalWinners: 20,
      members: 15,
      totalMembers: 20,
      balance: 5000,
    },
    {
      id: 2,
      image: "/flowerTwo.png",
      title: "OASIS",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      target: 20000,
      winnerCount: 3,
      currentWinners: 3,
      totalWinners: 20,
      members: 15,
      totalMembers: 20,
      balance: 5000,
    },
    {
      id: 3,
      image: "/flowerThree.png",
      title: "OASIS",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      target: 20000,
      winnerCount: 3,
      currentWinners: 3,
      totalWinners: 20,
      members: 15,
      totalMembers: 20,
      balance: 5000,
    },
    {
      id: 4,
      image: "/flowerFour.png",
      title: "OASIS",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      target: 20000,
      winnerCount: 3,
      currentWinners: 3,
      totalWinners: 20,
      members: 15,
      totalMembers: 20,
      balance: 5000,
    },
    {
      id: 5,
      image: "/flowerFive.png",
      title: "OASIS",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      target: 20000,
      winnerCount: 3,
      currentWinners: 3,
      totalWinners: 20,
      members: 15,
      totalMembers: 20,
      balance: 5000,
    },
  ];

  const handleCardClick = (poolId: number) => {
    router.push(`/pools/${poolId}`);
  };

  return (
    <div className="min-h-screen bg-white">
      <main className="w-[90%] mx-auto py-5 sm:py-8 md:py-10 lg:py-12">
        {/* Page Header */}
        <div className="mb-5 sm:mb-6 md:mb-8">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-[#252B36] mb-1">
            Bloom
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-gray-700">
            Everything here grows. Find your place.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 sm:gap-4 mb-6 sm:mb-8 w-full">
          {/* Left Section - Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full lg:flex-1 lg:max-w-2xl">
            <div className="relative w-full sm:flex-1 sm:max-w-xs">
              <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search"
                className="w-full pl-9 sm:pl-11 pr-3 sm:pr-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex gap-2 w-full sm:w-auto">
              <button
                onClick={() => setActiveFilter("all")}
                className={`flex-1 sm:flex-none px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                  activeFilter === "all"
                    ? "bg-[#252B36] text-white"
                    : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setActiveFilter("mine")}
                className={`flex-1 sm:flex-none px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                  activeFilter === "mine"
                    ? "bg-[#252B36] text-white"
                    : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                Pools by Me
              </button>
            </div>
          </div>

          {/* Right Section - Enter Amount and Create */}
          <div className="flex gap-2 w-full lg:w-auto lg:flex-shrink-0">
            <input
              type="text"
              placeholder="Enter Amount"
              className="flex-1 sm:flex-none sm:w-32 md:w-36 px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 text-[#7D7C7C]"
            />
            <button className="p-2 sm:p-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex-shrink-0">
              <Image
                src="/stash.png"
                alt="Stash"
                width={16}
                height={16}
                className="w-3.5 h-3.5 sm:w-4 sm:h-4"
              />
            </button>
            <button className="flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2 sm:py-2.5 bg-[#FFC000] text-[#252B36] rounded-lg text-xs sm:text-sm font-bold hover:bg-[#FFD14D] transition-colors whitespace-nowrap flex-shrink-0">
              <span className="bg-black rounded p-0.5 flex items-center justify-center">
                <Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" />
              </span>
              Create
            </button>
          </div>
        </div>

        {/* Pool Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6 mb-8 sm:mb-10 w-full">
          {pools.map((pool) => (
            <div
              key={pool.id}
              className="flip-card w-full h-[420px] sm:h-[450px]"
              onClick={() => handleCardClick(pool.id)}
            >
              <div className="flip-card-inner">
                {/* Front Side */}
                <div className="flip-card-front">
                  <div className="relative h-40 sm:h-44 w-full">
                    <Image
                      src={pool.image}
                      alt={pool.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="p-4 sm:p-5 w-full">
                    <h3 className="font-bold text-[18px] text-[#252B36] mb-2 sm:mb-3">
                      {pool.title}
                    </h3>
                    <p className="text-[#7D7C7C] text-[13px] mb-3 sm:mb-4 text-justify">
                      {pool.description}
                    </p>

                    <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-gray-200 w-full">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-600 text-[12px]">Target:</span>
                        <span className="font-bold text-gray-900 text-[14px]">
                          {pool.target.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[#FFC000] text-[11px]">
                          Details
                        </span>
                        <Image
                          src="/triangleImage.png"
                          alt="Triangle"
                          width={12}
                          height={12}
                          className="w-2.5 h-2.5 sm:w-3 sm:h-3"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Back Side */}
                <div className="flip-card-back">
                  <div className="mb-6">
                    <p className="text-[#7D7C7C] mb-2 text-[13px]">Winner count: {pool.winnerCount}</p>
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
                      <span className="text-gray-400 text-[13px]">Balance:</span>
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
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/pools/${pool.id}`);
                    }}
                    className="mt-4 px-4 py-2 bg-[#FFC000] text-[12px] text-[#252B36] rounded-lg font-bold hover:bg-[#FFD14D] transition-colors"
                  >
                    View Full Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center sm:justify-end gap-2 flex-wrap w-full">
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
        </div>
      </main>

      <style jsx global>{`
        /* Flip Card Container */
        .flip-card {
          perspective: 1000px;
          cursor: pointer;
        }

        .flip-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transition: transform 0.6s;
          transform-style: preserve-3d;
        }

        /* Hover effect - flip on hover */
        .flip-card:hover .flip-card-inner {
          transform: rotateY(180deg);
        }

        .flip-card-front,
        .flip-card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          border-radius: 16px;
          overflow: hidden;
        }

        .flip-card-front {
          background-color: white;
          border: 1px solid #e5e7eb;
        }

        .flip-card-back {
          background-color: white;
          border: 1px solid #374151;
          transform: rotateY(180deg);
          padding: 24px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
        }

        /* Responsive adjustments */
        @media (min-width: 640px) {
          .flip-card-back {
            padding: 32px;
          }
        }

        /* Mobile - disable flip on hover, only on click */
        @media (max-width: 639px) {
          .flip-card:hover .flip-card-inner {
            transform: none;
          }
          
          .flip-card.flipped .flip-card-inner {
            transform: rotateY(180deg);
          }
        }
      `}</style>
    </div>
  );
}
