'use client';

import Image from 'next/image';
import { Clock } from 'lucide-react';
import { useState } from 'react';

export default function PoolDetails() {
    const [currentPage, setCurrentPage] = useState(1);
    const [depositAmount, setDepositAmount] = useState('');

    const members = [
        {
            address: '0xe25327d529a722BB05ca7cc495528e2C82Da520F',
            targetAmount: 20000,
            amountPaid: 0,
            balance: 20000,
            status: 'Active',
        },
        {
            address: '0xe25327d529a722BB05ca7cc495528e2C82Da520F',
            targetAmount: 10000,
            amountPaid: 0,
            balance: 10000,
            status: 'Active',
        },
        {
            address: '0xe25327d529a722BB05ca7cc495528e2C82Da520F',
            targetAmount: 20000,
            amountPaid: 7000,
            balance: 13000,
            status: 'Completed',
        },
        {
            address: '0xe25327d529a722BB05ca7cc495528e2C82Da520F',
            targetAmount: 20000,
            amountPaid: 7000,
            balance: 13000,
            status: 'Completed',
        },
        {
            address: '0xe25327d529a722BB05ca7cc495528e2C82Da520F',
            targetAmount: 20000,
            amountPaid: 7000,
            balance: 13000,
            status: 'Completed',
        },
    ];

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

            {/* Main Content */}
            <main className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 lg:px-16 py-5 sm:py-8 md:py-10 lg:py-12">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4">
                    <div>
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#252B36] mb-1">
                            Explore Pools
                        </h1>
                        <p className="text-xs sm:text-sm text-[#7D7C7C]">
                            See who &apos;s saving together.
                        </p>
                    </div>

                    <div className="flex gap-2 sm:gap-3">
                        <button className="px-4 sm:px-6 py-2 sm:py-2.5 bg-[#C5C2C2] text-white rounded-lg text-xs sm:text-sm font-medium hover:bg-gray-400 transition-colors">
                            Withdraw
                        </button>
                        <button className="px-4 sm:px-6 py-2 sm:py-2.5 bg-[#FFC000] text-[#252B36] rounded-lg text-xs sm:text-sm font-bold hover:bg-[#FFD14D] transition-colors">
                            Join
                        </button>
                    </div>
                </div>

                {/* Top Section - 3 Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 mb-6 sm:mb-8">
                    {/* Pool Info Card */}
                    <div className="bg-white border border-gray-200 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[#252B36] mb-1">OASIS</h2>
                        <p className="text-[10px] sm:text-xs text-[#7D7C7C] mb-4 sm:mb-6">Adams ETH</p>

                        <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm text-[#7D7C7C] leading-relaxed">
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            </p>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            </p>
                        </div>
                    </div>

                    {/* Stats Card */}
                    <div className="bg-white border border-gray-200 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                        <div className="mb-4 sm:mb-6 pb-4 sm:pb-6 border-b border-gray-200">
                            <div className="flex items-start justify-between mb-2 sm:mb-3">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#252B36] rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Image
                                        src='/users.png'
                                        alt="users"
                                        width={12}
                                        height={12}
                                        className="w-4 h-4 sm:w-5 sm:h-5"
                                    />
                                </div>
                                <div className="text-right">
                                    <p className="text-2xl sm:text-3xl font-bold text-[#252B36]">10</p>
                                    <p className="text-[10px] sm:text-xs text-[#7D7C7C]">Members</p>
                                </div>
                            </div>
                            <div className="flex justify-between text-[10px] sm:text-xs text-[#7D7C7C]">
                                <span>Max: 20</span>
                                <span>Left: 10</span>
                            </div>
                        </div>

                        {/* Winners Section */}
                        <div>
                            <div className="flex items-start justify-between mb-2 sm:mb-3">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#252B36] rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Image
                                        src='/harvestIcon.png'
                                        alt="Icon"
                                        width={12}
                                        height={12}
                                        className="w-4 h-4 sm:w-5 sm:h-5"
                                    />
                                </div>
                                <div className="text-right">
                                    <p className="text-2xl sm:text-3xl font-bold text-[#252B36]">3</p>
                                    <p className="text-[10px] sm:text-xs text-[#7D7C7C]">Winners</p>
                                </div>
                            </div>
                            <div className="flex justify-between text-[10px] sm:text-xs text-[#7D7C7C]">
                                <span>Harvest: 3/20</span>
                                <span>Planters: 17</span>
                            </div>
                        </div>
                    </div>

                    {/* Time and Amounts Card */}
                    <div className="bg-white border border-gray-200 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                        {/* Time Info */}
                        <div className="flex items-start justify-between mb-4 sm:mb-6 pb-4 sm:pb-6 border-b border-gray-200">
                            <div className="text-[10px] sm:text-xs text-[#7D7C7C] pr-2">
                                <p className="mb-1">Start time: 13th November, 2025</p>
                                <p>End Time: 10 Days Left</p>
                            </div>
                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#252B36] rounded-lg flex items-center justify-center flex-shrink-0">
                                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                            </div>
                        </div>

                        {/* Amount Cards */}
                        <div className="grid grid-cols-3 gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                            <div className="bg-[#252B36] p-2 sm:p-3 text-center">
                                <p className="text-white text-sm sm:text-base md:text-lg font-bold mb-0.5 sm:mb-1">$40,000</p>
                                <p className="text-gray-400 text-[8px] sm:text-[10px]">Target</p>
                            </div>
                            <div className="p-2 sm:p-3 text-center">
                                <p className="text-[#252B36] text-sm sm:text-base md:text-lg font-bold mb-0.5 sm:mb-1">$6,000</p>
                                <p className="text-[#7D7C7C] text-[8px] sm:text-[10px]">Current Balance</p>
                            </div>
                            <div className="p-2 sm:p-3 text-center">
                                <p className="text-[#252B36] text-sm sm:text-base md:text-lg font-bold mb-0.5 sm:mb-1">$14,000</p>
                                <p className="text-[#7D7C7C] text-[8px] sm:text-[10px]">Amount Left</p>
                            </div>
                        </div>

                        {/* Deposit Limits */}
                        <div className="flex flex-col sm:flex-row justify-between gap-1 sm:gap-0 text-[9px] sm:text-[10px] text-[#7D7C7C]">
                            <span>Max-user Deposit: $2000</span>
                            <span>Min-user Deposit: $100</span>
                        </div>
                    </div>
                </div>

                {/* Middle Section - Yield Chart and Deposit */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 md:gap-6 mb-6 sm:mb-8">
                    {/* Yield Chart */}
                    <div className="bg-white border border-gray-200 rounded-xl sm:rounded-2xl p-4 sm:p-6 pb-3 sm:pb-4">
                        <div className="flex flex-col sm:flex-row items-start sm:items-start justify-between mb-3 gap-2 sm:gap-0">
                            <div>
                                <h3 className="text-base sm:text-lg md:text-xl font-bold text-[#252B36] mb-1.5 sm:mb-2">Yield</h3>
                                <div className="flex items-center gap-1.5 sm:gap-2">
                                    <Image
                                        src='/triangleImage.png'
                                        alt="Triangle"
                                        width={12}
                                        height={12}
                                        className="w-2 h-2 sm:w-2.5 sm:h-2.5"
                                    />
                                    <span className="text-[10px] sm:text-xs text-[#7D7C7C]">Aave <span className='text-[10px] sm:text-xs text-[#13BA48]'>- +6%APR</span></span>
                                </div>
                            </div>
                            <div className="text-left sm:text-right w-full sm:w-auto">
                                <p className="text-xs sm:text-sm font-bold text-[#252B36] mb-1.5 sm:mb-2">Total: $6000</p>
                                <div className="flex flex-col items-end gap-1">
                                    <div className="flex items-center gap-2 text-xs">
                                        <div className="w-3 h-3 bg-green-500"></div>
                                        <span className="text-[#252B36]">$208</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs">
                                        <div className="w-3 h-3 bg-red-500"></div>
                                        <span className="text-[#252B36]">$0</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="relative h-48 sm:h-56 md:h-60 flex items-center justify-center overflow-hidden">
                            <Image
                                src="/yield-chart.png"
                                alt="Yield Chart"
                                fill
                                className="object-contain p-1 sm:p-2"
                            />
                        </div>
                    </div>

                    {/* Deposit Card */}
                    <div className="bg-white border border-gray-200 rounded-xl sm:rounded-2xl p-4 sm:p-6 pb-3 sm:pb-4">
                        <h3 className="text-base sm:text-lg md:text-xl font-bold text-[#252B36] mb-3 sm:mb-4">Deposit</h3>

                        <div className="mb-3 sm:mb-4">
                            <label className="block text-[10px] sm:text-xs md:text-sm text-[#7D7C7C] mb-1.5 sm:mb-2">
                                Amount
                            </label>
                            <input
                                type="text"
                                placeholder="Enter an amount"
                                value={depositAmount}
                                onChange={(e) => setDepositAmount(e.target.value)}
                                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg text-xs sm:text-sm text-[#7D7C7C] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFC000] focus:border-transparent"
                            />
                        </div>

                        <button className="w-full py-2.5 sm:py-3 bg-[#FFC000] text-[#252B36] rounded-lg text-xs sm:text-sm font-bold hover:bg-[#FFD14D] transition-colors">
                            Make Deposit
                        </button>
                    </div>
                </div>

                {/* Members Table */}
                <div className="overflow-hidden ">
                    <div className="p-4 sm:p-6 border-b border-gray-200">
                        <h3 className="text-base sm:text-lg md:text-xl font-bold text-[#252B36]">Members</h3>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[600px]">
                            <thead className="bg-white border-b border-gray-200">
                                <tr>
                                    <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-[10px] sm:text-xs font-semibold text-[#252B36]">
                                        User&apos;s Address
                                    </th>
                                    <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-[10px] sm:text-xs font-semibold text-[#252B36]">
                                        Fund&apos;s Target($)
                                    </th>
                                    <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-[10px] sm:text-xs font-semibold text-[#252B36]">
                                        Amount Paid
                                    </th>
                                    <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-[10px] sm:text-xs font-semibold text-[#252B36]">
                                        Balance($)
                                    </th>
                                    <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-[10px] sm:text-xs font-semibold text-[#252B36]">
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {members.map((member, index) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="px-3 sm:px-6 py-3 sm:py-4 text-[10px] sm:text-xs text-[#7D7C7C]">
                                            {member.address}
                                        </td>
                                        <td className="px-3 sm:px-6 py-3 sm:py-4 text-[10px] sm:text-xs text-[#7D7C7C]">
                                            {member.targetAmount.toLocaleString()}
                                        </td>
                                        <td className="px-3 sm:px-6 py-3 sm:py-4 text-[10px] sm:text-xs text-[#7D7C7C]">
                                            {member.amountPaid.toLocaleString()}
                                        </td>
                                        <td className="px-3 sm:px-6 py-3 sm:py-4 text-[10px] sm:text-xs text-[#7D7C7C]">
                                            {member.balance.toLocaleString()}
                                        </td>
                                        <td className="px-3 sm:px-6 py-3 sm:py-4 text-[10px] sm:text-xs">
                                            <span
                                                className={`${member.status === 'Active'
                                                    ? 'text-[#7D7C7C]'
                                                    : 'text-[#7D7C7C]'
                                                    }`}
                                            >
                                                {member.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="px-3 sm:px-6 py-3 sm:py-4 border-t border-gray-200 flex flex-wrap items-center justify-center sm:justify-end gap-1.5 sm:gap-2">
                        <button
                            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                            disabled={currentPage === 1}
                            className="px-3 sm:px-4 py-1.5 sm:py-2 bg-[#252B36] text-white rounded-lg text-[10px] sm:text-xs font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Previous
                        </button>
                        {[1, 2, 3, 4].map((page) => (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`w-7 h-7 sm:w-9 sm:h-9 rounded-lg text-[10px] sm:text-xs font-medium transition-colors ${currentPage === page
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
                            className="px-3 sm:px-4 py-1.5 sm:py-2 bg-[#252B36] text-white rounded-lg text-[10px] sm:text-xs font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}