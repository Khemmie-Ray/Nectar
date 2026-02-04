'use client';

import Image from 'next/image';
import { Search, Plus } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Pools() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [flippedCards, setFlippedCards] = useState<{ [key: number]: boolean }>({});

  const pools = [
    {
      id: 1,
      image: '/flowerOne.png',
      title: 'OASIS',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
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
      image: '/flowerTwo.png',
      title: 'OASIS',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
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
      image: '/flowerThree.png',
      title: 'OASIS',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
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
      image: '/flowerFour.png',
      title: 'OASIS',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
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
      image: '/flowerFive.png',
      title: 'OASIS',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      target: 20000,
      winnerCount: 3,
      currentWinners: 3,
      totalWinners: 20,
      members: 15,
      totalMembers: 20,
      balance: 5000,
    },
  ];

  const toggleFlip = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    setFlippedCards(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleCardClick = (poolId: number) => {
    // Only navigate if card is not flipped
    if (!flippedCards[poolId]) {
      router.push(`/pools/${poolId}`);
    }
  };

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Header */}
      <header className="border-b border-gray-200 w-full">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 lg:px-16 py-3 sm:py-4 md:py-5 flex items-center justify-between">
          <div className="flex items-center flex-shrink-0 min-w-0">
            <Image
              src="/logo.png"
              alt="Nectar"
              width={140}
              height={40}
              className="h-7 sm:h-9 md:h-10 w-auto"
            />
          </div>

          <div className="flex items-center gap-2 sm:gap-3 md:gap-4 flex-shrink-0">
            <span className="text-xs sm:text-sm md:text-base font-medium text-gray-900">
              1.05ETH
            </span>
            <div className="w-7 h-7 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex-shrink-0" />
            <span className="text-xs sm:text-sm md:text-base font-medium text-gray-900 hidden sm:block">
              0x0457......CZ
            </span>
          </div>
        </div>
      </header>

      <main className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 lg:px-16 py-5 sm:py-8 md:py-10 lg:py-12">
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
                onClick={() => setActiveFilter('all')}
                className={`flex-1 sm:flex-none px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-colors ${activeFilter === 'all'
                  ? 'bg-[#252B36] text-white'
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
              >
                All
              </button>
              <button
                onClick={() => setActiveFilter('mine')}
                className={`flex-1 sm:flex-none px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${activeFilter === 'mine'
                  ? 'bg-[#252B36] text-white'
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
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
                src='/stash.png'
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
              className="w-full h-[500px] sm:h-[520px] perspective-1000"
            >
              <div
                className={`relative w-full h-full transition-transform duration-700 transform-style-3d cursor-pointer ${flippedCards[pool.id] ? 'rotate-y-180' : ''
                  }`}
                onClick={() => handleCardClick(pool.id)}
              >
                {/* Front Side */}
                <div className="absolute inset-0 backface-hidden bg-white border border-gray-200 rounded-xl sm:rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-48 sm:h-52 w-full">
                    <Image
                      src={pool.image}
                      alt={pool.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="p-4 sm:p-5 w-full">
                    <h3 className="text-lg sm:text-xl font-bold text-[#252B36] mb-2 sm:mb-3">
                      {pool.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#7D7C7C] leading-relaxed mb-3 sm:mb-4 text-justify">
                      {pool.description}
                    </p>

                    <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-gray-200 w-full">
                      <div className="flex items-center gap-2">
                        <span className="text-xs sm:text-sm text-gray-600">Target:</span>
                        <span className="text-sm sm:text-base font-bold text-gray-900">
                          {pool.target.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => toggleFlip(e, pool.id)}
                          className="text-[10px] sm:text-xs text-blue-600 hover:text-blue-800 underline"
                        >
                          Details
                        </button>
                        <Image
                          src='/triangleImage.png'
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
                <div className="absolute inset-0 backface-hidden rotate-y-180 bg-white rounded-xl sm:rounded-2xl overflow-hidden border border-gray-700 p-6 sm:p-8 flex flex-col justify-center items-center text-center">
                  <div className="mb-6">
                    <p className="text-[#7D7C7C] text-sm mb-2">Winner count: {pool.winnerCount}</p>
                    <p className="text-[#252B36] text-3xl font-light">
                      {pool.currentWinners}/{pool.totalWinners}
                    </p>
                  </div>
                  <div className="mb-6">
                    <p className="text-[#7D7C7C] text-sm mb-1">
                      Members: {pool.members} / {pool.totalMembers}
                    </p>
                  </div>
                  <h3 className="text-[#252B36] text-xl font-bold mb-4">
                    {pool.title}
                  </h3>
                  <p className="text-[#7D7C7C] text-xs leading-relaxed mb-6 max-w-xs">
                    {pool.description}
                  </p>
                  <div className="w-full space-y-3 border-t border-gray-700 pt-6">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm">Target:</span>
                      <span className="text-black text-sm font-bold">
                        {pool.target.toLocaleString()} USDC
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm">Balance:</span>
                      <div className="flex items-center gap-2">
                        <span className="text-black text-sm font-bold">
                          {pool.balance.toLocaleString()} USDC
                        </span>
                        <Image
                          src='/triangleImage.png'
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
                    className="mt-4 px-4 py-2 bg-[#FFC000] text-[#252B36] rounded-lg text-xs font-bold hover:bg-[#FFD14D] transition-colors"
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
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg text-xs sm:text-sm font-medium transition-colors ${currentPage === page
                ? 'bg-[#FFC000] text-[#252B36]'
                : 'bg-[#252B36] text-white hover:bg-gray-800'
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
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
}