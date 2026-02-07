import { useState, useEffect } from 'react';
import {
  createConfig,
  getRoutes,
  executeRoute,
  EVM,
  Route,
  RoutesRequest,
} from '@lifi/sdk';
import { useAccount, useConfig as useWagmiConfig } from 'wagmi';
import { getWalletClient, switchChain } from '@wagmi/core';

const USDC_ADDRESSES: { [key: number]: string } = {
  1: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  10: '0x7F5c764cBc14f9669B88837ca1490cCa17c31607',
  137: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
  42161: '0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8',
};

export function useLiFiBridge() {
  const [isLoading, setIsLoading] = useState(false);
  const [route, setRoute] = useState<Route | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { address } = useAccount();
  const wagmiConfig = useWagmiConfig();

  // Initialize SDK once
  useEffect(() => {
    createConfig({
      integrator: 'nectar-savings',
      providers: [
        EVM({
          getWalletClient: () => getWalletClient(wagmiConfig),
          switchChain: async (chainId:any) => {
            await switchChain(wagmiConfig, { chainId });
            return getWalletClient(wagmiConfig, { chainId });
          },
        }),
      ],
    });
  }, [wagmiConfig]);

  const getQuote = async (
    fromChainId: number,
    toChainId: number,
    amount: string,
    toTokenAddress: string
  ) => {
    if (!address) {
      setError('Please connect your wallet');
      return null;
    }

    setIsLoading(true);
    setError(null);

    try {
      const routesRequest: RoutesRequest = {
        fromChainId,
        toChainId,
        fromTokenAddress: USDC_ADDRESSES[fromChainId],
        toTokenAddress,
        fromAmount: amount,
        fromAddress: address,
        toAddress: address,
        options: {
          slippage: 0.03,
        },
      };

      const result = await getRoutes(routesRequest);
      const bestRoute = result.routes[0];

      if (!bestRoute) {
        throw new Error('No route found');
      }

      setRoute(bestRoute);
      setIsLoading(false);
      return bestRoute;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to get quote';
      setError(errorMessage);
      setIsLoading(false);
      return null;
    }
  };

  const executeBridge = async (selectedRoute: Route) => {
    if (!address) {
      setError('Wallet not connected');
      return null;
    }

    setIsLoading(true);
    setError(null);

    try {
      const executedRoute = await executeRoute(selectedRoute, {
        updateRouteHook: (updatedRoute) => {
          console.log('Route status:', updatedRoute);
          setRoute(updatedRoute);
        },
      });

      setIsLoading(false);
      return executedRoute;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Bridge failed';
      setError(errorMessage);
      setIsLoading(false);
      return null;
    }
  };

  const reset = () => {
    setRoute(null);
    setError(null);
    setIsLoading(false);
  };

  return {
    getQuote,
    executeBridge,
    reset,
    route,
    isLoading,
    error,
  };
}