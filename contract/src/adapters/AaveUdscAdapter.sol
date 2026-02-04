// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "../interface/IYieldAdapter.sol";

interface IAavePool {

    function supply(address asset, uint256 amount, address onBehalfOf, uint16 referralCode) external;

    function withdraw(address asset, uint256 amount, address to) external returns (uint256);

}

contract AaveYieldAdapter is IYieldAdapter {

    IERC20 public immutable asset;
    IAavePool public immutable pool;

    string adapterName = "AaveUsdcAdapter";

    constructor(address _asset, address _pool) {
        asset = IERC20(_asset);
        pool = IAavePool(_pool);
    }

    function deposit(uint256 amount, bytes calldata data) external {
        asset.approve(address(pool), amount);

        pool.supply(address(asset), amount, address(this), 0);
    }

    function withdrawAll(uint256 totalAmount) external returns (uint256) {
        return pool.withdraw(address(asset), totalAmount, address(this));
    }

}
