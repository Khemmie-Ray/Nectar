'use client';

import { useState } from 'react';
import { useLiFiBridge } from '@/hooks/useLiFiBridge';
import { useAccount } from 'wagmi';
import { X, ArrowRight, Loader2 } from 'lucide-react';

interface BridgeModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetPoolId?: string;
  targetChainId?: number;
  targetTokenAddress?: string;
}

export function BridgeModal({ 
  isOpen, 
  onClose, 
  targetPoolId,
  targetChainId = 1,
  targetTokenAddress = '0xYourUSDCAddress'
}: BridgeModalProps) {
  const [amount, setAmount] = useState('');
  const [selectedChain, setSelectedChain] = useState(1);
  const { address, isConnected } = useAccount();
  const { getQuote, executeBridge, route, isLoading, error, reset } = useLiFiBridge();

  const chains = [
    { id: 1, name: 'Ethereum', icon: '/chains/ethereum.png' },
    { id: 10, name: 'Optimism', icon: '/chains/optimism.png' },
    { id: 137, name: 'Polygon', icon: '/chains/polygon.png' },
    { id: 42161, name: 'Arbitrum', icon: '/chains/arbitrum.png' },
  ];

  const handleGetQuote = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      return;
    }

    const amountInSmallestUnit = (parseFloat(amount) * 1e6).toString();
    await getQuote(selectedChain, targetChainId, amountInSmallestUnit, targetTokenAddress);
  };

  const handleBridge = async () => {
    if (!route) return;
    
    const result = await executeBridge(route);
    if (result) {
      setTimeout(() => {
        reset();
        onClose();
      }, 2000);
    }
  };

  const handleClose = () => {
    reset();
    setAmount('');
    onClose();
  };

  // Helper to calculate total gas costs across all steps
  const getTotalGasCostUSD = () => {
    if (!route) return '0.00';
    
    const totalGas = route.steps.reduce((sum, step) => {
      const stepGas = step.estimate.gasCosts?.reduce(
        (s, g) => s + parseFloat(g.amountUSD ?? '0'), 
        0
      ) ?? 0;
      return sum + (stepGas ?? 0);
    }, 0);
    
    return totalGas.toFixed(2);
  };

  // Helper to get execution duration
  const getEstimatedTime = () => {
    if (!route || !route.steps[0]) return 0;
    return Math.ceil(route.steps[0].estimate.executionDuration / 60);
  };
  // Helper to get bridge tool name
  const getBridgeTool = () => {
    if (!route || !route.steps[0]) return 'Unknown';
    return route.steps[0].tool;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-[#252B36]">Bridge to Nectar</h2>
          <button 
            onClick={handleClose} 
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!isConnected ? (
          <div className="text-center py-8">
            <p className="text-gray-600 mb-4">Please connect your wallet to bridge tokens</p>
            <appkit-button />
          </div>
        ) : (
          <>
            {/* Chain Selection */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                From Chain
              </label>
              <div className="grid grid-cols-2 gap-2">
                {chains.map((chain) => (
                  <button
                    key={chain.id}
                    onClick={() => setSelectedChain(chain.id)}
                    disabled={route !== null}
                    className={`p-3 rounded-lg border-2 flex items-center gap-2 transition-colors ${
                      selectedChain === chain.id
                        ? 'border-[#FFC000] bg-[#FFC000]/10'
                        : 'border-gray-200 hover:border-gray-300'
                    } ${route !== null ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-xs font-bold">{chain.name[0]}</span>
                    </div>
                    <span className="text-sm font-medium">{chain.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Amount Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount (USDC)
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="100"
                disabled={route !== null}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC000] disabled:bg-gray-50 disabled:cursor-not-allowed"
              />
              <p className="text-xs text-gray-500 mt-1">
                Minimum: $10 • Recommended: $100+
              </p>
            </div>

            {/* Route Preview */}
            {route && (
              <div className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Route Details</h4>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">You'll receive:</span>
                    <span className="font-bold text-[#252B36]">
                      {(parseFloat(route.toAmount) / 1e6).toFixed(2)} USDC
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Estimated time:</span>
                    <span className="font-medium">
                      ~{getEstimatedTime()} min
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray -600">Bridge:</span>
                    <span className="font-medium">{getBridgeTool()}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm pt-2 border-t border-gray-200">
                    <span className="text-gray-600">Total fees:</span>
                    <span className="font-bold text-[#252B36]">
                      ${getTotalGasCostUSD()}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Error Display */}
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-2">
              {!route ? (
                <button
                  onClick={handleGetQuote}
                  disabled={isLoading || !amount || parseFloat(amount) <= 0}
                  className="flex-1 py-3 bg-[#252B36] text-white rounded-lg font-medium hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Getting Quote...
                    </>
                  ) : (
                    'Get Quote'
                  )}
                </button>
              ) : (
                <>
                  <button
                    onClick={() => reset()}
                    disabled={isLoading}
                    className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleBridge}
                    disabled={isLoading}
                    className="flex-1 py-3 bg-[#FFC000] text-[#252B36] rounded-lg font-bold hover:bg-[#FFD14D] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Bridging...
                      </>
                    ) : (
                      <>
                        Bridge <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </>
              )}
            </div>

            {/* Info Text */}
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-xs text-blue-800">
                💡 After bridging, your USDC will be available on {chains.find(c => c.id === targetChainId)?.name ?? 'the target chain'} and ready to deposit into pools.
              </p>
            </div>

            <p className="text-xs text-gray-500 text-center mt-4">
              Powered by Li.Fi • Secure cross-chain bridge aggregator
            </p>
          </>
        )}
      </div>
    </div>
  );
}